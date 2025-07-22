import { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  UserPlus, 
  Settings as SettingsIcon,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { COLORS } from '../../constants/colors'; 

const Settings = () => {
  const [activeTab, setActiveTab] = useState('classes');
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    { id: 'classes', name: 'Classes', icon: BookOpen },
    { id: 'subjects', name: 'Subjects', icon: SettingsIcon },
    { id: 'teachers', name: 'Teachers', icon: Users },
    { id: 'activities', name: 'Teacher Activities', icon: UserPlus },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'classes':
        return <ClassesTab />;
      case 'subjects':
        return <SubjectsTab />;
      case 'teachers':
        return <TeachersTab />;
      case 'activities':
        return <TeacherActivitiesTab />;
      default:
        return <ClassesTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your school's classes, subjects, teachers, and assignments.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                style={activeTab === tab.id ? { borderColor: COLORS.primary.red, color: COLORS.primary.red } : {}}
              >
                <Icon className="mr-2 h-5 w-5" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg">
        <TabContent />
      </div>
    </div>
  );
};

// Classes Tab Component
const ClassesTab = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'JSS 1A', students: 35, formTeacher: 'Mrs. Sarah Johnson' },
    { id: 2, name: 'JSS 1B', students: 32, formTeacher: 'Mr. David Smith' },
    { id: 3, name: 'JSS 2A', students: 38, formTeacher: 'Mrs. Emily Brown' },
    { id: 4, name: 'SS 1A', students: 30, formTeacher: 'Mr. Michael Wilson' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', formTeacher: '' });

  // Available teachers for form teacher selection
  const availableTeachers = [
    'Mrs. Sarah Johnson',
    'Mr. David Smith', 
    'Mrs. Emily Brown',
    'Mr. Michael Wilson',
    'Mrs. Jennifer Davis',
    'Mr. Robert Taylor',
    'Mrs. Lisa Anderson',
    'Mr. James Martinez'
  ];

  const handleAddClass = () => {
    if (newClass.name && newClass.formTeacher) {
      setClasses([...classes, { 
        id: Date.now(), 
        name: newClass.name, 
        students: 0, 
        formTeacher: newClass.formTeacher
      }]);
      setNewClass({ name: '', formTeacher: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Manage Classes</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
          style={{ backgroundColor: COLORS.primary.red }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </button>
      </div>

      {/* Add Class Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-md font-medium text-gray-900 mb-4">Add New Class</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name
              </label>
              <input
                type="text"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                placeholder="e.g., JSS 1A, SS 2B"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Teacher *
              </label>
              <select
                value={newClass.formTeacher}
                onChange={(e) => setNewClass({ ...newClass, formTeacher: e.target.value })}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              >
                <option value="">Select a teacher</option>
                {availableTeachers.map((teacher) => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleAddClass}
              disabled={!newClass.name || !newClass.formTeacher}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary.red }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Class
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Classes List */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {classItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {classItem.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {classItem.formTeacher}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Subjects Tab Component
const SubjectsTab = () => {
  const [subjects, setSubjects] = useState([
    { 
      id: 1, 
      name: 'Mathematics', 
      code: 'MATH', 
      description: 'Core mathematics including algebra, geometry, and calculus',
      category: 'Core',
      teachers: ['Mrs. Sarah Johnson', 'Mr. David Smith'],
      classes: ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'English Language', 
      code: 'ENG', 
      description: 'English language and literature studies',
      category: 'Core',
      teachers: ['Mr. David Smith', 'Mrs. Jennifer Davis'],
      classes: ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Physics', 
      code: 'PHY', 
      description: 'Physical sciences and mechanics',
      category: 'Science',
      teachers: ['Mrs. Sarah Johnson', 'Mr. Robert Taylor'],
      classes: ['JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'],
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Chemistry', 
      code: 'CHEM', 
      description: 'Chemical sciences and reactions',
      category: 'Science',
      teachers: ['Mrs. Emily Brown', 'Mrs. Lisa Anderson'],
      classes: ['JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'],
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Biology', 
      code: 'BIO', 
      description: 'Life sciences and living organisms',
      category: 'Science',
      teachers: ['Mrs. Emily Brown', 'Mr. James Martinez'],
      classes: ['JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'],
      status: 'active'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ 
    name: '', 
    code: '', 
    description: '', 
    category: '',
    teachers: [],
    classes: []
  });

  const availableCategories = ['Core', 'Science', 'Arts', 'Social Studies', 'Technology', 'Languages'];
  
  const availableTeachers = [
    'Mrs. Sarah Johnson',
    'Mr. David Smith', 
    'Mrs. Emily Brown',
    'Mr. Michael Wilson',
    'Mrs. Jennifer Davis',
    'Mr. Robert Taylor',
    'Mrs. Lisa Anderson',
    'Mr. James Martinez'
  ];

  const availableClasses = [
    'JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B',
    'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'
  ];

  const handleSubjectChange = (field, value) => {
    setNewSubject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTeacherChange = (teacher) => {
    setNewSubject(prev => ({
      ...prev,
      teachers: prev.teachers.includes(teacher)
        ? prev.teachers.filter(t => t !== teacher)
        : [...prev.teachers, teacher]
    }));
  };

  const handleClassChange = (className) => {
    setNewSubject(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.code && newSubject.category) {
      const subject = {
        id: Date.now(),
        name: newSubject.name,
        code: newSubject.code.toUpperCase(),
        description: newSubject.description,
        category: newSubject.category,
        teachers: newSubject.teachers,
        classes: newSubject.classes,
        status: 'active'
      };
      setSubjects([...subjects, subject]);
      setNewSubject({ name: '', code: '', description: '', category: '', teachers: [], classes: [] });
      setShowAddForm(false);
    }
  };

  const handleDeleteSubject = (subjectId) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Core': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800',
      'Social Studies': 'bg-yellow-100 text-yellow-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'Languages': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Manage Subjects</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
          style={{ backgroundColor: COLORS.primary.red }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </button>
      </div>

      {/* Add Subject Form */}
      {showAddForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Subject</h4>
          
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Name *
              </label>
              <input
                type="text"
                value={newSubject.name}
                onChange={(e) => handleSubjectChange('name', e.target.value)}
                placeholder="e.g., Mathematics"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Code *
              </label>
              <input
                type="text"
                value={newSubject.code}
                onChange={(e) => handleSubjectChange('code', e.target.value)}
                placeholder="e.g., MATH"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={newSubject.category}
                onChange={(e) => handleSubjectChange('category', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              >
                <option value="">Select category</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newSubject.description}
              onChange={(e) => handleSubjectChange('description', e.target.value)}
              rows={3}
              placeholder="Brief description of the subject"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            />
          </div>

          {/* Teachers */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Teachers
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableTeachers.map(teacher => (
                <label key={teacher} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newSubject.teachers.includes(teacher)}
                    onChange={() => handleTeacherChange(teacher)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{teacher}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Classes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Applicable Classes
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableClasses.map(className => (
                <label key={className} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newSubject.classes.includes(className)}
                    onChange={() => handleClassChange(className)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{className}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleAddSubject}
              disabled={!newSubject.name || !newSubject.code || !newSubject.category}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary.red }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Subject
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Subjects List */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teachers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                    <div className="text-sm text-gray-500">{subject.code}</div>
                    {subject.description && (
                      <div className="text-xs text-gray-400 mt-1">{subject.description}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(subject.category)}`}>
                    {subject.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {subject.teachers.slice(0, 2).map((teacher) => (
                      <span
                        key={teacher}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {teacher}
                      </span>
                    ))}
                    {subject.teachers.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                        +{subject.teachers.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {subject.classes.slice(0, 3).map((className) => (
                      <span
                        key={className}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700"
                      >
                        {className}
                      </span>
                    ))}
                    {subject.classes.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                        +{subject.classes.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Teachers Tab Component
const TeachersTab = () => {
  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: 'Mrs. Sarah Johnson', 
      email: 'sarah.johnson@tgcra.edu.ng', 
      phone: '+234 801 234 5678',
      username: 'tgcra_sarah.johnson',
      subjects: ['Mathematics', 'Physics'],
      classes: ['JSS 1A', 'JSS 2A'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Mr. David Smith', 
      email: 'david.smith@tgcra.edu.ng', 
      phone: '+234 802 345 6789',
      username: 'tgcra_david.smith',
      subjects: ['English Language', 'Literature'],
      classes: ['JSS 1B', 'SS 1A'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Mrs. Emily Brown', 
      email: 'emily.brown@tgcra.edu.ng', 
      phone: '+234 803 456 7890',
      username: 'tgcra_emily.brown',
      subjects: ['Chemistry', 'Biology'],
      classes: ['JSS 3A', 'SS 2A'],
      status: 'active'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subjects: [],
    classes: []
  });

  const availableSubjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Geography', 'History', 'Economics', 'Government', 'Literature',
    'Further Mathematics', 'Computer Science', 'Agricultural Science'
  ];

  const availableClasses = [
    'JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B',
    'SS 1A', 'SS 1B', 'SS 2A', 'SS 2B', 'SS 3A', 'SS 3B'
  ];

  // Generate username from teacher name
  const generateUsername = (name) => {
    if (!name) return '';
    const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    const nameParts = cleanName.split(' ').filter(part => part.length > 0);
    if (nameParts.length >= 2) {
      return `tgcra_${nameParts[0]}.${nameParts[nameParts.length - 1]}`;
    } else if (nameParts.length === 1) {
      return `tgcra_${nameParts[0]}`;
    }
    return '';
  };

  const handleTeacherChange = (field, value) => {
    setNewTeacher(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate username when name changes
    if (field === 'name') {
      const username = generateUsername(value);
      setNewTeacher(prev => ({
        ...prev,
        username
      }));
    }
  };

  const handleSubjectChange = (subject) => {
    setNewTeacher(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleClassChange = (className) => {
    setNewTeacher(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleAddTeacher = () => {
    if (newTeacher.name) {
      const teacher = {
        id: Date.now(),
        name: newTeacher.name,
        email: newTeacher.email,
        phone: newTeacher.phone,
        username: newTeacher.username,
        subjects: newTeacher.subjects,
        classes: newTeacher.classes,
        status: 'active'
      };
      setTeachers([...teachers, teacher]);
      setNewTeacher({ name: '', email: '', phone: '', subjects: [], classes: [] });
      setShowAddForm(false);
    }
  };

  const handleDeleteTeacher = (teacherId) => {
    setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Manage Teachers</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
          style={{ backgroundColor: COLORS.primary.red }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </button>
      </div>

      {/* Add Teacher Form */}
      {showAddForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Teacher</h4>
          
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={newTeacher.name}
                onChange={(e) => handleTeacherChange('name', e.target.value)}
                placeholder="Enter full name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Generated Username
              </label>
              <input
                type="text"
                value={newTeacher.username}
                readOnly
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                placeholder="Username will be generated automatically"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newTeacher.email}
                onChange={(e) => handleTeacherChange('email', e.target.value)}
                placeholder="teacher@tgcra.edu.ng (optional)"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newTeacher.phone}
                onChange={(e) => handleTeacherChange('phone', e.target.value)}
                placeholder="+234 xxx xxx xxxx (optional)"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableSubjects.map(subject => (
                <label key={subject} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newTeacher.subjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Classes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Classes
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableClasses.map(className => (
                <label key={className} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newTeacher.classes.includes(className)}
                    onChange={() => handleClassChange(className)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{className}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleAddTeacher}
              disabled={!newTeacher.name}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary.red }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Teacher
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Teachers List */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subjects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      <div className="text-sm text-gray-500">ID: {teacher.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {teacher.username}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{teacher.email || 'Not provided'}</div>
                  <div className="text-sm text-gray-500">{teacher.phone || 'Not provided'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.slice(0, 2).map((subject) => (
                      <span
                        key={subject}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700"
                      >
                        {subject}
                      </span>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                        +{teacher.subjects.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.slice(0, 2).map((className) => (
                      <span
                        key={className}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700"
                      >
                        {className}
                      </span>
                    ))}
                    {teacher.classes.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                        +{teacher.classes.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Teacher Activities Tab Component
const TeacherActivitiesTab = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      teacher: 'Mrs. Sarah Johnson',
      activity: 'Result Entry',
      subject: 'Mathematics',
      class: 'JSS 1A',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'completed',
      description: 'Entered mid-term results for 35 students'
    },
    {
      id: 2,
      teacher: 'Mr. David Smith',
      activity: 'Attendance Marking',
      subject: 'English Language',
      class: 'JSS 1B',
      date: '2024-01-15',
      time: '09:15 AM',
      status: 'completed',
      description: 'Marked attendance for 32 students'
    },
    {
      id: 3,
      teacher: 'Mrs. Emily Brown',
      activity: 'Assignment Grading',
      subject: 'Chemistry',
      class: 'JSS 3A',
      date: '2024-01-14',
      time: '02:45 PM',
      status: 'in-progress',
      description: 'Grading laboratory reports'
    },
    {
      id: 4,
      teacher: 'Mr. Michael Wilson',
      activity: 'Parent Meeting',
      subject: 'General',
      class: 'SS 1A',
      date: '2024-01-13',
      time: '03:00 PM',
      status: 'completed',
      description: 'Parent-teacher conference for 5 students'
    },
    {
      id: 5,
      teacher: 'Mrs. Jennifer Davis',
      activity: 'Lesson Planning',
      subject: 'Literature',
      class: 'SS 2A',
      date: '2024-01-12',
      time: '04:20 PM',
      status: 'completed',
      description: 'Prepared lesson plan for next week'
    }
  ]);

  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const availableTeachers = [
    'all',
    'Mrs. Sarah Johnson',
    'Mr. David Smith', 
    'Mrs. Emily Brown',
    'Mr. Michael Wilson',
    'Mrs. Jennifer Davis',
    'Mr. Robert Taylor',
    'Mrs. Lisa Anderson',
    'Mr. James Martinez'
  ];

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-gray-100 text-gray-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (activity) => {
    const icons = {
      'Result Entry': '📊',
      'Attendance Marking': '✅',
      'Assignment Grading': '📝',
      'Parent Meeting': '👥',
      'Lesson Planning': '📚',
      'Exam Preparation': '📋',
      'Student Assessment': '🎯'
    };
    return icons[activity] || '📋';
  };

  const filteredActivities = activities.filter(activity => {
    const matchesTeacher = selectedTeacher === 'all' || activity.teacher === selectedTeacher;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    return matchesTeacher && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Teacher Activities</h3>
        <div className="flex space-x-4">
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': COLORS.primary.red }}
          >
            {availableTeachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher === 'all' ? 'All Teachers' : teacher}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': COLORS.primary.red }}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-lg font-semibold text-gray-900">
                {activities.filter(a => a.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-lg">⏳</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-lg font-semibold text-gray-900">
                {activities.filter(a => a.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <span className="text-gray-600 text-lg">⏸️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg font-semibold text-gray-900">
                {activities.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-lg font-semibold text-gray-900">
                {activities.filter(a => a.status === 'overdue').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-medium text-gray-900">Recent Activities</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getActivityIcon(activity.activity)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-sm font-medium text-gray-900">{activity.activity}</h5>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {activity.teacher}
                      </span>
                      {activity.subject !== 'General' && (
                        <span className="flex items-center">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {activity.subject} • {activity.class}
                        </span>
                      )}
                      <span className="flex items-center">
                        <span className="mr-1">📅</span>
                        {activity.date} at {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredActivities.length === 0 && (
          <div className="p-6 text-center">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <p className="text-gray-500">No activities found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
