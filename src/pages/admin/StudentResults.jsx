import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Trophy, 
  TrendingUp,
  Award,
  BookOpen,
  Target
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const StudentResults = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to get student data
    const fetchStudentData = async () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Mock student data
        const mockStudent = {
          id: parseInt(studentId),
          name: 'John Doe',
          admissionNumber: 'ADM/2024/001',
          class: 'JSS 1A',
          email: 'john.doe@student.com',
          avatar: null,
        };

        // Mock results data - similar to student portal
        const mockResults = {
          currentTerm: 'Second Term',
          academicYear: '2023/2024',
          termResults: [
            {
              subject: 'Mathematics',
              firstCA: 18,
              secondCA: 16,
              exam: 65,
              total: 99,
              grade: 'A1',
              remark: 'Excellent',
              position: 1
            },
            {
              subject: 'English Language',
              firstCA: 15,
              secondCA: 17,
              exam: 58,
              total: 90,
              grade: 'A1',
              remark: 'Excellent',
              position: 2
            },
            {
              subject: 'Physics',
              firstCA: 16,
              secondCA: 14,
              exam: 55,
              total: 85,
              grade: 'B2',
              remark: 'Very Good',
              position: 5
            },
            {
              subject: 'Chemistry',
              firstCA: 14,
              secondCA: 15,
              exam: 52,
              total: 81,
              grade: 'B2',
              remark: 'Very Good',
              position: 4
            },
            {
              subject: 'Biology',
              firstCA: 17,
              secondCA: 16,
              exam: 50,
              total: 83,
              grade: 'B2',
              remark: 'Very Good',
              position: 3
            }
          ],
          summary: {
            totalScore: 438,
            average: 87.6,
            position: 3,
            outOf: 35,
            grade: 'A1',
            remark: 'Excellent Performance'
          }
        };

        setStudent(mockStudent);
        setResults(mockResults);
        setLoading(false);
      }, 800);
    };

    fetchStudentData();
  }, [studentId]);

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-800';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPositionSuffix = (position) => {
    if (position % 10 === 1 && position % 100 !== 11) return 'st';
    if (position % 10 === 2 && position % 100 !== 12) return 'nd';
    if (position % 10 === 3 && position % 100 !== 13) return 'rd';
    return 'th';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/students')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student || !results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/students')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">Student not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/students')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </button>
      </div>

      {/* Student Info Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600">{student.admissionNumber} • {student.class}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Academic Year</div>
            <div className="font-semibold">{results.academicYear}</div>
            <div className="text-sm text-gray-500 mt-1">{results.currentTerm}</div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Score</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.primary.blue }}>
                {results.summary.totalScore}
              </p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${COLORS.primary.blue}20` }}>
              <Target className="h-6 w-6" style={{ color: COLORS.primary.blue }} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.status.success }}>
                {results.summary.average}%
              </p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${COLORS.status.success}20` }}>
              <TrendingUp className="h-6 w-6" style={{ color: COLORS.status.success }} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Position</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.primary.red }}>
                {results.summary.position}{getPositionSuffix(results.summary.position)}
              </p>
              <p className="text-xs text-gray-500">of {results.summary.outOf}</p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${COLORS.primary.red}20` }}>
              <Trophy className="h-6 w-6" style={{ color: COLORS.primary.red }} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Grade</p>
              <p className="text-2xl font-bold" style={{ color: COLORS.primary.yellow }}>
                {results.summary.grade}
              </p>
              <p className="text-xs text-gray-500">{results.summary.remark}</p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${COLORS.primary.yellow}20` }}>
              <Award className="h-6 w-6" style={{ color: COLORS.primary.yellow }} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Subject Results</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  1st CA (20)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  2nd CA (20)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam (60)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total (100)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.termResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.firstCA}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.secondCA}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.exam}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.position}{getPositionSuffix(result.position)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{result.remark}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800">Best Subjects</h4>
            <div className="mt-2 space-y-1">
              {results.termResults
                .sort((a, b) => b.total - a.total)
                .slice(0, 2)
                .map((subject, index) => (
                  <div key={index} className="text-sm text-green-700">
                    {subject.subject} ({subject.total}%)
                  </div>
                ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800">Grade Distribution</h4>
            <div className="mt-2 space-y-1">
              {['A1', 'B2', 'B3'].map(grade => {
                const count = results.termResults.filter(r => r.grade === grade).length;
                return count > 0 ? (
                  <div key={grade} className="text-sm text-blue-700">
                    {grade}: {count} subject{count > 1 ? 's' : ''}
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
            <div className="mt-2 space-y-1">
              {results.termResults
                .sort((a, b) => a.total - b.total)
                .slice(0, 2)
                .map((subject, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    {subject.subject} ({subject.total}%)
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults; 