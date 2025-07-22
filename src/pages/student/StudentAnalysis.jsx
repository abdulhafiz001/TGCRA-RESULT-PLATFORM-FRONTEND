import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';

const StudentAnalysis = () => {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [analysisType, setAnalysisType] = useState('overview'); // 'overview', 'subject', 'actionplan'

  const studentInfo = {
    name: "Adebayo Sarah",
    class: "JSS 3A",
    session: "2023/2024",
    lastTerm: "First Term",
    currentTerm: "Second Term"
  };

  // Previous term results for analysis
  const lastTermResults = [
    { subject: 'Mathematics', firstTest: 18, secondTest: 16, exam: 51, total: 85, grade: 'B', position: 8, percentage: 56.7 },
    { subject: 'English Language', firstTest: 15, secondTest: 17, exam: 46, total: 78, grade: 'B', position: 12, percentage: 52.0 },
    { subject: 'Basic Science', firstTest: 19, secondTest: 18, exam: 55, total: 92, grade: 'A', position: 2, percentage: 61.3 },
    { subject: 'Social Studies', firstTest: 14, secondTest: 15, exam: 45, total: 74, grade: 'B', position: 15, percentage: 49.3 },
    { subject: 'Civic Education', firstTest: 16, secondTest: 17, exam: 49, total: 82, grade: 'B+', position: 7, percentage: 54.7 },
    { subject: 'Christian Religious Studies', firstTest: 17, secondTest: 19, exam: 53, total: 89, grade: 'A', position: 3, percentage: 59.3 },
    { subject: 'French Language', firstTest: 12, secondTest: 14, exam: 39, total: 65, grade: 'C+', position: 22, percentage: 43.3 },
    { subject: 'Computer Studies', firstTest: 18, secondTest: 17, exam: 52, total: 87, grade: 'A', position: 4, percentage: 58.0 }
  ];

  // Current term results for comparison
  const currentTermResults = [
    { subject: 'Mathematics', firstTest: 17, secondTest: 18, exam: 49, total: 84, grade: 'B+', position: 5, percentage: 56.0 },
    { subject: 'English Language', firstTest: 16, secondTest: 18, exam: 48, total: 82, grade: 'B+', position: 8, percentage: 54.7 },
    { subject: 'Basic Science', firstTest: 20, secondTest: 19, exam: 56, total: 95, grade: 'A+', position: 1, percentage: 63.3 },
    { subject: 'Social Studies', firstTest: 15, secondTest: 16, exam: 47, total: 78, grade: 'B', position: 12, percentage: 52.0 },
    { subject: 'Civic Education', firstTest: 17, secondTest: 18, exam: 50, total: 85, grade: 'A', position: 6, percentage: 56.7 },
    { subject: 'Christian Religious Studies', firstTest: 18, secondTest: 19, exam: 54, total: 91, grade: 'A+', position: 2, percentage: 60.7 },
    { subject: 'French Language', firstTest: 13, secondTest: 15, exam: 41, total: 69, grade: 'C+', position: 20, percentage: 46.0 },
    { subject: 'Computer Studies', firstTest: 19, secondTest: 18, exam: 53, total: 90, grade: 'A', position: 3, percentage: 60.0 }
  ];

  // Generate comprehensive analysis
  const generateAnalysis = () => {
    const analysis = {
      overallTrend: '',
      strengths: [],
      weaknesses: [],
      improvements: [],
      concerns: [],
      subjectAnalysis: {}
    };

    // Calculate overall trends
    const lastTermAvg = lastTermResults.reduce((sum, result) => sum + result.percentage, 0) / lastTermResults.length;
    const currentTermAvg = currentTermResults.reduce((sum, result) => sum + result.percentage, 0) / currentTermResults.length;
    const overallImprovement = currentTermAvg - lastTermAvg;

    if (overallImprovement > 3) {
      analysis.overallTrend = 'significant_improvement';
    } else if (overallImprovement > 0) {
      analysis.overallTrend = 'moderate_improvement';
    } else if (overallImprovement > -3) {
      analysis.overallTrend = 'stable';
    } else {
      analysis.overallTrend = 'declining';
    }

    // Analyze each subject
    lastTermResults.forEach(lastSubject => {
      const currentSubject = currentTermResults.find(current => current.subject === lastSubject.subject);
      if (currentSubject) {
        const improvement = currentSubject.percentage - lastSubject.percentage;
        const positionChange = lastSubject.position - currentSubject.position;

        const subjectData = {
          lastTerm: lastSubject,
          currentTerm: currentSubject,
          improvement,
          positionChange,
          analysis: '',
          recommendations: [],
          studyPlan: [],
          weakAreas: [],
          strengths: []
        };

        // Determine performance category
        if (currentSubject.percentage >= 70) {
          analysis.strengths.push(currentSubject.subject);
          subjectData.analysis = 'excellent';
        } else if (currentSubject.percentage >= 60) {
          subjectData.analysis = 'good';
        } else if (currentSubject.percentage >= 50) {
          analysis.weaknesses.push(currentSubject.subject);
          subjectData.analysis = 'needs_improvement';
        } else {
          analysis.concerns.push(currentSubject.subject);
          subjectData.analysis = 'critical';
        }

        // Track improvements
        if (improvement > 2) {
          analysis.improvements.push(currentSubject.subject);
        }

        // Generate specific recommendations based on subject and performance
        subjectData.recommendations = generateSubjectRecommendations(currentSubject.subject, subjectData);
        subjectData.studyPlan = generateStudyPlan(currentSubject.subject, subjectData);
        subjectData.weakAreas = identifyWeakAreas(lastSubject, currentSubject);

        analysis.subjectAnalysis[currentSubject.subject] = subjectData;
      }
    });

    return analysis;
  };

  const generateSubjectRecommendations = (subject, data) => {
    const recommendations = [];
    const percentage = data.currentTerm.percentage;

    switch (subject) {
      case 'Mathematics':
        if (percentage < 50) {
          recommendations.push('Focus on basic arithmetic and number operations');
          recommendations.push('Practice word problems daily for 30 minutes');
          recommendations.push('Use visual aids and manipulatives for better understanding');
          recommendations.push('Seek help from teacher or tutor for fundamental concepts');
        } else if (percentage < 65) {
          recommendations.push('Practice algebra and equation solving techniques');
          recommendations.push('Work on geometry and measurement problems');
          recommendations.push('Complete past question papers weekly');
          recommendations.push('Form study groups with classmates');
        } else {
          recommendations.push('Challenge yourself with advanced problem-solving');
          recommendations.push('Explore mathematical applications in real life');
          recommendations.push('Help classmates to reinforce your own understanding');
        }
        break;

      case 'English Language':
        if (percentage < 50) {
          recommendations.push('Read simple novels and stories daily for 20 minutes');
          recommendations.push('Practice basic grammar rules with exercises');
          recommendations.push('Build vocabulary with 10 new words daily');
          recommendations.push('Write simple paragraphs about daily experiences');
        } else if (percentage < 65) {
          recommendations.push('Practice essay writing with different formats');
          recommendations.push('Read newspapers and magazines for current affairs');
          recommendations.push('Practice comprehension passages regularly');
          recommendations.push('Join debate or drama club to improve speaking');
        } else {
          recommendations.push('Read classical literature and analyze themes');
          recommendations.push('Practice creative writing and poetry');
          recommendations.push('Participate in writing competitions');
        }
        break;

      case 'Basic Science':
        if (percentage < 50) {
          recommendations.push('Review basic scientific concepts and definitions');
          recommendations.push('Use diagrams and charts for better visualization');
          recommendations.push('Practice simple experiments at home');
          recommendations.push('Watch educational science videos');
        } else if (percentage < 65) {
          recommendations.push('Practice solving numerical problems in physics');
          recommendations.push('Memorize chemical formulas and equations');
          recommendations.push('Study biological processes with diagrams');
          recommendations.push('Participate in science club activities');
        } else {
          recommendations.push('Conduct advanced experiments and research');
          recommendations.push('Explore science fair projects');
          recommendations.push('Read scientific journals appropriate for your level');
        }
        break;

      case 'French Language':
        if (percentage < 50) {
          recommendations.push('Start with basic French vocabulary - 5 words daily');
          recommendations.push('Practice pronunciation with audio resources');
          recommendations.push('Learn basic sentence structures');
          recommendations.push('Use language learning apps for daily practice');
        } else if (percentage < 65) {
          recommendations.push('Practice conversation with classmates in French');
          recommendations.push('Watch French movies with subtitles');
          recommendations.push('Read simple French stories and articles');
          recommendations.push('Practice verb conjugations regularly');
        } else {
          recommendations.push('Engage in advanced French conversation');
          recommendations.push('Read French literature and newspapers');
          recommendations.push('Consider French cultural studies');
        }
        break;

      default:
        recommendations.push('Review class notes and textbook regularly');
        recommendations.push('Practice past examination questions');
        recommendations.push('Seek clarification from teacher on difficult topics');
        recommendations.push('Form study groups with classmates');
    }

    // Add general recommendations based on performance level
    if (data.improvement < 0) {
      recommendations.push('Analyze what changed from last term and address those factors');
      recommendations.push('Consider adjusting study schedule and environment');
    }

    return recommendations;
  };

  const generateStudyPlan = (subject, data) => {
    const plan = [];
    const percentage = data.currentTerm.percentage;

    if (percentage < 50) {
      plan.push({
        week: 'Week 1-2',
        focus: 'Foundation Building',
        activities: ['Review basic concepts', 'Complete remedial exercises', 'Meet with teacher for guidance'],
        timeCommitment: '1 hour daily'
      });
      plan.push({
        week: 'Week 3-4',
        focus: 'Practice & Application',
        activities: ['Solve practice questions', 'Apply concepts to simple problems', 'Self-assessment quizzes'],
        timeCommitment: '45 minutes daily'
      });
    } else if (percentage < 65) {
      plan.push({
        week: 'Week 1-2',
        focus: 'Skill Enhancement',
        activities: ['Practice intermediate problems', 'Group study sessions', 'Review weak areas'],
        timeCommitment: '45 minutes daily'
      });
      plan.push({
        week: 'Week 3-4',
        focus: 'Mastery & Testing',
        activities: ['Mock tests', 'Peer teaching', 'Advanced practice'],
        timeCommitment: '1 hour daily'
      });
    } else {
      plan.push({
        week: 'Week 1-2',
        focus: 'Excellence & Leadership',
        activities: ['Advanced problems', 'Help struggling classmates', 'Research projects'],
        timeCommitment: '30 minutes daily'
      });
      plan.push({
        week: 'Week 3-4',
        focus: 'Innovation & Exploration',
        activities: ['Creative applications', 'Independent research', 'Competitions'],
        timeCommitment: '45 minutes daily'
      });
    }

    return plan;
  };

  const identifyWeakAreas = (lastTerm, currentTerm) => {
    const weakAreas = [];

    // Analyze different components
    if (currentTerm.firstTest < 15) weakAreas.push('First Test Performance - may indicate poor preparation or understanding');
    if (currentTerm.secondTest < 15) weakAreas.push('Second Test Performance - suggests ongoing comprehension issues');
    if (currentTerm.exam < 35) weakAreas.push('Exam Performance - needs better exam techniques and preparation');
    
    // Compare with last term
    if (currentTerm.firstTest < lastTerm.firstTest) weakAreas.push('Declining continuous assessment - focus on class participation');
    if (currentTerm.exam < lastTerm.exam) weakAreas.push('Exam preparation needs improvement');

    return weakAreas;
  };

  const analysis = generateAnalysis();

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'significant_improvement':
        return { icon: '📈', color: 'text-green-600', text: 'Excellent Progress' };
      case 'moderate_improvement':
        return { icon: '📊', color: 'text-blue-600', text: 'Good Progress' };
      case 'stable':
        return { icon: '➖', color: 'text-yellow-600', text: 'Stable Performance' };
      case 'declining':
        return { icon: '📉', color: 'text-red-600', text: 'Needs Attention' };
      default:
        return { icon: '📊', color: 'text-gray-600', text: 'Unknown' };
    }
  };

  const getPerformanceColor = (analysis) => {
    switch (analysis) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs_improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const trendData = getTrendIcon(analysis.overallTrend);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Performance Analysis</h1>
              <p className="mt-1 text-lg text-gray-600">
                AI-powered insights and improvement recommendations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAnalysisType('overview')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    analysisType === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setAnalysisType('subject')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    analysisType === 'subject' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  By Subject
                </button>
                <button
                  onClick={() => setAnalysisType('actionplan')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    analysisType === 'actionplan' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Action Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{studentInfo.name}</h2>
              <p className="text-gray-600">{studentInfo.class} • {studentInfo.session}</p>
              <p className="text-sm text-gray-500 mt-1">
                Analyzing: {studentInfo.lastTerm} → {studentInfo.currentTerm}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl mb-2`}>{trendData.icon}</div>
              <p className={`font-semibold ${trendData.color}`}>{trendData.text}</p>
            </div>
          </div>
        </div>

        {/* Overview Analysis */}
        {analysisType === 'overview' && (
          <div className="space-y-8">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Strengths</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">{analysis.strengths.length}</div>
                <div className="space-y-1">
                  {analysis.strengths.slice(0, 2).map(subject => (
                    <p key={subject} className="text-sm text-gray-600">{subject}</p>
                  ))}
                  {analysis.strengths.length > 2 && (
                    <p className="text-xs text-gray-500">+{analysis.strengths.length - 2} more</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Improvements</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">{analysis.improvements.length}</div>
                <div className="space-y-1">
                  {analysis.improvements.slice(0, 2).map(subject => (
                    <p key={subject} className="text-sm text-gray-600">{subject}</p>
                  ))}
                  {analysis.improvements.length > 2 && (
                    <p className="text-xs text-gray-500">+{analysis.improvements.length - 2} more</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Needs Work</h3>
                <div className="text-2xl font-bold text-yellow-600 mb-2">{analysis.weaknesses.length}</div>
                <div className="space-y-1">
                  {analysis.weaknesses.slice(0, 2).map(subject => (
                    <p key={subject} className="text-sm text-gray-600">{subject}</p>
                  ))}
                  {analysis.weaknesses.length > 2 && (
                    <p className="text-xs text-gray-500">+{analysis.weaknesses.length - 2} more</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Priority Focus</h3>
                <div className="text-2xl font-bold text-red-600 mb-2">{analysis.concerns.length}</div>
                <div className="space-y-1">
                  {analysis.concerns.slice(0, 2).map(subject => (
                    <p key={subject} className="text-sm text-gray-600">{subject}</p>
                  ))}
                  {analysis.concerns.length > 2 && (
                    <p className="text-xs text-gray-500">+{analysis.concerns.length - 2} more</p>
                  )}
                </div>
              </div>
            </div>

            {/* Performance Comparison Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Term-by-Term Performance Comparison</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(analysis.subjectAnalysis).map(([subject, data]) => (
                    <div key={subject} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{subject}</h4>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceColor(data.analysis)}`}>
                            {data.currentTerm.grade}
                          </span>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${data.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.improvement >= 0 ? '+' : ''}{data.improvement.toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500">
                              {data.positionChange > 0 ? `↑${data.positionChange}` : data.positionChange < 0 ? `↓${Math.abs(data.positionChange)}` : '→'} positions
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{studentInfo.lastTerm}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gray-400 h-2 rounded-full"
                                style={{ width: `${data.lastTerm.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{data.lastTerm.percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{studentInfo.currentTerm}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${data.improvement >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${data.currentTerm.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{data.currentTerm.percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subject-by-Subject Analysis */}
        {analysisType === 'subject' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Detailed Subject Analysis</h3>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>All Subjects</option>
                    {Object.keys(analysis.subjectAnalysis).map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="p-6">
                {selectedSubject === 'All Subjects' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(analysis.subjectAnalysis).map(([subject, data]) => (
                      <div key={subject} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">{subject}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceColor(data.analysis)}`}>
                            {data.currentTerm.grade}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Performance Trend:</span>
                            <span className={`font-medium ${data.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.improvement >= 0 ? 'Improving' : 'Declining'}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Top Recommendations:</p>
                            <ul className="space-y-1">
                              {data.recommendations.slice(0, 3).map((rec, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-blue-500 mr-2">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <button 
                            onClick={() => setSelectedSubject(subject)}
                            className="w-full mt-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                          >
                            View Detailed Analysis
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {analysis.subjectAnalysis[selectedSubject] && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedSubject} - Detailed Analysis</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {analysis.subjectAnalysis[selectedSubject].currentTerm.percentage.toFixed(1)}%
                              </div>
                              <p className="text-sm text-gray-600">Current Performance</p>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${analysis.subjectAnalysis[selectedSubject].improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {analysis.subjectAnalysis[selectedSubject].improvement >= 0 ? '+' : ''}{analysis.subjectAnalysis[selectedSubject].improvement.toFixed(1)}%
                              </div>
                              <p className="text-sm text-gray-600">Change from Last Term</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                #{analysis.subjectAnalysis[selectedSubject].currentTerm.position}
                              </div>
                              <p className="text-sm text-gray-600">Class Position</p>
                            </div>
                          </div>

                          {analysis.subjectAnalysis[selectedSubject].weakAreas.length > 0 && (
                            <div className="mb-6">
                              <h5 className="font-semibold text-gray-900 mb-3">Areas Needing Attention:</h5>
                              <ul className="space-y-2">
                                {analysis.subjectAnalysis[selectedSubject].weakAreas.map((area, index) => (
                                  <li key={index} className="text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                                    ⚠️ {area}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h5 className="font-semibold text-gray-900 mb-4">📚 Personalized Recommendations</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {analysis.subjectAnalysis[selectedSubject].recommendations.map((recommendation, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
                                <p className="text-sm text-blue-800">{recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Plan */}
        {analysisType === 'actionplan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Personalized Study Action Plan</h3>
                <p className="text-sm text-gray-600 mt-1">4-week improvement strategy based on your performance analysis</p>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {Object.entries(analysis.subjectAnalysis)
                    .filter(([_, data]) => data.analysis === 'critical' || data.analysis === 'needs_improvement')
                    .slice(0, 3)
                    .map(([subject, data]) => (
                    <div key={subject} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{subject}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceColor(data.analysis)}`}>
                          Priority: {data.analysis === 'critical' ? 'High' : 'Medium'}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {data.studyPlan.map((week, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-gray-900">{week.week}: {week.focus}</h5>
                              <span className="text-sm text-blue-600 font-medium">{week.timeCommitment}</span>
                            </div>
                            <ul className="space-y-1">
                              {week.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-sm text-gray-600 flex items-center">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Success Tips */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-4">🎯 Additional Success Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-blue-800">Study Environment:</h5>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>• Create a quiet, well-lit study space</li>
                        <li>• Minimize distractions (phone, TV, etc.)</li>
                        <li>• Have all materials ready before studying</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-blue-800">Study Techniques:</h5>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>• Use active recall instead of just re-reading</li>
                        <li>• Take breaks every 45-60 minutes</li>
                        <li>• Teach concepts to others to reinforce learning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnalysis; 