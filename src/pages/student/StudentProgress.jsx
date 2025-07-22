import { useState } from 'react';
import { COLORS } from '../../constants/colors';

const StudentProgress = () => {


  const studentInfo = {
    name: "Adebayo Sarah",
    admissionNumber: "TGCRA/2024/001",
    class: "JSS 3A",
    session: "2023/2024"
  };

  const academicSessions = ['2021/2022', '2022/2023', '2023/2024'];

  // Sample data for all three terms
  const progressData = {
    'First Term': {
      totalScore: 920,
      average: 73.6,
      position: 8,
      grade: 'B+',
      subjects: 8,
      attendance: 92,
      subjectBreakdown: [
        { subject: 'Mathematics', score: 119, percentage: 79.3, grade: 'B+', improvement: 5 },
        { subject: 'English Language', score: 110, percentage: 73.3, grade: 'B', improvement: -2 },
        { subject: 'Basic Science', score: 129, percentage: 86.0, grade: 'A', improvement: 8 },
        { subject: 'Social Studies', score: 105, percentage: 70.0, grade: 'B', improvement: 3 },
        { subject: 'Civic Education', score: 115, percentage: 76.7, grade: 'B+', improvement: 1 },
        { subject: 'Christian Religious Studies', score: 124, percentage: 82.7, grade: 'A', improvement: 6 },
        { subject: 'French', score: 91, percentage: 60.7, grade: 'C+', improvement: -5 },
        { subject: 'Computer Studies', score: 124, percentage: 82.7, grade: 'A', improvement: 4 }
      ]
    },
    'Second Term': {
      totalScore: 968,
      average: 77.4,
      position: 5,
      grade: 'B+',
      subjects: 8,
      attendance: 95,
      subjectBreakdown: [
        { subject: 'Mathematics', score: 122, percentage: 81.3, grade: 'A', improvement: 2 },
        { subject: 'English Language', score: 114, percentage: 76.0, grade: 'B+', improvement: 2.7 },
        { subject: 'Basic Science', score: 133, percentage: 88.7, grade: 'A+', improvement: 2.7 },
        { subject: 'Social Studies', score: 109, percentage: 72.7, grade: 'B', improvement: 2.7 },
        { subject: 'Civic Education', score: 119, percentage: 79.3, grade: 'B+', improvement: 2.6 },
        { subject: 'Christian Religious Studies', score: 127, percentage: 84.7, grade: 'A', improvement: 2 },
        { subject: 'French', score: 96, percentage: 64.0, grade: 'C+', improvement: 3.3 },
        { subject: 'Computer Studies', score: 128, percentage: 85.3, grade: 'A', improvement: 2.6 }
      ]
    },
    'Third Term': {
      totalScore: 0,
      average: 0,
      position: 0,
      grade: 'N/A',
      subjects: 0,
      attendance: 0,
      subjectBreakdown: []
    }
  };

  const currentTermData = progressData['Second Term'];
  const previousTermData = progressData['First Term'];

  // Calculate overall improvement
  const overallImprovement = currentTermData.average - previousTermData.average;

  // Academic milestones and achievements
  const achievements = [
    { title: 'Honor Roll', term: 'Second Term', description: 'Achieved B+ average or higher', icon: '🏆', earned: true },
    { title: 'Perfect Attendance', term: 'Second Term', description: '100% attendance record', icon: '🎯', earned: false },
    { title: 'Subject Excellence', term: 'Second Term', description: 'A grade in 3+ subjects', icon: '⭐', earned: true },
    { title: 'Most Improved', term: 'Second Term', description: '5+ point improvement', icon: '📈', earned: false },
    { title: 'Academic Consistency', term: 'First Term', description: 'B+ average maintained', icon: '🎖️', earned: true },
  ];

  const learningGoals = [
    { subject: 'Mathematics', currentGrade: 'A', targetGrade: 'A+', progress: 85 },
    { subject: 'French', currentGrade: 'C+', targetGrade: 'B', progress: 60 },
    { subject: 'English Language', currentGrade: 'B+', targetGrade: 'A', progress: 75 },
    { subject: 'Social Studies', currentGrade: 'B', targetGrade: 'B+', progress: 70 },
  ];

  const skillsAssessment = [
    { skill: 'Critical Thinking', level: 'Advanced', score: 85, description: 'Excellent analytical abilities in problem-solving scenarios' },
    { skill: 'Communication', level: 'Proficient', score: 78, description: 'Good verbal and written communication skills' },
    { skill: 'Collaboration', level: 'Advanced', score: 88, description: 'Works exceptionally well in team environments' },
    { skill: 'Creativity', level: 'Proficient', score: 75, description: 'Shows creative thinking in project work' },
    { skill: 'Digital Literacy', level: 'Advanced', score: 90, description: 'Excellent computer and technology skills' },
    { skill: 'Time Management', level: 'Developing', score: 65, description: 'Shows improvement in organizing and prioritizing tasks' }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-800 bg-green-100 border-green-200';
      case 'A': return 'text-green-700 bg-green-50 border-green-200';
      case 'B+': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C+': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getImprovementColor = (improvement) => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Proficient': return 'bg-blue-100 text-blue-800';
      case 'Developing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Academic Progress</h1>
              <p className="mt-1 text-lg text-gray-600">
                Comprehensive academic performance and growth tracking
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{studentInfo.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Admission No:</span>
                  <span className="text-sm text-gray-900 font-semibold">{studentInfo.admissionNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Class:</span>
                  <span className="text-sm text-gray-900 font-semibold">{studentInfo.class}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Session:</span>
                  <span className="text-sm text-gray-900 font-semibold">{studentInfo.session}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Average</p>
                <p className="text-3xl font-bold text-gray-900">{currentTermData.average}%</p>
                <p className={`text-sm ${getImprovementColor(overallImprovement)} flex items-center mt-1`}>
                  {overallImprovement > 0 ? '↗' : overallImprovement < 0 ? '↘' : '→'} 
                  {Math.abs(overallImprovement).toFixed(1)}% from last term
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Position</p>
                <p className="text-3xl font-bold text-gray-900">#{currentTermData.position}</p>
                <p className="text-sm text-gray-500 mt-1">out of 45 students</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-900">{currentTermData.attendance}%</p>
                <p className="text-sm text-green-600 mt-1">Excellent attendance</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 8.5A2 2 0 0013.5 21h-3A2 2 0 018.5 15.5L8 7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Grade</p>
                <p className="text-3xl font-bold text-gray-900">{currentTermData.grade}</p>
                <p className="text-sm text-blue-600 mt-1">Very Good</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Academic Achievements</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.earned ? 'text-green-900' : 'text-gray-700'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-600'}`}>
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.term}</p>
                      </div>
                      {achievement.earned && (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Learning Goals</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {learningGoals.map((goal, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{goal.subject}</h4>
                        <span className="text-sm text-gray-600">{goal.currentGrade} → {goal.targetGrade}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{goal.progress}% towards target</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">21st Century Skills Assessment</h3>
              <p className="text-sm text-gray-600 mt-1">Holistic evaluation of key competencies for future success</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsAssessment.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Score: {skill.score}%</span>
                      <span>{skill.level}</span>
                    </div>
                    <p className="text-xs text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Academic Timeline</h3>
              <p className="text-sm text-gray-600 mt-1">Track your academic journey across terms</p>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-8">
                  {Object.entries(progressData).map(([term, data], index) => (
                    <div key={term} className="relative flex items-start space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${data.average > 0 ? 'bg-blue-600 border-blue-600' : 'bg-gray-300 border-gray-300'} relative z-10`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">{term}</h4>
                          {data.average > 0 && (
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(data.grade)}`}>
                              {data.grade}
                            </span>
                          )}
                        </div>
                        {data.average > 0 ? (
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Average:</span>
                              <span className="ml-2 font-semibold text-gray-900">{data.average}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Position:</span>
                              <span className="ml-2 font-semibold text-gray-900">#{data.position}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Attendance:</span>
                              <span className="ml-2 font-semibold text-gray-900">{data.attendance}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Subjects:</span>
                              <span className="ml-2 font-semibold text-gray-900">{data.subjects}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm mt-2">Results pending</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items & Recommendations */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Academic Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">Strengths to Maintain</h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Excellent performance in Basic Science - continue current study methods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Strong improvement trend in Mathematics - build on this momentum</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Consistent attendance record - maintain this excellent habit</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">Areas for Growth</h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-600 mt-0.5">→</span>
                    <span>Focus on French vocabulary and grammar practice</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-600 mt-0.5">→</span>
                    <span>Increase reading comprehension practice for English Language</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-600 mt-0.5">→</span>
                    <span>Develop better time management skills for exam preparation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress; 