// API Base URL (tidak digunakan lagi, semua menggunakan fungsi dari api.ts)
// const API_BASE: string = 'http://localhost:3000/api';

console.log('[App] app.ts module loaded!');

// Import types (types are removed during compilation, only used for type checking)
import type { User, Course, Assignment, UserRole, CourseData } from '../types/index.js';

// ============================================
// IMPORT FUNGSI API
// ============================================
import {
    loginUser,
    registerUser,
    saveCurrentUser,
    clearCurrentUser,
    getAllCourses,
    enrollMeInCourse,
    getMyCourses,
    getMyAssignments,
    submitAssignment,
    updateAssignment,
    createCourse,
    updateCourse,
    deleteCourse as apiDeleteCourse,
    resetPassword
    // changePassword, // Untuk fitur change password di dashboard (akan ditambahkan nanti)
    // updateEmail // Untuk fitur update email di dashboard (akan ditambahkan nanti)
} from './api.js';

// State Management
let currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
let courses: Course[] = [];
let enrolledCourses: Course[] = [];
let assignments: Assignment[] = [];

// CRITICAL: Set up event listener IMMEDIATELY when module loads
// This must happen before componentsLoaded event is dispatched
console.log('[App] Setting up componentsLoaded listener IMMEDIATELY...');
window.addEventListener('componentsLoaded', () => {
    console.log('[App] componentsLoaded event received!');
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('[App] Initializing app after delay...');
        initApp();
    }, 10);
});

// Initialize App - Wait for components to load first
function initApp() {
    // Verify elements exist before proceeding
    const homeLink = document.getElementById('homeLink');
    const homePage = document.getElementById('homePage');
    
    if (!homeLink || !homePage) {
        console.warn('Components not fully loaded yet, retrying...');
        setTimeout(initApp, 100);
        return;
    }
    
    console.log('Initializing app...');
    console.log('Body element:', document.body);
    console.log('Home link found:', !!homeLink);
    
    // Setup event listeners first (using delegation, so it works even if elements aren't ready)
    setupEventListeners();
    
    initializeApp();
    loadCourses();
    if (currentUser) {
        updateUIForUser();
        if (currentUser.role === 'student') {
            loadStudentData();
        } else if (currentUser.role === 'admin') {
            loadAdminData();
        }
    }
}

// Fallback: Check if components are already loaded (e.g., if event was dispatched before listener was set)
console.log('[App] Checking if components already loaded...');
setTimeout(() => {
    const homeLink = document.getElementById('homeLink');
    const homePage = document.getElementById('homePage');
    if (homeLink && homePage && !document.body.hasAttribute('data-app-initialized')) {
        console.log('[App] Components found but event may have been missed, initializing directly...');
        document.body.setAttribute('data-app-initialized', 'true');
        initApp();
    }
}, 100);

// Fallback: if components are already loaded (e.g., in development)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Components should load after DOMContentLoaded, so wait a bit
        setTimeout(() => {
            if (document.getElementById('homePage') && document.getElementById('homeLink')) {
                initApp();
            }
        }, 200);
    });
} else {
    // DOM already loaded, check if components exist
    if (document.getElementById('homePage') && document.getElementById('homeLink')) {
        initApp();
    } else {
        // Wait for components
        window.addEventListener('componentsLoaded', () => {
            setTimeout(() => {
                initApp();
            }, 10);
        });
    }
}

// Initialize App
function initializeApp(): void {
    // Jika user sudah login, redirect ke halaman yang sesuai
    if (currentUser) {
        if (currentUser.role === 'student') {
            showPage('studentDashboard');
        } else if (currentUser.role === 'admin') {
            showPage('adminDashboard');
        } else {
            showPage('homePage');
        }
    } else {
        // Jika belum login, tampilkan home page
        showPage('homePage');
    }
}

