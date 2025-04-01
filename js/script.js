// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Initialize notifications if we're on a page that uses them
    initializeNotifications();

    // Initialize dynamic content loading
    initializeDynamicContent();
});

// Login form validation and submission
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const role = document.querySelector('input[name="role"]:checked');
    const errorContainer = document.getElementById('error-messages');

    // Reset error messages
    errorContainer.innerHTML = '';
    errorContainer.classList.add('hidden');

    // Validate inputs
    const errors = [];
    
    if (!username.value.trim()) {
        errors.push('يرجى إدخال اسم المستخدم');
        username.classList.add('border-red-500');
    }

    if (!password.value.trim()) {
        errors.push('يرجى إدخال كلمة المرور');
        password.classList.add('border-red-500');
    }

    if (!role) {
        errors.push('يرجى اختيار نوع المستخدم');
    }

    // If there are errors, display them
    if (errors.length > 0) {
        errorContainer.classList.remove('hidden');
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mb-2';
            errorDiv.textContent = error;
            errorContainer.appendChild(errorDiv);
        });
        return;
    }

    // If validation passes, redirect based on role
    const selectedRole = role.value;
    switch(selectedRole) {
        case 'student':
            window.location.href = 'student.html';
            break;
        case 'teacher':
            window.location.href = 'teacher.html';
            break;
        case 'admin':
            window.location.href = 'admin.html';
            break;
    }
}

// Initialize notifications system
function initializeNotifications() {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;

    // Sample notification data - in a real app, this would come from a server
    const notifications = [
        { id: 1, message: 'تم إضافة درس جديد', type: 'info' },
        { id: 2, message: 'موعد تسليم الواجب غداً', type: 'warning' },
        { id: 3, message: 'تم تصحيح الاختبار', type: 'success' }
    ];

    // Display notifications
    notifications.forEach(notification => {
        showNotification(notification);
    });
}

// Show a single notification
function showNotification({ message, type = 'info' }) {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `alert alert-${type} animate-fade-in`;
    notification.textContent = message;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'float-left text-gray-500 hover:text-gray-700';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => notification.remove();

    notification.appendChild(closeButton);
    notificationContainer.appendChild(notification);

    // Auto-remove notification after 5 seconds
    setTimeout(() => notification.remove(), 5000);
}

// Initialize dynamic content loading
function initializeDynamicContent() {
    // Handle dynamic content loading for student dashboard
    const lessonContainer = document.getElementById('lesson-container');
    if (lessonContainer) {
        loadLessons();
    }

    // Handle dynamic content loading for teacher dashboard
    const assignmentContainer = document.getElementById('assignment-container');
    if (assignmentContainer) {
        loadAssignments();
    }
}

// Load lessons dynamically
function loadLessons() {
    const lessonContainer = document.getElementById('lesson-container');
    if (!lessonContainer) return;

    // Sample lesson data - in a real app, this would come from a server
    const lessons = [
        { id: 1, title: 'الدرس الأول: مقدمة', description: 'مقدمة في المادة وأهدافها' },
        { id: 2, title: 'الدرس الثاني: الأساسيات', description: 'شرح المفاهيم الأساسية' },
        { id: 3, title: 'الدرس الثالث: التطبيقات', description: 'تطبيقات عملية على ما تم دراسته' }
    ];

    lessons.forEach(lesson => {
        const lessonCard = createLessonCard(lesson);
        lessonContainer.appendChild(lessonCard);
    });
}

// Create a lesson card element
function createLessonCard({ title, description }) {
    const card = document.createElement('div');
    card.className = 'card animate-fade-in';
    
    card.innerHTML = `
        <div class="card-body">
            <h3 class="text-xl font-bold mb-2">${title}</h3>
            <p class="text-gray-600">${description}</p>
            <button class="btn btn-primary mt-4">عرض الدرس</button>
        </div>
    `;

    return card;
}

// Load assignments dynamically
function loadAssignments() {
    const assignmentContainer = document.getElementById('assignment-container');
    if (!assignmentContainer) return;

    // Sample assignment data - in a real app, this would come from a server
    const assignments = [
        { id: 1, title: 'الواجب الأول', dueDate: '2024-02-01', status: 'pending' },
        { id: 2, title: 'الواجب الثاني', dueDate: '2024-02-05', status: 'completed' },
        { id: 3, title: 'الواجب الثالث', dueDate: '2024-02-10', status: 'pending' }
    ];

    assignments.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentContainer.appendChild(assignmentCard);
    });
}

// Create an assignment card element
function createAssignmentCard({ title, dueDate, status }) {
    const card = document.createElement('div');
    card.className = 'card animate-fade-in';
    
    const statusClass = status === 'completed' ? 'badge-success' : 'badge-warning';
    const statusText = status === 'completed' ? 'مكتمل' : 'قيد التنفيذ';

    card.innerHTML = `
        <div class="card-body">
            <h3 class="text-xl font-bold mb-2">${title}</h3>
            <p class="text-gray-600">تاريخ التسليم: ${dueDate}</p>
            <span class="badge ${statusClass} mt-2">${statusText}</span>
        </div>
    `;

    return card;
}

// Handle form submissions
function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate form data
    if (!validateFormData(data)) {
        showNotification({
            message: 'يرجى التأكد من ملء جميع الحقول المطلوبة',
            type: 'error'
        });
        return;
    }

    // In a real app, this would send data to a server
    console.log('Form data:', data);
    showNotification({
        message: 'تم إرسال البيانات بنجاح',
        type: 'success'
    });

    // Reset form
    form.reset();
}

// Validate form data
function validateFormData(data) {
    return Object.values(data).every(value => value.trim() !== '');
}

// Toggle modal visibility
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.toggle('hidden');
}

// Initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
}

// Show tooltip
function showTooltip(event) {
    const tooltip = event.target;
    const tooltipText = tooltip.getAttribute('data-tooltip');
    
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm -mt-8';
    tooltipElement.textContent = tooltipText;
    
    tooltip.appendChild(tooltipElement);
}

// Hide tooltip
function hideTooltip(event) {
    const tooltip = event.target;
    const tooltipElement = tooltip.querySelector('div');
    if (tooltipElement) {
        tooltipElement.remove();
    }
}