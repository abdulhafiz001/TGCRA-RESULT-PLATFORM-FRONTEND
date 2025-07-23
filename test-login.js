// Simple test script to verify login functionality
// Run this in the browser console when both servers are running

async function testLoginAPI() {
  const API_BASE_URL = 'http://localhost:8000/api';
  
  console.log('🧪 Testing Login API...');
  
  // Test admin login
  try {
    console.log('📝 Testing admin login...');
    const adminResponse = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password'
      })
    });
    
    const adminData = await adminResponse.json();
    
    if (adminResponse.ok) {
      console.log('✅ Admin login successful:', adminData);
    } else {
      console.log('❌ Admin login failed:', adminData);
    }
  } catch (error) {
    console.log('❌ Admin login error:', error);
  }
  
  // Test student login
  try {
    console.log('📝 Testing student login...');
    const studentResponse = await fetch(`${API_BASE_URL}/student/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        admission_number: 'ADM/2024/001',
        password: 'mypassword'
      })
    });
    
    const studentData = await studentResponse.json();
    
    if (studentResponse.ok) {
      console.log('✅ Student login successful:', studentData);
    } else {
      console.log('❌ Student login failed:', studentData);
    }
  } catch (error) {
    console.log('❌ Student login error:', error);
  }
  
  console.log('🏁 Login API tests completed');
}

// Test the frontend API service
async function testFrontendAPI() {
  console.log('🧪 Testing Frontend API Service...');
  
  try {
    // Import the API service (this assumes the module is available)
    const API = window.API || (await import('./src/services/API.js')).default;
    
    console.log('📝 Testing admin login through API service...');
    const adminResult = await API.login('admin', 'password');
    console.log('✅ Frontend admin login successful:', adminResult);
    
    console.log('📝 Testing student login through API service...');
    const studentResult = await API.studentLogin('ADM/2024/001', 'mypassword');
    console.log('✅ Frontend student login successful:', studentResult);
    
  } catch (error) {
    console.log('❌ Frontend API test error:', error);
  }
  
  console.log('🏁 Frontend API tests completed');
}

// Test notification system
function testNotifications() {
  console.log('🧪 Testing Notification System...');

  // This will only work if the notification context is available
  try {
    // Try to trigger a test notification
    if (window.React && window.React.useContext) {
      console.log('✅ React context system is available');
    } else {
      console.log('❌ React context system not available');
    }

    console.log('📝 To test notifications, use the login forms and observe the notification behavior');
    console.log('✅ Expected: Beautiful animated notifications should appear on login success/failure');

  } catch (error) {
    console.log('❌ Notification test error:', error);
  }

  console.log('🏁 Notification tests completed');
}

// Make functions available globally for browser console testing
window.testLoginAPI = testLoginAPI;
window.testFrontendAPI = testFrontendAPI;
window.testNotifications = testNotifications;

console.log('🚀 Test functions loaded:');
console.log('  - testLoginAPI() - Test backend API endpoints');
console.log('  - testFrontendAPI() - Test frontend API service');
console.log('  - testNotifications() - Test notification system');
