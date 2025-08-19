import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Users, 
  Search, 
  BookOpen, 
  Calculator,
  Save,
  X,
  Award,
  TrendingUp,
  FileText,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { COLORS } from '../../constants/colors';
import API from '../../services/API';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

const ManageScores = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState({
    first_ca: '',
    second_ca: '',
    exam_score: '',
    total_score: '',
    grade: '',
    remark: ''
  });
  const [term, setTerm] = useState('first');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingScore, setEditingScore] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, scoreId: null });
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentScores, setStudentScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { showError, showSuccess } = useNotification();
  const { user } = useAuth();

  // Get teacher's assigned classes and subjects
  useEffect(() => {
    console.log('ManageScores - User role:', user?.role);
    if (user?.role === 'teacher') {
      fetchTeacherAssignments();
    } else if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  // Refresh scores when class or subject changes
  useEffect(() => {
    if (selectedClass && selectedSubject && Array.isArray(students) && students.length > 0) {
      loadStudentScores(students);
    }
  }, [selectedClass, selectedSubject, students]);

  const fetchTeacherAssignments = async () => {
    try {
      setLoading(true);
      const response = await API.getTeacherAssignmentsForScores();
      const assignments = response.data || response;
      setTeacherAssignments(assignments);

      // The backend returns classes with subjects, so we can use them directly
      setAvailableClasses(assignments);
      
      // Extract all unique subjects from all classes
      const allSubjects = [];
      assignments.forEach(cls => {
        if (cls.subjects) {
          cls.subjects.forEach(subject => {
            if (!allSubjects.find(s => s.id === subject.id)) {
              allSubjects.push(subject);
            }
          });
        }
      });

      setAvailableSubjects(allSubjects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teacher assignments:', error);
      showError('Failed to load teacher assignments');
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    try {
      console.log('fetchAdminData - Starting...');
      setLoading(true);
      const [classesResponse, subjectsResponse] = await Promise.all([
        API.getClasses(),
        API.getSubjects()
      ]);
      
      console.log('fetchAdminData - Raw responses:', { classesResponse, subjectsResponse });
      
      // Handle different response formats
      const classes = Array.isArray(classesResponse) ? classesResponse : 
                     (classesResponse?.data && Array.isArray(classesResponse.data)) ? classesResponse.data : [];
      
      const subjects = Array.isArray(subjectsResponse) ? subjectsResponse : 
                      (subjectsResponse?.data && Array.isArray(subjectsResponse.data)) ? subjectsResponse.data : [];
      
      console.log('Admin - Classes response:', classesResponse);
      console.log('Admin - Subjects response:', subjectsResponse);
      console.log('Admin - Processed classes:', classes);
      console.log('Admin - Processed subjects:', subjects);
      console.log('Admin - Classes type:', typeof classes, 'Is array:', Array.isArray(classes));
      console.log('Admin - Subjects type:', typeof subjects, 'Is array:', Array.isArray(subjects));
      
      setAvailableClasses(classes);
      setAvailableSubjects(subjects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      showError('Failed to load classes and subjects');
      setLoading(false);
    }
  };

  // Fetch students when both class and subject are selected
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchClassStudents();
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSubject]);

  const fetchClassStudents = async () => {
    if (!selectedClass || !selectedSubject) return;
    
    try {
      const response = await API.getStudentsForClassSubject(selectedClass, selectedSubject);
      const studentsData = response.data || response;
      setStudents(studentsData);
      
      // Load existing scores for these students
      await loadStudentScores(studentsData);
    } catch (error) {
      console.error('Error fetching class students:', error);
      showError('Failed to load students for the selected class and subject');
    }
  };

  const loadStudentScores = async (studentsList) => {
    try {
      console.log('Loading scores for students:', studentsList);
      console.log('Selected class:', selectedClass, 'Selected subject:', selectedSubject);
      
      if (!studentsList || studentsList.length === 0) {
        setStudentScores({});
        return;
      }
      
      const scoresPromises = studentsList.map(student => 
        API.getStudentScores(student.id, { class_id: selectedClass, subject_id: selectedSubject })
      );
      
      const scoresResponses = await Promise.all(scoresPromises);
      console.log('Scores responses:', scoresResponses);
      
      const scoresMap = {};

      studentsList.forEach((student, index) => {
        const response = scoresResponses[index];
        const studentScores = response?.data || response || [];
        console.log(`Scores for student ${student.id}:`, studentScores);
        scoresMap[student.id] = {};
        
        if (Array.isArray(studentScores)) {
          studentScores.forEach(score => {
            scoresMap[student.id][score.term] = score;
          });
        }
      });
      
      console.log('Final scores map:', scoresMap);
      setStudentScores(scoresMap);
    } catch (error) {
      console.error('Error loading student scores:', error);
      setStudentScores({});
    }
  };

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSelectedSubject('');
    setStudents([]);
    setStudentScores({});
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    setStudents([]);
    setStudentScores({});
  };

  const handleScoreChange = (field, value) => {
    setScores(prev => ({
      ...prev,
      [field]: field === 'first_ca' || field === 'second_ca' || field === 'exam_score' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const calculateTotal = () => {
    const testScore = parseFloat(scores.test_score) || 0;
    const examScore = parseFloat(scores.exam_score) || 0;
    return testScore + examScore;
  };

  const calculateGrade = (total) => {
    if (total >= 80) return 'A';
    if (total >= 70) return 'B';
    if (total >= 60) return 'C';
    if (total >= 50) return 'D';
    if (total >= 40) return 'E';
    return 'F';
  };

  const handleSaveScore = async () => {
    if (!selectedStudent) {
      showError('Please select a student');
      return;
    }

    // Allow partial saves - at least one score field should be filled
    if (!scores.first_ca && !scores.second_ca && !scores.exam_score) {
      showError('Please fill in at least one score field');
      return;
    }

    const total = (parseFloat(scores.first_ca) || 0) + (parseFloat(scores.second_ca) || 0) + (parseFloat(scores.exam_score) || 0);
    const grade = calculateGrade(total);

    setIsSaving(true);
    try {
      const scoreData = {
        student_id: selectedStudent.id,
        subject_id: selectedSubject,
        class_id: selectedClass,
        term: term,
        first_ca: scores.first_ca ? parseFloat(scores.first_ca) : null,
        second_ca: scores.second_ca ? parseFloat(scores.second_ca) : null,
        exam_score: scores.exam_score ? parseFloat(scores.exam_score) : null,
        total_score: total,
        grade: grade,
        remark: scores.remark || ''
      };

      if (editingScore) {
        console.log('Updating score with ID:', editingScore.id);
        console.log('Score data:', scoreData);
        console.log('Current user role:', user?.role);
        console.log('Selected class:', selectedClass, 'Selected subject:', selectedSubject);
        await API.updateScore(editingScore.id, scoreData);
        showSuccess('Score updated successfully');
      } else {
        console.log('Creating new score with data:', scoreData);
        console.log('Current user role:', user?.role);
        console.log('Selected class:', selectedClass, 'Selected subject:', selectedSubject);
        await API.createScore(scoreData);
        showSuccess('Score saved successfully');
      }

      // Refresh students and scores
      await fetchClassStudents();
      
      // Reset form but keep class and subject selection
      setScores({
        first_ca: '',
        second_ca: '',
        exam_score: '',
        total_score: '',
        grade: '',
        remark: ''
      });
      setSelectedStudent(null);
      setEditingScore(null);
      setShowAddForm(false);
      
      // Show success message
      showSuccess(editingScore ? 'Score updated successfully' : 'Score saved successfully');

    } catch (error) {
      showError(error.message || 'Failed to save score');
      console.error('Error saving score:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditScore = (student, score) => {
    console.log('Editing score:', score);
    setSelectedStudent(student);
    setEditingScore(score);
    setScores({
      first_ca: score.first_ca || '',
      second_ca: score.second_ca || '',
      exam_score: score.exam_score || '',
      total_score: score.total_score || '',
      grade: score.grade || '',
      remark: score.remark || ''
    });
    setTerm(score.term);
    setShowAddForm(true);
    
    // Ensure the form shows the correct student
    console.log('Form opened for student:', student.first_name, student.last_name);
    console.log('Editing score data:', score);
  };

  // Load existing scores when opening form for a specific student and term
  const loadExistingScore = async (studentId, term) => {
    try {
      const response = await API.getStudentScores(studentId, { 
        class_id: selectedClass, 
        subject_id: selectedSubject 
      });
      
      const scores = response.data || response || [];
      const existingScore = scores.find(score => score.term === term);
      
      if (existingScore) {
        setEditingScore(existingScore);
        setScores({
          first_ca: existingScore.first_ca || '',
          second_ca: existingScore.second_ca || '',
          exam_score: existingScore.exam_score || '',
          total_score: existingScore.total_score || '',
          grade: existingScore.grade || '',
          remark: existingScore.remark || ''
        });
        setTerm(term);
      } else {
        setEditingScore(null);
        setScores({
          first_ca: '',
          second_ca: '',
          exam_score: '',
          total_score: '',
          grade: '',
          remark: ''
        });
        setTerm(term);
      }
    } catch (error) {
      console.error('Error loading existing score:', error);
      // If error, just set as new score
      setEditingScore(null);
      setScores({
        first_ca: '',
        second_ca: '',
        exam_score: '',
        total_score: '',
        grade: '',
        remark: ''
      });
      setTerm(term);
    }
  };



  const resetForm = () => {
    setScores({
      first_ca: '',
      second_ca: '',
      exam_score: '',
      total_score: '',
      grade: '',
      remark: ''
    });
    setSelectedStudent(null);
    setEditingScore(null);
    setShowAddForm(false);
    setTerm('first');
    
    // Refresh scores to ensure table is up to date
    if (Array.isArray(students) && students.length > 0) {
      loadStudentScores(students);
    }
  };

  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) {
      return [];
    }
    
    if (!searchTerm || searchTerm === '') {
      return students;
    }
    
    return students.filter(student =>
      student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admission_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Debug logging
  console.log('ManageScores - Render state:', {
    loading,
    userRole: user?.role,
    availableClasses: availableClasses,
    availableClassesType: typeof availableClasses,
    availableClassesIsArray: Array.isArray(availableClasses),
    availableSubjects: availableSubjects,
    availableSubjectsType: typeof availableSubjects,
    availableSubjectsIsArray: Array.isArray(availableSubjects),
    students: students,
    studentsType: typeof students,
    studentsIsArray: Array.isArray(students)
  });

  return (
    <div className="space-y-6">
      {/* Header */}
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Manage Scores
          </h2>
          <p className="mt-1 text-sm text-gray-500">
          Record and manage student scores for your assigned classes and subjects.
          </p>
      </div>

      {/* Class and Subject Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Class and Subject</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select a class</option>
              {Array.isArray(availableClasses) && availableClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={!selectedClass}
            >
              <option value="">Select a subject</option>
              {selectedClass && Array.isArray(availableSubjects) && availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      {selectedClass && selectedSubject && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Students ({filteredStudents.length})
              </h3>
              <div className="flex space-x-2">
                              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                  // Clear any existing editing state
                  setEditingScore(null);
                  setSelectedStudent(null);
                  setScores({
                    first_ca: '',
                    second_ca: '',
                    exam_score: '',
                    total_score: '',
                    grade: '',
                    remark: ''
                  });
                  setTerm('first');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Score
              </button>
                <button
                  onClick={() => Array.isArray(students) && students.length > 0 && loadStudentScores(students)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  title="Refresh Scores"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
          </div>
        </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-gray-200">
                <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Second Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Third Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const studentScore = studentScores[student.id] || {};
                return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-red-600">
                                {student.first_name?.[0]}{student.last_name?.[0]}
                              </span>
                        </div>
                        </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.first_name} {student.last_name}
                          </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                      </div>
                        </div>
                          </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.admission_number}
                      </td>
                      {['first', 'second', 'third'].map((term) => {
                        const score = studentScore[term];
                        return (
                          <td key={term} className="px-6 py-4 whitespace-nowrap">
                            {score ? (
                              <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                  {score.total_score} ({score.grade})
                          </div>
                                <div className="text-gray-500">
                                  1st CA: {score.first_ca || 'N/A'} | 2nd CA: {score.second_ca || 'N/A'} | Exam: {score.exam_score || 'N/A'}
                        </div>
                      </div>
                    ) : (
                              <span className="text-gray-400">No score</span>
                            )}
                          </td>
                        );
                      })}
                      
                      {/* Progress Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          {['first', 'second', 'third'].map((term) => {
                            const score = studentScore[term];
                            const hasScore = score && (score.first_ca || score.second_ca || score.exam_score);
                            
                            let progressColor = 'bg-red-100 text-red-800';
                            let progressText = 'Not Started';
                            
                            if (hasScore) {
                              // Calculate completion percentage for this term
                              const filledFields = [score.first_ca, score.second_ca, score.exam_score].filter(field => field !== null && field !== '').length;
                              const totalFields = 3;
                              const termProgress = (filledFields / totalFields) * 100;
                              
                              if (termProgress === 100) {
                                progressColor = 'bg-green-100 text-green-800';
                                progressText = 'Complete';
                              } else if (termProgress >= 66) {
                                progressColor = 'bg-blue-100 text-blue-800';
                                progressText = 'Almost Done';
                              } else {
                                progressColor = 'bg-yellow-100 text-yellow-800';
                                progressText = 'Partial';
                              }
                            }
                            
                            return (
                              <div key={term} className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500 w-12 capitalize">{term}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                      hasScore ? 
                                        (progressText === 'Complete' ? 'bg-green-500' : 
                                         progressText === 'Almost Done' ? 'bg-blue-500' : 'bg-yellow-500') 
                                        : 'bg-red-500'
                                    }`}
                                    style={{ 
                                      width: hasScore ? 
                                        `${([score.first_ca, score.second_ca, score.exam_score].filter(field => field !== null && field !== '').length / 3) * 100}%` 
                                        : '0%' 
                                    }}
                                  ></div>
                                </div>
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${progressColor}`}>
                                  {progressText}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* Show + button only if no scores exist for this student */}
                          {Object.keys(studentScore).length === 0 && (
                            <button
                              onClick={() => setShowAddForm(true)}
                              className="text-red-600 hover:text-red-900"
                              title="Add Score"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          )}
                          
                          {/* Show edit button for any term that has scores */}
                          {Object.keys(studentScore).length > 0 && (
                            <button
                              onClick={() => {
                                // Get the first available score to edit
                                const firstScore = Object.values(studentScore)[0];
                                handleEditScore(student, firstScore);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Score"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Score Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingScore ? 'Edit Score' : 'Add Score'}
                {selectedStudent && (
                  <span className="block text-sm text-gray-600 mt-1">
                    Student: {selectedStudent.first_name} {selectedStudent.last_name} ({selectedStudent.admission_number})
                  </span>
                )}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student
                  </label>
                  <select
                    value={selectedStudent?.id || ''}
                    onChange={(e) => {
                      const student = Array.isArray(students) ? students.find(s => s.id == e.target.value) : null;
                      setSelectedStudent(student);
                      // Load existing score for this student and current term
                      if (student) {
                        loadExistingScore(student.id, term);
                      }
                    }}
                    disabled={editingScore !== null}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      editingScore !== null ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="">Select a student</option>
                    {Array.isArray(students) && students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} ({student.admission_number})
                      </option>
                    ))}
                  </select>
                  {editingScore && (
                    <p className="text-xs text-gray-500 mt-1">
                      Student cannot be changed when editing an existing score
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term
                  </label>
                  <select
                    value={term}
                    onChange={(e) => {
                      const newTerm = e.target.value;
                      setTerm(newTerm);
                      // Load existing score for this term if student is selected
                      if (selectedStudent) {
                        loadExistingScore(selectedStudent.id, newTerm);
                      }
                    }}
                    disabled={editingScore !== null}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      editingScore !== null ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="first">First Term</option>
                    <option value="second">Second Term</option>
                    <option value="third">Third Term</option>
                  </select>
                  {editingScore && (
                    <p className="text-xs text-gray-500 mt-1">
                      Term cannot be changed when editing an existing score
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      1st CA *
                  </label>
                  <input
                    type="number"
                    min="0"
                      max="100"
                      value={scores.first_ca || ''}
                      onChange={(e) => handleScoreChange('first_ca', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      2nd CA *
                  </label>
                  <input
                    type="number"
                    min="0"
                      max="100"
                      value={scores.second_ca || ''}
                      onChange={(e) => handleScoreChange('second_ca', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Score *
                  </label>
                  <input
                    type="number"
                    min="0"
                      max="100"
                      value={scores.exam_score || ''}
                      onChange={(e) => handleScoreChange('exam_score', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Score
                  </label>
                  <input
                    type="number"
                    value={(parseFloat(scores.first_ca) || 0) + (parseFloat(scores.second_ca) || 0) + (parseFloat(scores.exam_score) || 0)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    value={calculateGrade((parseFloat(scores.first_ca) || 0) + (parseFloat(scores.second_ca) || 0) + (parseFloat(scores.exam_score) || 0))}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                      </div>

                      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remark
                  </label>
                  <textarea
                    value={scores.remark}
                    onChange={(e) => handleScoreChange('remark', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                      </div>
            </div>

              <div className="flex justify-end space-x-3 mt-6">
              <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
                <button
                  onClick={handleSaveScore}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : (editingScore ? 'Update' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScores; 