// Setup Event Listeners using Event Delegation (more robust)
function setupEventListeners(): void {
    console.log('[App] Setting up event listeners with delegation...');
    console.log('[App] Body element exists:', !!document.body);
    
    // Ensure body exists before adding listener
    if (!document.body) {
        console.error('[App] Body element not found, retrying...');
        setTimeout(setupEventListeners, 50);
        return;
    }
    
    console.log('[App] Body found, adding click event listener...');
    
    // Test: Add a simple click handler first to verify it works
    document.body.addEventListener('click', (e: Event) => {
        console.log('[App] Click detected anywhere on body!', e.target);
    }, { once: true });
    
    // Use event delegation on document body to catch all clicks
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        console.log('[App] Click event - target:', target, 'tagName:', target.tagName, 'id:', target.id);
        
        // Check if clicked element or its parent is a link/button with an ID
        let clickedElement: HTMLElement | null = target;
        let elementId: string | null = null;
        
        // Try to find the element with an ID (could be the clicked element or its parent)
        while (clickedElement && clickedElement !== document.body) {
            if (clickedElement.id) {
                elementId = clickedElement.id;
                console.log('[App] Found element ID:', elementId);
                break;
            }
            clickedElement = clickedElement.parentElement;
        }
        
        if (!elementId) {
            console.log('[App] No element ID found for click');
            return;
        }
        
        // Prevent default for navigation links
        if (target.tagName === 'A' || target.closest('a')) {
            const link = target.closest('a') as HTMLAnchorElement;
            if (link && (link.getAttribute('href') === '#' || link.href.endsWith('#'))) {
                e.preventDefault();
            }
        }
        
        // Handle navigation clicks
        console.log('[App] Click detected on element with ID:', elementId);
        switch (elementId) {
            case 'homeLink':
                console.log('[App] Home link clicked');
                e.preventDefault();
                showPage('homePage');
                break;
            case 'coursesLink':
                console.log('[App] Courses link clicked');
                e.preventDefault();
                showPage('coursesPage');
                loadCourses();
                break;
            case 'dashboardLink':
                console.log('[App] Dashboard link clicked');
                e.preventDefault();
                if (currentUser?.role === 'student') {
                    showPage('studentDashboard');
                    loadStudentData();
                }
                break;
            case 'adminLink':
                console.log('[App] Admin link clicked');
                e.preventDefault();
                if (currentUser?.role === 'admin') {
                    showPage('adminDashboard');
                    loadAdminData();
                }
                break;
            case 'loginLink':
                console.log('[App] Login link clicked');
                e.preventDefault();
                openAuthModal();
                break;
            case 'logoutLink':
                console.log('[App] Logout link clicked');
                e.preventDefault();
                logout();
                break;
            case 'exploreBtn':
                console.log('[App] Explore button clicked');
                e.preventDefault();
                showPage('coursesPage');
                loadCourses();
                break;
            default:
                // Log all clicks for debugging
                if (elementId) {
                    console.log('[App] Click on element:', elementId, 'but no handler');
                }
        }
    });

    // Auth Modal - using event delegation
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'loginTab') {
            e.preventDefault();
            switchAuthTab('login');
        } else if (target.id === 'registerTab') {
            e.preventDefault();
            switchAuthTab('register');
        }
    });
    
    // Form submissions - need to wait for forms to exist
    setTimeout(() => {
        const loginForm = document.getElementById('loginForm') as HTMLFormElement;
        const registerForm = document.getElementById('registerForm') as HTMLFormElement;
        const forgotPasswordForm = document.getElementById('forgotPasswordForm') as HTMLFormElement;
        loginForm?.addEventListener('submit', handleLogin);
        registerForm?.addEventListener('submit', handleRegister);
        forgotPasswordForm?.addEventListener('submit', handleForgotPassword);
    }, 100);

    // Course actions - using event delegation
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const action = target.getAttribute('data-action');
        const courseId = target.getAttribute('data-course-id');
        
        if (action && courseId) {
            e.preventDefault();
            e.stopPropagation();
            if (action === 'edit') {
                editCourse(parseInt(courseId));
            } else if (action === 'delete') {
                deleteCourse(parseInt(courseId));
            }
        }
    });

    // Add Course button
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'addCourseBtn' || target.closest('#addCourseBtn')) {
            e.preventDefault();
            openCourseModal();
        }
    });

    // Course actions - using event delegation (untuk tombol Edit dan Delete)
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const action = target.getAttribute('data-action');
        const courseId = target.getAttribute('data-course-id');
        
        if (action && courseId) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[App] Course action clicked:', action, 'courseId:', courseId);
            if (action === 'edit') {
                editCourse(parseInt(courseId));
            } else if (action === 'delete') {
                deleteCourse(parseInt(courseId));
            }
        }
    });

    // Add Course button handler
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'addCourseBtn' || target.closest('#addCourseBtn')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[App] Add course button clicked');
            openCourseModal();
        }
    });

    // Close modals - using event delegation
    document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('close')) {
            e.preventDefault();
            const modal = target.closest('.modal') as HTMLElement;
            if (modal) closeModal(modal.id);
        }
    });

    // Course Management - wait for elements
    setTimeout(() => {
        const addCourseBtn = document.getElementById('addCourseBtn');
        const courseForm = document.getElementById('courseForm') as HTMLFormElement;
        addCourseBtn?.addEventListener('click', () => openCourseModal());
        courseForm?.addEventListener('submit', handleCourseSubmit);
    }, 100);

    // Search and Filter - wait for elements
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        searchInput?.addEventListener('input', filterCourses);
        categoryFilter?.addEventListener('change', filterCourses);
    }, 100);

    // Assignment Form - wait for elements
    setTimeout(() => {
        const assignmentForm = document.getElementById('assignmentForm') as HTMLFormElement;
        assignmentForm?.addEventListener('submit', handleAssignmentSubmit);
    }, 100);
}

