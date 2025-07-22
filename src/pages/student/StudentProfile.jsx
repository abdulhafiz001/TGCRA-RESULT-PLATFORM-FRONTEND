import { useState } from 'react';
import { COLORS } from '../../constants/colors';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Adebayo',
    lastName: 'Sarah',
    middleName: 'Oluwaseun',
    email: 'sarah.adebayo@student.school.com',
    phone: '08012345678',
    dateOfBirth: '2008-05-15',
    gender: 'Female',
    address: '123 Lagos Street, Ikeja, Lagos State',
    parentName: 'Mr. Adebayo Johnson',
    parentPhone: '08098765432',
    parentEmail: 'johnson.adebayo@email.com',
    emergencyContact: 'Mrs. Adebayo Funmi',
    emergencyPhone: '08087654321'
  });

  const studentInfo = {
    admissionNumber: 'TGCRA/2024/001',
    class: 'JSS 3A',
    session: '2023/2024',
    dateAdmitted: '2022-09-15',
    studentId: 'STU001',
    bloodGroup: 'O+',
    genotype: 'AA',
    religion: 'Christianity',
    stateOfOrigin: 'Lagos',
    lga: 'Ikeja'
  };

  const subjects = [
    'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
    'Civic Education', 'Christian Religious Studies', 'French', 'Computer Studies'
  ];

  const academicHistory = [
    { session: '2022/2023', class: 'JSS 1A', position: 5, average: 78.5 },
    { session: '2023/2024', class: 'JSS 2A', position: 3, average: 82.1 },
    { session: '2023/2024', class: 'JSS 3A', position: 2, average: 85.3 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Save to API
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: 'Adebayo',
      lastName: 'Sarah',
      middleName: 'Oluwaseun',
      email: 'sarah.adebayo@student.school.com',
      phone: '08012345678',
      dateOfBirth: '2008-05-15',
      gender: 'Female',
      address: '123 Lagos Street, Ikeja, Lagos State',
      parentName: 'Mr. Adebayo Johnson',
      parentPhone: '08098765432',
      parentEmail: 'johnson.adebayo@email.com',
      emergencyContact: 'Mrs. Adebayo Funmi',
      emergencyPhone: '08087654321'
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: COLORS.primary.red }}>
                {formData.firstName[0]}{formData.lastName[0]}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-gray-500">{studentInfo.admissionNumber}</p>
              <p className="text-sm font-medium text-indigo-600">{studentInfo.class}</p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                  <dd className="text-sm text-gray-900">{studentInfo.studentId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current Session</dt>
                  <dd className="text-sm text-gray-900">{studentInfo.session}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date Admitted</dt>
                  <dd className="text-sm text-gray-900">{new Date(studentInfo.dateAdmitted).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                  <dd className="text-sm text-gray-900">{studentInfo.bloodGroup}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Genotype</dt>
                  <dd className="text-sm text-gray-900">{studentInfo.genotype}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Academic History */}
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Academic History</h4>
            <div className="space-y-3">
              {academicHistory.map((record, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.session}</p>
                    <p className="text-xs text-gray-500">{record.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{record.position}{record.position === 1 ? 'st' : record.position === 2 ? 'nd' : record.position === 3 ? 'rd' : 'th'}</p>
                    <p className="text-xs text-gray-500">{record.average}% avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: COLORS.primary.red }}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: COLORS.primary.red }}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.middleName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{new Date(formData.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.address}</p>
                    )}
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Parent/Guardian Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.parentName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.parentPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.parentEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.emergencyContact}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{formData.emergencyPhone}</p>
                    )}
                  </div>

                  {/* Subjects Offered */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Offered</label>
                    <div className="grid grid-cols-1 gap-2">
                      {subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
