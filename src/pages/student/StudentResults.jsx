import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../services/API';
import { useNotification } from '../../contexts/NotificationContext';
// Remove html2canvas and jsPDF imports - we'll use simpler methods
// Dynamic import for download features
const StudentResults = () => {
  const [selectedTerm, setSelectedTerm] = useState('Second Term');
  const [selectedSession, setSelectedSession] = useState('2023/2024');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showError } = useNotification();

  const studentInfo = {
    name: user?.name || "Loading...",
    admissionNumber: user?.admission_number || "Loading...",
    class: user?.class?.name || "Loading...",
    session: "2023/2024"
  };

  const schoolInfo = {
    name: 'TGCRA Secondary School',
    logo: '/images/logo.png',
    address: 'Plot 12, Education Crescent, Victoria Island, Lagos, Nigeria',
  };

  const terms = ['First Term', 'Second Term', 'Third Term'];
  const sessions = ['2022/2023', '2023/2024', '2024/2025'];

  // Fetch results data
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await API.get('/student/results');
        setResults(response.data);
      } catch (err) {
        showError(err.response?.data?.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Mock results structure for now - will be replaced by API data
  const mockResults = {
    'First Term': [],
    'Second Term': [],
    'Third Term': []
  };

  // Grade scale
  const gradeScale = [
    { grade: 'A', min: 70, max: 100, remark: 'Excellent' },
    { grade: 'B', min: 60, max: 69, remark: 'Very Good' },
    { grade: 'C', min: 50, max: 59, remark: 'Good' },
    { grade: 'D', min: 45, max: 49, remark: 'Fair' },
    { grade: 'E', min: 40, max: 44, remark: 'Pass' },
    { grade: 'F', min: 0, max: 39, remark: 'Fail' },
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'text-green-800 bg-green-100';
      case 'A':
        return 'text-green-700 bg-green-50';
      case 'B+':
        return 'text-blue-700 bg-blue-50';
      case 'B':
        return 'text-blue-600 bg-blue-50';
      case 'C':
        return 'text-yellow-700 bg-yellow-50';
      case 'D':
        return 'text-orange-700 bg-orange-50';
      case 'F':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const currentResults = results[selectedTerm] || [];
  // Helper to recalculate exam and total for new scale
  const getScaledResults = (resultsArr) => resultsArr.map(result => {
    const exam = Math.round((result.exam / 100) * 60);
    const total = result.firstTest + result.secondTest + exam;
    // Grade logic
    let grade = 'F';
    let gradeRemark = 'Fail';
    for (const scale of gradeScale) {
      if (total >= scale.min && total <= scale.max) {
        grade = scale.grade;
        gradeRemark = scale.remark;
        break;
      }
    }
    return {
      ...result,
      exam,
      total,
      grade,
      remark: gradeRemark,
    };
  });

  const scaledResults = getScaledResults(currentResults);
  const totalScore = scaledResults.reduce((sum, result) => sum + result.total, 0);
  const averageScore = scaledResults.length > 0 ? (totalScore / scaledResults.length).toFixed(1) : 0;
  const overallPosition = scaledResults.length > 0 ? Math.round(scaledResults.reduce((sum, result) => sum + result.position, 0) / scaledResults.length) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COLORS.primary.red }}></div>
      </div>
    );
  }

  // Generate random teacher and principal remarks based on average score
  const getRandomRemark = (remarks) => {
    return remarks[Math.floor(Math.random() * remarks.length)];
  };

  let teacherRemark = '';
  let principalRemark = '';
  const avg = parseFloat(averageScore);
  
  if (avg >= 80) {
    // Excellent performance (80-100)
    const teacherRemarks = [
      `Absolutely outstanding performance this term! ${studentInfo.name} has demonstrated exceptional understanding across all subjects and consistently delivers work of the highest quality. This level of academic excellence is truly commendable and sets a wonderful example for other students.`,
      `What a remarkable achievement! ${studentInfo.name} has shown mastery in every subject area and continues to exceed expectations. The dedication to learning and consistent high performance is inspiring. Keep up this phenomenal work!`,
      `Exceptional work throughout this term! ${studentInfo.name} displays brilliant analytical skills and deep understanding of concepts. The consistent excellence across all subjects reflects outstanding commitment to academic success. This is truly exemplary performance.`,
      `Absolutely brilliant academic performance! ${studentInfo.name} has achieved excellence in every aspect of learning this term. The thoroughness of work and depth of understanding demonstrated is remarkable. Continue this outstanding trajectory!`
    ];
    
    const principalRemarks = [
      `${studentInfo.name} has brought great honor to our school this term with such outstanding academic excellence. This level of achievement reflects not just intelligence, but also exceptional dedication and strong character. We are incredibly proud of this remarkable performance.`,
      `What an extraordinary academic achievement! ${studentInfo.name} has demonstrated the highest standards of excellence and continues to be a shining example of what dedication and hard work can accomplish. The school community celebrates this outstanding success.`,
      `Truly exceptional performance that makes the entire school proud! ${studentInfo.name} has shown remarkable consistency in achieving excellence across all subjects. This outstanding academic achievement reflects strong values and commitment to learning.`,
      `${studentInfo.name} has achieved academic excellence that stands as an inspiration to the entire school community. This remarkable performance demonstrates exceptional ability, dedication, and the pursuit of excellence in all endeavors. Congratulations on this outstanding achievement!`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  } else if (avg >= 70) {
    // Very good performance (70-79)
    const teacherRemarks = [
      `Excellent work this term! ${studentInfo.name} has shown strong understanding across most subjects and consistently produces quality work. There are still opportunities to reach even greater heights, but this performance demonstrates solid academic foundation and good study habits.`,
      `Very impressive academic performance! ${studentInfo.name} displays good grasp of concepts and shows consistent effort in all subject areas. With continued focus and perhaps a bit more attention to detail, even higher achievements are definitely within reach.`,
      `Strong academic showing this term! ${studentInfo.name} has performed well across all subjects and shows good analytical thinking. The work quality is commendable, and with sustained effort, excellent results can be achieved in the next term.`,
      `Commendable academic performance! ${studentInfo.name} demonstrates solid understanding and good work ethic. The results reflect consistent effort and good study habits. Keep pushing forward as there's definitely potential for even greater success.`
    ];
    
    const principalRemarks = [
      `${studentInfo.name} has achieved very good results this term and should be proud of this solid academic performance. The consistency shown across subjects reflects good character and steady work ethic. With continued dedication, even greater achievements await.`,
      `Well done on achieving such good academic results! ${studentInfo.name} has demonstrated reliable performance and good understanding across all subject areas. This steady progress and consistent effort are qualities that will lead to continued success.`,
      `${studentInfo.name} has shown commendable academic performance this term. The good results achieved reflect steady application and growing understanding. Continue this positive trajectory and even better results will surely follow.`,
      `Very pleased with ${studentInfo.name}'s academic progress this term. The good performance across subjects shows developing maturity and consistent effort. Keep up the good work and strive for even greater excellence next term.`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  } else if (avg >= 60) {
    // Good performance (60-69)
    const teacherRemarks = [
      `Good academic progress this term! ${studentInfo.name} shows understanding in most areas but there's room for improvement in consistency and depth of work. Focus on strengthening weaker subjects while maintaining performance in stronger areas. More regular practice and review will help achieve better results.`,
      `Satisfactory performance with potential for growth! ${studentInfo.name} demonstrates good effort in several subjects but needs to work on maintaining consistency across all areas. Additional attention to homework completion and class participation will definitely improve overall results.`,
      `Decent academic showing this term! ${studentInfo.name} has achieved reasonable results but there's clear potential for higher performance. Focus on improving study techniques, time management, and seeking help when concepts are unclear. Better results are definitely achievable.`,
      `Fair academic performance with room for enhancement! ${studentInfo.name} shows good understanding in some subjects but needs more consistent effort across all areas. Regular revision, completing all assignments, and active participation in class will lead to improved results.`
    ];
    
    const principalRemarks = [
      `${studentInfo.name} has achieved fair results this term but we know there's potential for much better performance. Focus on developing better study habits, managing time effectively, and seeking support when needed. Consistent effort will lead to improved academic outcomes.`,
      `Reasonable academic performance from ${studentInfo.name} this term, but there's definite room for improvement. Work on strengthening fundamental concepts, improving attendance, and being more engaged in classroom activities. Better results are within reach with increased effort.`,
      `${studentInfo.name} has shown moderate progress this term but can certainly achieve more with increased dedication. Focus on completing all assignments, participating actively in class, and developing more effective study strategies for better academic success.`,
      `Fair academic results from ${studentInfo.name} this term. While the performance is acceptable, there's clear potential for significant improvement. Encourage more consistent study habits, better time management, and active engagement with learning materials.`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  } else if (avg >= 50) {
    // Average performance (50-59)
    const teacherRemarks = [
      `${studentInfo.name} has achieved average results this term, which shows basic understanding but indicates significant room for improvement. Focus on strengthening fundamental concepts, improving homework completion rates, and seeking additional help when struggling with topics. More consistent effort is needed for better outcomes.`,
      `Average performance this term shows that ${studentInfo.name} grasps some concepts but struggles with consistency and depth. Recommend developing better study routines, attending extra lessons when available, and working more closely with subject teachers to identify and address specific weaknesses.`,
      `The results indicate that ${studentInfo.name} is working at an average level but has the potential to achieve much more. Focus on improving concentration during lessons, completing all assignments thoroughly, and developing more effective study techniques. Regular practice will lead to better understanding.`,
      `${studentInfo.name} shows average academic performance which suggests the need for more focused effort and better study strategies. Work on time management, regular revision, and don't hesitate to ask questions when concepts are unclear. Improvement is definitely possible with increased dedication.`
    ];
    
    const principalRemarks = [
      `${studentInfo.name} has achieved average results this term, but we believe there's much more potential to be unlocked. Encourage the development of better study habits, improved class attendance, and more active participation in learning activities. Academic success requires consistent effort and dedication.`,
      `The academic performance shown by ${studentInfo.name} this term is average but concerning as it indicates unrealized potential. Focus should be on developing discipline in studies, better time management, and seeking support from teachers and parents to improve academic outcomes.`,
      `${studentInfo.name} has performed at an average level this term which, while acceptable, falls short of what we believe can be achieved. Encourage more serious commitment to studies, regular homework completion, and active engagement with learning materials for better results.`,
      `Average academic results from ${studentInfo.name} this term suggest the need for renewed focus and commitment to learning. Work together with teachers and parents to develop strategies for improvement, better study habits, and increased motivation towards academic success.`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  } else if (avg >= 40) {
    // Below average performance (40-49)
    const teacherRemarks = [
      `${studentInfo.name} has struggled academically this term and needs immediate intervention to improve performance. The results indicate gaps in fundamental understanding that require urgent attention. Recommend extra lessons, one-on-one support, and significantly increased study time at home. Parents should closely monitor and support academic activities.`,
      `Concerning academic performance from ${studentInfo.name} this term. The low scores across subjects suggest serious challenges that need immediate addressing. Focus on basic concepts, ensure regular school attendance, complete all homework assignments, and seek additional support from teachers. Significant improvement is needed next term.`,
      `${studentInfo.name} is performing below expectations and needs substantial support to improve academic outcomes. The results indicate fundamental gaps in understanding that require intensive remediation. Recommend working closely with subject teachers, attending all remedial classes, and developing structured study schedules.`,
      `Poor academic performance this term requires immediate action and support for ${studentInfo.name}. The low results suggest difficulties with basic concepts and study habits. Essential to work with parents and teachers to create a comprehensive improvement plan including extra tutoring and intensive practice sessions.`
    ];
    
    const principalRemarks = [
      `${studentInfo.name}'s academic performance this term is below our expectations and requires immediate attention from all stakeholders. This level of performance indicates serious challenges that need collaborative effort from student, parents, and teachers to address. A comprehensive academic support plan must be implemented immediately.`,
      `The academic results shown by ${studentInfo.name} this term are concerning and require urgent intervention. We need to work together to identify the root causes of poor performance and implement effective strategies for improvement. Academic success requires commitment from everyone involved.`,
      `${studentInfo.name} has faced significant academic challenges this term as reflected in these results. This performance level is not acceptable and requires immediate remedial action. We must collaborate closely to provide the necessary support and create an environment conducive to academic improvement.`,
      `Seriously concerning academic performance from ${studentInfo.name} this term that demands immediate attention and intervention. The school is committed to providing additional support, but success will require renewed commitment from the student and active involvement from parents in the learning process.`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  } else {
    // Poor performance (below 40)
    const teacherRemarks = [
      `${studentInfo.name} has experienced significant academic difficulties this term with performance well below acceptable standards. This requires immediate and intensive intervention including remedial classes, one-on-one tutoring, and complete restructuring of study approaches. Parent involvement and additional support at home are crucial for any hope of improvement.`,
      `Extremely poor academic performance from ${studentInfo.name} this term that requires urgent and comprehensive intervention. The consistently low scores indicate fundamental learning gaps that need immediate attention. Recommend intensive remedial support, possible curriculum modification, and close collaboration between home and school for recovery.`,
      `${studentInfo.name} is facing severe academic challenges as evidenced by this term's very poor results. This level of performance indicates serious underlying issues that require immediate diagnostic assessment and intensive remedial intervention. Academic recovery will require significant commitment from all parties and possibly alternative learning strategies.`,
      `Critically poor academic performance from ${studentInfo.name} this term that requires emergency intervention measures. The extremely low results across all subjects suggest fundamental learning difficulties that need immediate professional assessment and intensive support. Academic survival depends on immediate and sustained intervention efforts.`
    ];
    
    const principalRemarks = [
      `${studentInfo.name}'s academic performance this term is critically poor and represents an emergency situation requiring immediate intervention from all stakeholders. This level of academic failure indicates serious systemic issues that demand urgent attention, possible academic counseling, and comprehensive support strategies to prevent complete academic breakdown.`,
      `The extremely poor academic results from ${studentInfo.name} this term are alarming and require immediate crisis intervention measures. This performance level threatens academic progression and requires urgent collaboration between school, parents, and possibly external support services to address underlying causes and implement recovery strategies.`,
      `${studentInfo.name} has experienced academic failure this term that requires emergency response and intensive support measures. This critically poor performance indicates severe learning challenges that need immediate professional intervention, possible curriculum adjustments, and comprehensive academic recovery planning.`,
      `Gravely concerning academic performance from ${studentInfo.name} this term that requires immediate and sustained intervention to prevent academic catastrophe. The school is implementing emergency support measures, but success will require total commitment from student, parents, and all support systems working together intensively.`
    ];
    
    teacherRemark = getRandomRemark(teacherRemarks);
    principalRemark = getRandomRemark(principalRemarks);
  }

  const resultRef = useRef(null);

  // Generate clean HTML content for download
  const generateCleanHTML = () => {
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student Result - ${studentInfo.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              background: white;
            }
            .result-content { 
              max-width: 800px; 
              margin: 0 auto; 
            }
            .school-header { 
              text-align: center; 
              margin-bottom: 30px; 
            }
            .school-logo { 
              width: 80px; 
              height: auto; 
              margin: 0 auto 10px; 
              display: block; 
            }
            .school-name { 
              font-size: 24px; 
              font-weight: bold; 
              margin: 10px 0; 
            }
            .school-address { 
              font-size: 14px; 
              color: #666; 
              margin-bottom: 20px; 
            }
            .student-info {
              background: #f9f9f9;
              padding: 15px;
              margin: 20px 0;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .student-info h3 {
              margin: 0 0 10px 0;
              color: #333;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
              font-size: 12px;
            }
            th, td { 
              border: 1px solid #333; 
              padding: 8px; 
              text-align: center; 
            }
            th { 
              background-color: #f5f5f5; 
              font-weight: bold;
            }
            .text-left { text-align: left; }
            .remarks-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 20px 0;
            }
            .remark-box {
              border: 1px solid #ddd;
              padding: 15px;
              background: #f9f9f9;
              border-radius: 5px;
            }
            .remark-box h4 {
              margin: 0 0 10px 0;
              color: #333;
            }
            .grade-scale {
              margin: 20px 0;
            }
            .grade-scale h4 {
              margin-bottom: 10px;
            }
            .grade-table {
              font-size: 11px;
            }
            .summary-stats {
              background: #e8f4f8;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              text-align: center;
            }
            .stat-item {
              background: white;
              padding: 10px;
              border-radius: 3px;
            }
            .stat-value {
              font-size: 18px;
              font-weight: bold;
              color: #f30401;
            }
            .stat-label {
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="result-content">
            <div class="school-header">
              <img src="${schoolInfo.logo}" alt="School Logo" class="school-logo" />
              <div class="school-name">${schoolInfo.name}</div>
              <div class="school-address">${schoolInfo.address}</div>
            </div>

            <h2 style="text-align: center; color: #f30401; margin: 20px 0;">View Academic Performance and Progress</h2>

            <div class="student-info">
              <h3>Student Information</h3>
              <div class="info-grid">
                <div><strong>Name:</strong> ${studentInfo.name}</div>
                <div><strong>Admission Number:</strong> ${studentInfo.admissionNumber}</div>
                <div><strong>Class:</strong> ${studentInfo.class}</div>
                <div><strong>Session:</strong> ${selectedSession}</div>
              </div>
              <div style="margin-top: 10px;"><strong>Term:</strong> ${selectedTerm}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th class="text-left">Subject</th>
                  <th>1st Test (20)</th>
                  <th>2nd Test (20)</th>
                  <th>Exam (60)</th>
                  <th>Total (100)</th>
                  <th>Grade</th>
                  <th>Position</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                ${scaledResults.map(result => `
                  <tr>
                    <td class="text-left">${result.subject}</td>
                    <td>${result.firstTest}</td>
                    <td>${result.secondTest}</td>
                    <td>${result.exam}</td>
                    <td>${result.total}</td>
                    <td>${result.grade}</td>
                    <td>${result.position}</td>
                    <td>${result.remark}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="summary-stats">
              <h4 style="text-align: center; margin-bottom: 15px;">Performance Summary</h4>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-value">${totalScore}</div>
                  <div class="stat-label">Total Score</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${averageScore}%</div>
                  <div class="stat-label">Average Score</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${overallPosition}</div>
                  <div class="stat-label">Overall Position</div>
                </div>
              </div>
            </div>

            <div class="remarks-section">
              <div class="remark-box">
                <h4>Teacher's Remark</h4>
                <p>${teacherRemark}</p>
              </div>
              <div class="remark-box">
                <h4>Principal's Remark</h4>
                <p>${principalRemark}</p>
              </div>
            </div>

            <div class="grade-scale">
              <h4>Grade Scale</h4>
              <table class="grade-table">
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Score Range</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  ${gradeScale.map(scale => `
                    <tr>
                      <td>${scale.grade}</td>
                      <td>${scale.min} - ${scale.max}</td>
                      <td>${scale.remark}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `;
    return content;
  };

  // Print Result - Same clean format as downloads
  const handlePrintResult = () => {
    try {
      const htmlContent = generateCleanHTML();
      const newWindow = window.open('', '_blank');
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      
      // Auto-trigger print dialog
      setTimeout(() => {
        newWindow.print();
      }, 1000);
    } catch (error) {
      alert('Failed to print result. Please try again.');
      console.error('Print error:', error);
    }
  };

  // Download as PDF - Simple approach
  const handleDownloadPDF = () => {
    try {
      const htmlContent = generateCleanHTML();
      const newWindow = window.open('', '_blank');
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      
      // Add download instruction
      setTimeout(() => {
        const instructions = newWindow.document.createElement('div');
        instructions.innerHTML = `
          <div style="position: fixed; top: 10px; left: 10px; background: #f30401; color: white; padding: 10px; border-radius: 5px; font-family: Arial; z-index: 1000;">
            <strong>Kindly take a screenshot</strong> of this page to save as PDF
            <button onclick="this.parentElement.remove()" style="margin-left: 10px; background: white; color: #f30401; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">×</button>
          </div>
        `;
        newWindow.document.body.appendChild(instructions);
      }, 1000);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', error);
    }
  };

  // Download as Image - Simple approach
  const handleDownloadImage = () => {
    try {
      const htmlContent = generateCleanHTML();
      const newWindow = window.open('', '_blank');
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      
      // Add download instruction
      setTimeout(() => {
        const instructions = newWindow.document.createElement('div');
        instructions.innerHTML = `
          <div style="position: fixed; top: 10px; left: 10px; background: #28a745; color: white; padding: 10px; border-radius: 5px; font-family: Arial; z-index: 1000;">
            <strong>Kindly take a screenshot</strong> of this page to save as image
            <button onclick="this.parentElement.remove()" style="margin-left: 10px; background: white; color: #28a745; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">×</button>
          </div>
        `;
        newWindow.document.body.appendChild(instructions);
      }, 1000);
    } catch (error) {
      alert('Failed to generate image. Please try again.');
      console.error('Image generation error:', error);
    }
  };

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
        <p className="text-gray-600">View your academic performance and progress</p>
        <div className="flex flex-col items-center mt-4 space-y-2">
          <img src={schoolInfo.logo} alt="School Logo" className="h-40 w-40 object-contain" />
          <span className="text-2xl font-bold text-gray-800">{schoolInfo.name}</span>
          <span className="text-gray-500 text-sm">{schoolInfo.address}</span>
        </div>
      </div>
      <div ref={resultRef} id="result-sheet">
      {/* Student Info Card */}
      <div className="bg-white shadow rounded-lg mb-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h2>
            <p className="text-sm text-gray-500">
              {studentInfo.class} • {studentInfo.admissionNumber} • {studentInfo.session}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="session" className="block text-sm font-medium text-gray-700">
                Session
              </label>
              <select
                id="session"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {sessions.map(session => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                Term
              </label>
              <select
                id="term"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
        {scaledResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: COLORS.primary.red }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Subjects
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                        {scaledResults.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-white bg-green-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {averageScore}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: COLORS.primary.yellow }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Class Position
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {overallPosition}{overallPosition === 1 ? 'st' : overallPosition === 2 ? 'nd' : overallPosition === 3 ? 'rd' : 'th'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: COLORS.primary.blue }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Subjects Passed
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                        {scaledResults.filter(r => r.total >= 40).length}/{scaledResults.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {selectedTerm} Results - {selectedSession}
          </h3>
        </div>
          {scaledResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    1st Test (20)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    2nd Test (20)
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
                  {scaledResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.firstTest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.secondTest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.exam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.position}{result.position === 1 ? 'st' : result.position === 2 ? 'nd' : result.position === 3 ? 'rd' : 'th'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results available</h3>
            <p className="mt-1 text-sm text-gray-500">
              Results for {selectedTerm} have not been published yet.
            </p>
          </div>
        )}
      </div>

        {/* Teacher/Principal Remarks */}
        {scaledResults.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h4 className="font-semibold mb-2">Teacher's Remark</h4>
              <div className="w-full border border-gray-300 rounded p-2 bg-gray-50 text-gray-700 min-h-[48px]">{teacherRemark}</div>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h4 className="font-semibold mb-2">Principal's Remark</h4>
              <div className="w-full border border-gray-300 rounded p-2 bg-gray-50 text-gray-700 min-h-[48px]">{principalRemark}</div>
            </div>
          </div>
        )}
        {/* Grade Scale Table */}
        <div className="mt-8 bg-white p-6 rounded shadow max-w-xl mx-auto">
          <h4 className="font-semibold mb-2">Grade Scale</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Grade</th>
                <th className="px-4 py-2 text-left">Score Range</th>
                <th className="px-4 py-2 text-left">Remark</th>
              </tr>
            </thead>
            <tbody>
              {gradeScale.map((scale, idx) => (
                <tr key={scale.grade} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2 font-bold">{scale.grade}</td>
                  <td className="px-4 py-2">{scale.min} - {scale.max}</td>
                  <td className="px-4 py-2">{scale.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Print/Download Actions */}
      {scaledResults.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          <button
            onClick={handlePrintResult}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Print Results
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: COLORS.primary.red }}
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadImage}
            className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: COLORS.primary.red }}
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