// Page Navigation
function showPage(pageId: string): void {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId)?.classList.add('active');
}

// Modal Functions
function openModal(modalId: string): void {
    document.getElementById(modalId)?.classList.add('active');
}

function closeModal(modalId: string): void {
    document.getElementById(modalId)?.classList.remove('active');
    if (modalId === 'courseModal') {
        const courseForm = document.getElementById('courseForm') as HTMLFormElement;
        const courseId = document.getElementById('courseId') as HTMLInputElement;
        courseForm?.reset();
        if (courseId) courseId.value = '';
    }
    if (modalId === 'assignmentModal') {
        const assignmentForm = document.getElementById('assignmentForm') as HTMLFormElement;
        assignmentForm?.reset();
    }
}

function openAuthModal(): void {
    openModal('authModal');
    switchAuthTab('login');
}

function switchAuthTab(tab: 'login' | 'register' | 'forgot'): void {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    if (tab === 'login') {
        document.getElementById('loginTab')?.classList.add('active');
        document.getElementById('loginForm')?.classList.add('active');
    } else if (tab === 'register') {
        document.getElementById('registerTab')?.classList.add('active');
        document.getElementById('registerForm')?.classList.add('active');
    } else if (tab === 'forgot') {
        document.getElementById('forgotPasswordForm')?.classList.add('active');
    }
}

