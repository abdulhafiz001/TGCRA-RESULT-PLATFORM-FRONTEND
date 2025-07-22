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
    { id: 'assignments', name: 'Class Assignments', icon: UserPlus },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'classes':
        return <ClassesTab />;
      case 'subjects':
        return <SubjectsTab />;
      case 'teachers':
        return <TeachersTab />;
      case 'assignments':
        return <AssignmentsTab />;
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
    { id: 1, name: 'JSS 1A', students: 35, formTeacher: 'Mrs. Johnson' },
    { id: 2, name: 'JSS 1B', students: 32, formTeacher: 'Mr. Smith' },
    { id: 3, name: 'JSS 2A', students: 38, formTeacher: 'Mrs. Brown' },
    { id: 4, name: 'SS 1A', students: 30, formTeacher: 'Mr. Davis' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', formTeacher: '' });

  const handleAddClass = () => {
    if (newClass.name) {
      setClasses([...classes, { 
        id: Date.now(), 
        name: newClass.name, 
        students: 0, 
        formTeacher: newClass.formTeacher || 'Not assigned' 
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
                Form Teacher (Optional)
              </label>
              <input
                type="text"
                value={newClass.formTeacher}
                onChange={(e) => setNewClass({ ...newClass, formTeacher: e.target.value })}
                placeholder="Teacher name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleAddClass}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white"
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

// Placeholder components for other tabs
const SubjectsTab = () => (
  <div className="p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Subjects</h3>
    <p className="text-gray-500">Subject management interface coming soon...</p>
  </div>
);

const TeachersTab = () => (
  <div className="p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Teachers</h3>
    <p className="text-gray-500">Teacher management interface coming soon...</p>
  </div>
);

const AssignmentsTab = () => (
  <div className="p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Class Assignments</h3>
    <p className="text-gray-500">Class assignment interface coming soon...</p>
  </div>
);

export default Settings;
