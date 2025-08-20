const API_BASE_URL = 'http://localhost:8000/api';

class API {
    constructor() {
        this.baseURL = API_BASE_URL;
        // this.token = localStorage.getItem('token'); // This line is removed
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Get headers for API requests
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Always get the latest token from localStorage
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            headers['Authorization'] = `Bearer ${currentToken}`;
        }

        return headers;
    }

    // Make API request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = this.getHeaders();
        const config = {
            headers,
            ...options,
        };

        console.log('🔍 API Request Debug:');
        console.log('URL:', url);
        console.log('Headers:', headers);
        console.log('Method:', options.method || 'GET');
        console.log('Token being sent:', headers.Authorization);

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            console.log('🔍 API Response Debug:');
            console.log('Status:', response.status);
            console.log('Response data:', data);

            if (!response.ok) {
                // Create error object that matches expected structure
                const error = new Error(data.message || 'Something went wrong');
                error.response = {
                    data: data,
                    status: response.status,
                    statusText: response.statusText
                };
                throw error;
            }

            return { data, status: response.status };
        } catch (error) {
            console.error('❌ API Error:', error);
            // If it's a network error, create a proper error structure
            if (!error.response) {
                error.response = {
                    data: { message: error.message },
                    status: 0,
                    statusText: 'Network Error'
                };
            }
            throw error;
        }
    }

    // HTTP method helpers
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return await this.request(url, { method: 'GET' });
    }

    async post(endpoint, data = {}) {
        return await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data = {}) {
        return await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint) {
        return await this.request(endpoint, {
            method: 'DELETE',
        });
    }

    // Authentication
    async login(username, password) {
        const response = await this.post('/login', { username, password });

        if (response.data.token) {
            this.setToken(response.data.token);
        }

        return response;
    }

    async studentLogin(admissionNumber, password) {
        const response = await this.post('/student/login', {
            admission_number: admissionNumber,
            password
        });

        if (response.data.token) {
            this.setToken(response.data.token);
        }

        return response;
    }

    async logout() {
        await this.post('/logout');
        this.clearToken();
    }

    async getUser() {
        return await this.get('/user');
    }

    // Get current user data
    async getCurrentUser() {
        return await this.request('/user');
    }

    // Check if teacher is a form teacher

    // Admin APIs
    async getAdminDashboard() {
        return await this.request('/admin/dashboard');
    }

    async getUsers() {
        return await this.request('/admin/users');
    }

    async createUser(userData) {
        return await this.request('/admin/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async updateUser(userId, userData) {
        return await this.request(`/admin/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(userId, hardDelete = false) {
        const url = hardDelete
            ? `/admin/users/${userId}?hard_delete=true`
            : `/admin/users/${userId}`;
        return await this.request(url, {
            method: 'DELETE',
        });
    }

    async getTeacherAssignments() {
        return await this.request('/admin/teacher-assignments');
    }

    async assignTeacher(assignmentData) {
        return await this.request('/admin/teacher-assignments', {
            method: 'POST',
            body: JSON.stringify(assignmentData),
        });
    }

    async removeTeacherAssignment(assignmentId) {
        return await this.request(`/admin/teacher-assignments/${assignmentId}`, {
            method: 'DELETE',
        });
    }

    // Class APIs
    async getClasses() {
        return await this.request('/admin/classes');
    }

    async createClass(classData) {
        return await this.request('/admin/classes', {
            method: 'POST',
            body: JSON.stringify(classData),
        });
    }

    async updateClass(classId, classData) {
        return await this.request(`/admin/classes/${classId}`, {
            method: 'PUT',
            body: JSON.stringify(classData),
        });
    }

    async deleteClass(classId) {
        return await this.request(`/admin/classes/${classId}`, {
            method: 'DELETE',
        });
    }

    async getClass(classId) {
        return await this.request(`/admin/classes/${classId}`);
    }

    // Subject APIs
    async getSubjects() {
        return await this.request('/admin/subjects');
    }

    async getAvailableSubjects() {
        return await this.request('/teacher/subjects');
    }

    async getAllSubjects() {
        return await this.request('/teacher/subjects/all');
    }

    async createSubject(subjectData) {
        return await this.request('/admin/subjects', {
            method: 'POST',
            body: JSON.stringify(subjectData),
        });
    }

    async updateSubject(subjectId, subjectData) {
        return await this.request(`/admin/subjects/${subjectId}`, {
            method: 'PUT',
            body: JSON.stringify(subjectData),
        });
    }

    async deleteSubject(subjectId) {
        return await this.request(`/admin/subjects/${subjectId}`, {
            method: 'DELETE',
        });
    }

    async getSubject(subjectId) {
        return await this.request(`/admin/subjects/${subjectId}`);
    }

    // Student APIs
    async getStudents(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/admin/students?${queryString}` : '/admin/students';
        return await this.request(endpoint);
    }

    async createStudent(studentData) {
        return await this.request('/admin/students', {
            method: 'POST',
            body: JSON.stringify(studentData),
        });
    }

    async updateStudent(studentId, studentData) {
        return await this.request(`/admin/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify(studentData),
        });
    }

    async deleteStudent(studentId) {
        return await this.request(`/admin/students/${studentId}`, {
            method: 'DELETE',
        });
    }

    async getStudent(studentId) {
        return await this.request(`/admin/students/${studentId}`);
    }

    // Teacher APIs
    async getTeacherDashboard() {
        return await this.request('/teacher/dashboard');
    }

    async getTeacherAssignments() {
        return await this.request('/admin/teacher-assignments');
    }

    async getMyAssignments() {
        return await this.request('/teacher/assignments');
    }

    async getTeacherStudents(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/teacher/students?${queryString}` : '/teacher/students';
        return await this.request(endpoint);
    }

    async getTeacherClasses() {
        return await this.request('/teacher/classes');
    }

    async getFormTeacherClasses() {
        return this.request('/teacher/form-teacher-classes');
    }

    async getTeacherSubjects() {
        return this.request('/teacher/subjects/all');
    }

    async addStudent(studentData) {
        return await this.request('/teacher/students', {
            method: 'POST',
            body: JSON.stringify(studentData),
        });
    }

    async updateStudent(studentId, studentData) {
        return await this.request(`/teacher/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify(studentData),
        });
    }

    async deleteStudent(studentId) {
        return await this.request(`/teacher/students/${studentId}`, {
            method: 'DELETE',
        });
    }

    // Score APIs
    async getScores(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/teacher/scores?${queryString}` : '/teacher/scores';
        return await this.request(endpoint);
    }

    async getClassScores(classId) {
        return await this.request(`/teacher/scores/${classId}`);
    }

    async createScore(scoreData) {
        return await this.request('/teacher/scores', {
            method: 'POST',
            body: JSON.stringify(scoreData),
        });
    }

    async getStudentScores(studentId, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString
            ? `/teacher/students/${studentId}/scores?${queryString}`
            : `/teacher/students/${studentId}/scores`;
        return await this.request(endpoint);
    }

    async updateScore(scoreId, scoreData) {
        return await this.request(`/teacher/scores/${scoreId}`, {
            method: 'PUT',
            body: JSON.stringify(scoreData),
        });
    }

    async deleteScore(scoreId) {
        return await this.request(`/teacher/scores/${scoreId}`, {
            method: 'DELETE',
        });
    }

    // Enhanced Score Management APIs
    async getTeacherAssignmentsForScores() {
        return await this.request('/teacher/scores/assignments');
    }

    async getStudentsForClassSubject(classId, subjectId) {
        return await this.get('/teacher/scores/students', {
            class_id: classId,
            subject_id: subjectId
        });
    }

    async getExistingScores(classId, subjectId, term) {
        return await this.get('/teacher/scores/existing', {
            class_id: classId,
            subject_id: subjectId,
            term: term
        });
    }

    // Get scores for a specific subject that teacher is assigned to teach
    async getSubjectScores(subjectId, classId, term = null) {
        const params = {
            subject_id: subjectId,
            class_id: classId
        };
        
        if (term) {
            params.term = term;
        }
        
        return await this.get('/teacher/scores/subject', params);
    }

    // Admin Score APIs
    async getAdminScores(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/admin/scores?${queryString}` : '/admin/scores';
        return await this.request(endpoint);
    }

    async getAdminStudentResults(studentId) {
        return await this.request(`/admin/students/${studentId}/results`);
    }

    async getAdminClassResults(classId, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/admin/classes/${classId}/results?${queryString}` : `/admin/classes/${classId}/results`;
        return await this.request(endpoint);
    }

    // Teacher Class Results API
    async getTeacherClassResults(classId) {
        return await this.request(`/teacher/classes/${classId}/results`);
    }

    // Teacher access to admin endpoints (for form teachers)
    async getTeacherAdminClasses() {
        return await this.request('/form-teacher/classes');
    }

    async getTeacherAdminScores(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/form-teacher/scores?${queryString}` : `/form-teacher/scores`;
        return await this.request(endpoint);
    }

    async getTeacherAdminClassResults(classId, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/form-teacher/classes/${classId}/results?${queryString}` : `/form-teacher/classes/${classId}/results`;
        return await this.request(endpoint);
    }

    // Check if user is form teacher
    async checkFormTeacherStatus() {
        try {
            const response = await this.request('/teacher/form-teacher-status');
            return response.data?.is_form_teacher || false;
        } catch (error) {
            return false;
        }
    }

    // Teacher Individual Student Results API
    async getTeacherStudentResults(studentId) {
        return await this.request(`/teacher/students/${studentId}/results`);
    }

    // Student APIs (for student access)
    async getStudentDashboard() {
        return await this.request('/student/dashboard');
    }

    async getStudentResults() {
        return await this.request('/student/results');
    }

    async getStudentSubjects() {
        return await this.request('/student/subjects');
    }

    async getStudentProfile() {
        return await this.request('/student/profile');
    }

    async updateStudentProfile(profileData) {
        return await this.request('/student/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    // Profile Management APIs
    async getAdminProfile() {
        return await this.request('/admin/profile');
    }

    async updateAdminProfile(profileData) {
        return await this.request('/admin/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    async changeAdminPassword(passwordData) {
        return await this.request('/admin/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }

    async getTeacherProfile() {
        return await this.request('/teacher/profile');
    }

    async updateTeacherProfile(profileData) {
        return await this.request('/teacher/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    async changeTeacherPassword(passwordData) {
        return await this.request('/teacher/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }

    async changeStudentPassword(passwordData) {
        return await this.request('/student/change-password', {
            method: 'PUT',
            body: JSON.stringify(passwordData),
        });
    }
}

export default new API();