// Authentication
async function handleLogin(e: Event): Promise<void> {
    e.preventDefault();
    const email = (document.getElementById('loginEmail') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
    const role = (document.getElementById('loginRole') as HTMLSelectElement).value as UserRole;

    try {
        // Menggunakan fungsi dari api.ts
        const user = await loginUser(email, password, role);
        
        // Token sudah disimpan di loginUser (dari api.ts)
        // Simpan user menggunakan helper function
        saveCurrentUser(user);
        currentUser = user;
        
        updateUIForUser();
        closeModal('authModal');
        showSuccessMessage('Login successful!');
        
        if (currentUser && currentUser.role === 'student') {
            showPage('studentDashboard');
            loadStudentData();
        } else if (currentUser) {
            showPage('adminDashboard');
            loadAdminData();
        }
    } catch (error: any) {
        showErrorMessage(error.message || 'Login failed');
        console.error('Login error:', error);
    }
}

async function handleRegister(e: Event): Promise<void> {
    e.preventDefault();
    const name = (document.getElementById('registerName') as HTMLInputElement).value;
    const email = (document.getElementById('registerEmail') as HTMLInputElement).value;
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;
    const password = passwordInput.value;
    const role = (document.getElementById('registerRole') as HTMLSelectElement).value as UserRole;

    // Validasi password di frontend sebelum submit
    if (password.length < 6) {
        showErrorMessage('Password harus minimal 6 karakter');
        passwordInput.focus();
        return;
    }
    
    if (!/[a-z]/.test(password)) {
        showErrorMessage('Password harus mengandung minimal 1 huruf kecil');
        passwordInput.focus();
        return;
    }
    
    if (!/[A-Z]/.test(password)) {
        showErrorMessage('Password harus mengandung minimal 1 huruf besar');
        passwordInput.focus();
        return;
    }
    
    if (!/\d/.test(password)) {
        showErrorMessage('Password harus mengandung minimal 1 angka');
        passwordInput.focus();
        return;
    }

    try {
        // Menggunakan fungsi dari api.ts
        await registerUser(name, email, password, role);
        
        showSuccessMessage('Registration successful! Please login.');
        switchAuthTab('login');
    } catch (error: any) {
        showErrorMessage(error.message || 'Registration failed');
        console.error('Register error:', error);
    }
}

async function handleForgotPassword(e: Event): Promise<void> {
    e.preventDefault();
    const email = (document.getElementById('forgotPasswordEmail') as HTMLInputElement).value;

    try {
        await resetPassword(email);
        showSuccessMessage('Password reset initiated. You can now use the register form with your email to set a new password.');
        switchAuthTab('register');
        // Pre-fill email in register form
        (document.getElementById('registerEmail') as HTMLInputElement).value = email;
    } catch (error: any) {
        showErrorMessage(error.message || 'Password reset failed');
        console.error('Forgot password error:', error);
    }
}

function logout(): void {
    // Menggunakan helper function dari api.ts
    clearCurrentUser();
    currentUser = null;
    updateUIForUser();
    showPage('homePage');
    showSuccessMessage('Logged out successfully');
}

function updateUIForUser(): void {
    const isLoggedIn = !!currentUser;
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const dashboardLink = document.getElementById('dashboardLink');
    const adminLink = document.getElementById('adminLink');

    if (loginLink) loginLink.style.display = isLoggedIn ? 'none' : 'block';
    if (logoutLink) logoutLink.style.display = isLoggedIn ? 'block' : 'none';
    if (dashboardLink) dashboardLink.style.display = (isLoggedIn && currentUser?.role === 'student') ? 'block' : 'none';
    if (adminLink) adminLink.style.display = (isLoggedIn && currentUser?.role === 'admin') ? 'block' : 'none';
}

// Courses
async function loadCourses(): Promise<void> {
    try {
        // Menggunakan fungsi dari api.ts
        courses = await getAllCourses();
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        // Fallback to local data if API fails
        courses = getLocalCourses();
        displayCourses(courses);
    }
}

function displayCourses(coursesToDisplay: Course[]): void {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;

    grid.innerHTML = coursesToDisplay.map(course => `
        <div class="course-card" data-course-id="${course.id}">
            <h3>${course.title}</h3>
            <span class="category">${course.category}</span>
            <p class="description">${course.description}</p>
            <div class="meta">
                <span>⏱ ${course.duration} hours</span>
                ${currentUser?.role === 'student' ? 
                    `<button class="btn btn-primary" onclick="window.enrollInCourse(${course.id})">Enroll</button>` :
                    ''
                }
            </div>
        </div>
    `).join('');

    // Add click listeners for course details
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('btn')) {
                const courseId = parseInt((card as HTMLElement).dataset.courseId || '0');
                showCourseDetails(courseId);
            }
        });
    });
}

async function enrollInCourse(courseId: number): Promise<void> {
    if (!currentUser || currentUser.role !== 'student') {
        showErrorMessage('Please login as a student to enroll');
        return;
    }

    try {
        // Menggunakan fungsi dari api.ts
        await enrollMeInCourse(courseId);
        
        showSuccessMessage('Successfully enrolled in course!');
        loadStudentData();
    } catch (error: any) {
        console.error('Enrollment error:', error);
        showErrorMessage(error.message || 'Enrollment failed');
        // Fallback: add to local enrolled courses
        if (!enrolledCourses.find(c => c.id === courseId)) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                enrolledCourses.push(course);
                showSuccessMessage('Successfully enrolled in course!');
                loadStudentData();
            }
        }
    }
}

// Make enrollInCourse available globally for onclick handlers
(window as any).enrollInCourse = enrollInCourse;

function filterCourses(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
    
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || course.category === category;
        return matchesSearch && matchesCategory;
    });

    displayCourses(filtered);
}

