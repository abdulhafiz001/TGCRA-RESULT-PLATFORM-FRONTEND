// Simple integration test script
// This script tests the basic connectivity between frontend and backend

const API_BASE_URL = 'http://localhost:8000/api';

async function testBackendConnection() {
  console.log('🧪 Testing Backend Connection...');
  
  try {
    // Test 1: Check if backend is running
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      console.log('✅ Backend is running and accessible');
    } else {
      console.log('❌ Backend responded but with error status');
    }
  } catch (error) {
    console.log('❌ Backend is not accessible:', error.message);
    console.log('💡 Make sure the Laravel backend is running on http://localhost:8000');
  }
}

async function testStudentLogin() {
  console.log('\n🧪 Testing Student Login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/student/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        admission_number: 'TGCRA/2024/001',
        password: 'mypassword'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      console.log('✅ Student login successful');
      console.log('🔑 Token received:', data.token.substring(0, 20) + '...');
      return data.token;
    } else {
      console.log('❌ Student login failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Student login error:', error.message);
    return null;
  }
}

async function testStudentDashboard(token) {
  if (!token) {
    console.log('❌ Skipping dashboard test - no token available');
    return;
  }
  
  console.log('\n🧪 Testing Student Dashboard...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/student/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Student dashboard accessible');
      console.log('📊 Dashboard data received:', Object.keys(data));
    } else {
      console.log('❌ Student dashboard failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Student dashboard error:', error.message);
  }
}

async function testAdminLogin() {
  console.log('\n🧪 Testing Admin Login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@school.com',
        password: 'password'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      console.log('✅ Admin login successful');
      console.log('🔑 Token received:', data.token.substring(0, 20) + '...');
      return data.token;
    } else {
      console.log('❌ Admin login failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Admin login error:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Starting Frontend-Backend Integration Tests\n');
  
  // Test 1: Backend connectivity
  await testBackendConnection();
  
  // Test 2: Student authentication
  const studentToken = await testStudentLogin();
  
  // Test 3: Student dashboard
  await testStudentDashboard(studentToken);
  
  // Test 4: Admin authentication
  const adminToken = await testAdminLogin();
  
  console.log('\n🎉 Integration tests completed!');
  console.log('\n📋 Summary:');
  console.log('- Backend should be running on http://localhost:8000');
  console.log('- Frontend should be running on http://localhost:5173');
  console.log('- Check the console for any error messages above');
}

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  runTests().catch(console.error);
} else {
  // Browser environment
  window.runIntegrationTests = runTests;
  console.log('🔧 Integration tests available. Run window.runIntegrationTests() in console');
} 