function showCourseDetails(courseId: number): void {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const content = document.getElementById('courseDetailContent');
    if (!content) return;

    content.innerHTML = `
        <h2>${course.title}</h2>
        <span class="category">${course.category}</span>
        <p class="description" style="margin: 1rem 0;">${course.description}</p>
        <div class="meta">
            <span>⏱ Duration: ${course.duration} hours</span>
        </div>
        ${currentUser?.role === 'student' ? 
            `<div class="course-actions">
                <button class="btn btn-primary" onclick="window.enrollInCourse(${course.id}); window.closeModal('courseDetailModal');">Enroll Now</button>
            </div>` :
            ''
        }
    `;
    openModal('courseDetailModal');
}

// Make closeModal available globally
(window as any).closeModal = closeModal;

// Student Dashboard
async function loadStudentData(): Promise<void> {
    if (!currentUser || currentUser.role !== 'student') return;

    try {
        // Menggunakan fungsi dari api.ts - lebih mudah dan bersih!
        enrolledCourses = await getMyCourses();
        assignments = await getMyAssignments();

        displayEnrolledCourses();
        displayTasks();
        displayProgress();
    } catch (error) {
        console.error('Error loading student data:', error);
        // Use local data
        displayEnrolledCourses();
        displayTasks();
        displayProgress();
    }
}

function displayEnrolledCourses(): void {
    const container = document.getElementById('enrolledCourses');
    if (!container) return;

    if (enrolledCourses.length === 0) {
        container.innerHTML = '<p>You are not enrolled in any courses yet.</p>';
        return;
    }

    container.innerHTML = enrolledCourses.map(course => `
        <div class="course-card">
            <h3>${course.title}</h3>
            <span class="category">${course.category}</span>
            <p class="description">${course.description}</p>
            <div class="course-actions">
                <button class="btn btn-secondary" onclick="window.openAssignmentModal(${course.id})">Submit Assignment</button>
            </div>
        </div>
    `).join('');
}

function displayTasks(): void {
    const container = document.getElementById('myTasks');
    if (!container) return;

    if (assignments.length === 0) {
        container.innerHTML = '<p>No assignments yet.</p>';
        return;
    }

    container.innerHTML = assignments.map(assignment => `
        <div class="task-item">
            <h4>${assignment.title}</h4>
            <p>${assignment.courseTitle || 'Course Assignment'}</p>
            <div class="task-meta">
                <span>Status: <span class="task-status ${assignment.status}">${assignment.status}</span></span>
                <span>Submitted: ${new Date(assignment.submittedAt || Date.now()).toLocaleDateString()}</span>
            </div>
            ${assignment.status !== 'graded' ? 
                `<button class="btn btn-outline" onclick="window.openAssignmentModal(${assignment.courseId}, ${assignment.id})" style="margin-top: 0.5rem;">Update Submission</button>` :
                ''
            }
        </div>
    `).join('');
}

function displayProgress(): void {
    const container = document.getElementById('progressSection');
    if (!container) return;

    if (enrolledCourses.length === 0) {
        container.innerHTML = '<p>No progress to display.</p>';
        return;
    }

    container.innerHTML = enrolledCourses.map(course => {
        const courseAssignments = assignments.filter(a => a.courseId === course.id);
        const completed = courseAssignments.filter(a => a.status === 'graded').length;
        const total = courseAssignments.length || 1;
        const progress = Math.round((completed / total) * 100);

        return `
            <div class="progress-card">
                <h4>${course.title}</h4>
                <div>${completed} of ${total} assignments completed</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div style="margin-top: 0.5rem; font-weight: 600;">${progress}%</div>
            </div>
        `;
    }).join('');
}

function openAssignmentModal(courseId: number, assignmentId: number | null = null): void {
    if (!currentUser || currentUser.role !== 'student') {
        showErrorMessage('Please login as a student');
        return;
    }

    const assignmentCourseId = document.getElementById('assignmentCourseId') as HTMLInputElement;
    const assignmentIdInput = document.getElementById('assignmentId') as HTMLInputElement;
    
    if (assignmentCourseId) assignmentCourseId.value = courseId.toString();
    if (assignmentIdInput) assignmentIdInput.value = assignmentId?.toString() || '';

    const assignment = assignmentId ? assignments.find(a => a.id === assignmentId) : null;

    const assignmentTitle = document.getElementById('assignmentTitle') as HTMLInputElement;
    const assignmentContent = document.getElementById('assignmentContent') as HTMLTextAreaElement;
    const submitBtn = document.getElementById('submitAssignmentBtn');
    const statusDiv = document.getElementById('assignmentStatus');

    if (assignment) {
        if (assignmentTitle) assignmentTitle.value = assignment.title;
        if (assignmentContent) assignmentContent.value = assignment.content || '';
        if (submitBtn) submitBtn.textContent = 'Update Submission';
        
        if (statusDiv) {
            statusDiv.className = `status-info ${assignment.status === 'graded' ? 'info' : 'success'}`;
            statusDiv.textContent = `Current Status: ${assignment.status}`;
        }
    } else {
        const assignmentForm = document.getElementById('assignmentForm') as HTMLFormElement;
        assignmentForm?.reset();
        if (submitBtn) submitBtn.textContent = 'Submit';
        if (statusDiv) statusDiv.textContent = '';
    }

    openModal('assignmentModal');
}

// Make openAssignmentModal available globally
(window as any).openAssignmentModal = openAssignmentModal;

async function handleAssignmentSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const courseId = parseInt((document.getElementById('assignmentCourseId') as HTMLInputElement).value);
    const assignmentId = (document.getElementById('assignmentId') as HTMLInputElement).value;
    const title = (document.getElementById('assignmentTitle') as HTMLInputElement).value;
    const content = (document.getElementById('assignmentContent') as HTMLTextAreaElement).value;

    if (!currentUser) {
        showErrorMessage('Please login first');
        return;
    }

    try {
        if (assignmentId) {
            // Update existing assignment menggunakan fungsi dari api.ts
            await updateAssignment(
                parseInt(assignmentId),
                { title, content }
            );
            showSuccessMessage('Assignment updated successfully!');
        } else {
            // Submit new assignment menggunakan fungsi dari api.ts
            await submitAssignment(
                { courseId, title, content }
            );
            showSuccessMessage('Assignment submitted successfully!');
        }
        
        closeModal('assignmentModal');
        loadStudentData();
    } catch (error: any) {
        console.error('Assignment error:', error);
        showErrorMessage(error.message || 'Submission failed');
        // Fallback: add to local assignments
        const newAssignment: Assignment = {
            id: assignmentId ? parseInt(assignmentId) : Date.now(),
            courseId,
            title,
            content,
            status: 'submitted',
            submittedAt: new Date().toISOString(),
            studentId: currentUser.id,
            courseTitle: enrolledCourses.find(c => c.id === courseId)?.title
        };
        
        if (assignmentId) {
            const index = assignments.findIndex(a => a.id === parseInt(assignmentId));
            if (index !== -1) assignments[index] = { ...assignments[index], ...newAssignment };
        } else {
            assignments.push(newAssignment);
        }
        
        showSuccessMessage(assignmentId ? 'Assignment updated successfully!' : 'Assignment submitted successfully!');
        closeModal('assignmentModal');
        loadStudentData();
    }
}

// Admin Dashboard
async function loadAdminData(): Promise<void> {
    if (!currentUser || currentUser.role !== 'admin') return;
    await loadCourses();
    displayAdminCourses();
}

function displayAdminCourses(): void {
    const container = document.getElementById('adminCourses');
    if (!container) return;

    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <h3>${course.title}</h3>
            <span class="category">${course.category}</span>
            <p class="description">${course.description}</p>
            <div class="meta">
                <span>⏱ ${course.duration} hours</span>
            </div>
            <div class="course-actions">
                <button class="btn btn-primary" data-action="edit" data-course-id="${course.id}">Edit</button>
                <button class="btn btn-danger" data-action="delete" data-course-id="${course.id}">Delete</button>
            </div>
        </div>
    `).join('');
}

function openCourseModal(courseId: number | null = null): void {
    const course = courseId ? courses.find(c => c.id === courseId) : null;
    
    const modalTitle = document.getElementById('courseModalTitle');
    const courseIdInput = document.getElementById('courseId') as HTMLInputElement;
    
    if (modalTitle) modalTitle.textContent = course ? 'Edit Course' : 'Add New Course';
    if (courseIdInput) courseIdInput.value = courseId?.toString() || '';
    
    if (course) {
        const courseTitle = document.getElementById('courseTitle') as HTMLInputElement;
        const courseDescription = document.getElementById('courseDescription') as HTMLTextAreaElement;
        const courseCategory = document.getElementById('courseCategory') as HTMLSelectElement;
        const courseDuration = document.getElementById('courseDuration') as HTMLInputElement;
        
        if (courseTitle) courseTitle.value = course.title;
        if (courseDescription) courseDescription.value = course.description;
        if (courseCategory) courseCategory.value = course.category;
        if (courseDuration) courseDuration.value = course.duration.toString();
    } else {
        const courseForm = document.getElementById('courseForm') as HTMLFormElement;
        courseForm?.reset();
    }
    
    openModal('courseModal');
}

function editCourse(courseId: number): void {
    openCourseModal(courseId);
}

// Make editCourse and deleteCourse available globally
(window as any).editCourse = editCourse;

async function handleCourseSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const courseId = (document.getElementById('courseId') as HTMLInputElement).value;
    const courseData: CourseData = {
        title: (document.getElementById('courseTitle') as HTMLInputElement).value,
        description: (document.getElementById('courseDescription') as HTMLTextAreaElement).value,
        category: (document.getElementById('courseCategory') as HTMLSelectElement).value as Course['category'],
        duration: parseInt((document.getElementById('courseDuration') as HTMLInputElement).value)
    };

    if (!currentUser || currentUser.role !== 'admin') {
        showErrorMessage('Only admin can manage courses');
        return;
    }

    try {
        if (courseId) {
            // Update existing course menggunakan fungsi dari api.ts
            await updateCourse(parseInt(courseId), courseData);
            showSuccessMessage('Course updated successfully!');
        } else {
            // Create new course menggunakan fungsi dari api.ts
            await createCourse(courseData);
            showSuccessMessage('Course created successfully!');
        }
        
        closeModal('courseModal');
        await loadCourses();
        displayAdminCourses();
    } catch (error: any) {
        console.error('Course error:', error);
        showErrorMessage(error.message || 'Operation failed');
        // Fallback: update local courses
        if (courseId) {
            const index = courses.findIndex(c => c.id === parseInt(courseId));
            if (index !== -1) {
                courses[index] = { ...courses[index], ...courseData };
            }
        } else {
            const newCourse: Course = {
                id: Date.now(),
                ...courseData,
                createdAt: new Date().toISOString()
            };
            courses.push(newCourse);
        }
        
        showSuccessMessage(courseId ? 'Course updated successfully!' : 'Course created successfully!');
        closeModal('courseModal');
        loadCourses();
        displayAdminCourses();
    }
}

async function deleteCourse(courseId: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this course?')) return;

    if (!currentUser || currentUser.role !== 'admin') {
        showErrorMessage('Only admin can delete courses');
        return;
    }

    try {
        // Menggunakan fungsi dari api.ts
        await apiDeleteCourse(courseId);
        
        showSuccessMessage('Course deleted successfully!');
        await loadCourses();
        displayAdminCourses();
    } catch (error: any) {
        console.error('Delete error:', error);
        showErrorMessage(error.message || 'Delete failed');
        // Fallback: remove from local courses
        courses = courses.filter(c => c.id !== courseId);
        showSuccessMessage('Course deleted successfully!');
        loadCourses();
        displayAdminCourses();
    }
}

// Make deleteCourse available globally
(window as any).deleteCourse = deleteCourse;

// Utility Functions
function showSuccessMessage(message: string): void {
    showMessage(message, 'success');
}

function showErrorMessage(message: string): void {
    showMessage(message, 'error');
}

function showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-info ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '100px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '3000';
    messageDiv.style.minWidth = '300px';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Local Data Fallback
function getLocalCourses(): Course[] {
    return [
        {
            id: 1,
            title: 'Introduction to Web Development',
            description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern web applications.',
            category: 'programming',
            duration: 40
        },
        {
            id: 2,
            title: 'UI/UX Design Principles',
            description: 'Master the art of creating beautiful and user-friendly interfaces.',
            category: 'design',
            duration: 30
        },
        {
            id: 3,
            title: 'Business Management Fundamentals',
            description: 'Essential skills for managing teams and projects effectively.',
            category: 'business',
            duration: 35
        },
        {
            id: 4,
            title: 'English for Professionals',
            description: 'Improve your English communication skills for the workplace.',
            category: 'language',
            duration: 50
        }
    ];
}

