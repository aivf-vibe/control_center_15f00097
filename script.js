


// Sample data for demonstration
let visitors = [
    {
        id: 1,
        name: "Alice Johnson",
        company: "Tech Solutions Inc",
        email: "alice@techsolutions.com",
        phone: "+1-555-0123",
        purpose: "Meeting with IT team regarding new software implementation",
        contactPerson: "john.doe@company.com",
        gate: "main",
        status: "approved",
        time: "2024-01-15 09:30 AM",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Bob Smith",
        company: "Global Corp",
        email: "bob.smith@globalcorp.com",
        phone: "+1-555-0124",
        purpose: "Quarterly business review",
        contactPerson: "jane.smith@company.com",
        gate: "side",
        status: "pending",
        time: "2024-01-15 10:15 AM",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Carol Williams",
        company: "Consulting Partners",
        email: "carol@consulting.com",
        phone: "+1-555-0125",
        purpose: "Training session for new employees",
        contactPerson: "mike.johnson@company.com",
        gate: "main",
        status: "rejected",
        time: "2024-01-15 11:00 AM",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
];

let pendingApprovals = [
    {
        id: 4,
        name: "David Brown",
        company: "Marketing Agency",
        email: "david@marketing.com",
        phone: "+1-555-0126",
        purpose: "Presentation of new marketing campaign",
        contactPerson: "sarah.wilson@company.com",
        gate: "main",
        time: "2024-01-15 02:30 PM",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Emma Davis",
        company: "Finance Solutions",
        email: "emma@finance.com",
        phone: "+1-555-0127",
        purpose: "Financial audit meeting",
        contactPerson: "john.doe@company.com",
        gate: "side",
        time: "2024-01-15 03:00 PM",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    }
];

let activities = [
    {
        type: "success",
        message: "Alice Johnson approved for entry",
        time: "2 minutes ago"
    },
    {
        type: "info",
        message: "New visitor registered at Main Gate",
        time: "5 minutes ago"
    },
    {
        type: "warning",
        message: "Emergency Gate camera offline",
        time: "15 minutes ago"
    },
    {
        type: "success",
        message: "Bob Smith registration submitted for approval",
        time: "30 minutes ago"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    loadDashboardData();
    loadVisitorsTable();
    loadPendingApprovals();
    loadRecentActivity();
    setupEventListeners();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// Dashboard Data
function loadDashboardData() {
    const totalVisitors = visitors.length + pendingApprovals.length;
    const pendingCount = pendingApprovals.length;
    const approvedCount = visitors.filter(v => v.status === 'approved').length;

    document.getElementById('total-visitors').textContent = totalVisitors;
    document.getElementById('pending-approvals').textContent = pendingCount;
    document.getElementById('approved-today').textContent = approvedCount;
}

// Visitors Table
function loadVisitorsTable() {
    const tbody = document.getElementById('visitors-tbody');
    tbody.innerHTML = '';

    const allVisitors = [...visitors, ...pendingApprovals];
    
    allVisitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${visitor.photo}" alt="${visitor.name}" class="visitor-photo">
            </td>
            <td>${visitor.name}</td>
            <td>${visitor.company}</td>
            <td>${visitor.purpose.substring(0, 30)}...</td>
            <td>${visitor.contactPerson.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
            <td>${visitor.gate.charAt(0).toUpperCase() + visitor.gate.slice(1)} Gate</td>
            <td>
                <span class="status-badge ${visitor.status || 'pending'}">${visitor.status || 'pending'}</span>
            </td>
            <td>${visitor.time}</td>
            <td>
                <button class="btn-primary" onclick="viewVisitor(${visitor.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Pending Approvals
function loadPendingApprovals() {
    const container = document.getElementById('approvals-list');
    container.innerHTML = '';

    pendingApprovals.forEach(approval => {
        const card = document.createElement('div');
        card.className = 'approval-card';
        card.innerHTML = `
            <img src="${approval.photo}" alt="${approval.name}" class="approval-photo">
            <div class="approval-info">
                <h4>${approval.name}</h4>
                <p><strong>Company:</strong> ${approval.company}</p>
                <p><strong>Purpose:</strong> ${approval.purpose}</p>
                <p><strong>Contact:</strong> ${approval.contactPerson.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p><strong>Gate:</strong> ${approval.gate.charAt(0).toUpperCase() + approval.gate.slice(1)} Gate</p>
                <p><strong>Time:</strong> ${approval.time}</p>
            </div>
            <div class="approval-actions">
                <button class="btn-primary" onclick="approveVisitor(${approval.id})">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="btn-secondary" onclick="rejectVisitor(${approval.id})">
                    <i class="fas fa-times"></i> Reject
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Recent Activity
function loadRecentActivity() {
    const container = document.getElementById('recent-activity');
    container.innerHTML = '';

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.message}</h4>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        container.appendChild(item);
    });
}

function getActivityIcon(type) {
    const icons = {
        success: 'check-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('visitor-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchVisitors);
    }

    // Form submission
    const form = document.getElementById('add-visitor-form');
    if (form) {
        form.addEventListener('submit', handleAddVisitor);
    }

    // Photo upload
    const photoInput = document.getElementById('visitor-photo');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
}

// Modal Functions
function showAddVisitorModal() {
    const modal = document.getElementById('add-visitor-modal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('add-visitor-modal');
    modal.classList.remove('active');
    document.getElementById('add-visitor-form').reset();
}

// Photo Upload
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.querySelector('.upload-preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Visitor Photo">`;
        };
        reader.readAsDataURL(file);
    }
}

// Add Visitor
function handleAddVisitor(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const visitor = {
        id: Date.now(),
        name: document.getElementById('visitor-name').value,
        company: document.getElementById('visitor-company').value,
        email: document.getElementById('visitor-email').value,
        phone: document.getElementById('visitor-phone').value,
        purpose: document.getElementById('visitor-purpose').value,
        contactPerson: document.getElementById('contact-person').value,
        gate: document.getElementById('entry-gate').value,
        status: 'pending',
        time: new Date().toLocaleString(),
        photo: document.querySelector('.upload-preview img')?.src || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    };

    pendingApprovals.push(visitor);
    
    // Notify contact person
    notifyContactPerson(visitor);
    
    // Update UI
    loadDashboardData();
    loadPendingApprovals();
    loadVisitorsTable();
    
    // Show success message
    showNotification('Visitor registered successfully! Contact person has been notified.');
    
    // Close modal
    closeModal();
}

// Approval Functions
function approveVisitor(visitorId) {
    const visitorIndex = pendingApprovals.findIndex(v => v.id === visitorId);
    if (visitorIndex !== -1) {
        const visitor = pendingApprovals[visitorIndex];
        visitor.status = 'approved';
        
        // Move from pending to visitors
        visitors.push(visitor);
        pendingApprovals.splice(visitorIndex, 1);
        
        // Update UI
        loadDashboardData();
        loadPendingApprovals();
        loadVisitorsTable();
        
        // Add activity
        activities.unshift({
            type: 'success',
            message: `${visitor.name} approved for entry`,
            time: 'Just now'
        });
        loadRecentActivity();
        
        showNotification(`${visitor.name} has been approved for entry`);
    }
}

function rejectVisitor(visitorId) {
    const visitorIndex = pendingApprovals.findIndex(v => v.id === visitorId);
    if (visitorIndex !== -1) {
        const visitor = pendingApprovals[visitorIndex];
        
        // Remove from pending
        pendingApprovals.splice(visitorIndex, 1);
        
        // Update UI
        loadDashboardData();
        loadPendingApprovals();
        loadVisitorsTable();
        
        showNotification(`${visitor.name} has been rejected`);
    }
}

// Search Functionality
function searchVisitors() {
    const searchTerm = document.getElementById('visitor-search').value.toLowerCase();
    const tbody = document.getElementById('visitors-tbody');
    const allVisitors = [...visitors, ...pendingApprovals];
    
    const filtered = allVisitors.filter(visitor => 
        visitor.name.toLowerCase().includes(searchTerm) ||
        visitor.company.toLowerCase().includes(searchTerm) ||
        visitor.purpose.toLowerCase().includes(searchTerm)
    );
    
    tbody.innerHTML = '';
    filtered.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${visitor.photo}" alt="${visitor.name}" class="visitor-photo">
            </td>
            <td>${visitor.name}</td>
            <td>${visitor.company}</td>
            <td>${visitor.purpose.substring(0, 30)}...</td>
            <td>${visitor.contactPerson.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
            <td>${visitor.gate.charAt(0).toUpperCase() + visitor.gate.slice(1)} Gate</td>
            <td>
                <span class="status-badge ${visitor.status || 'pending'}">${visitor.status || 'pending'}</span>
            </td>
            <td>${visitor.time}</td>
            <td>
                <button class="btn-primary" onclick="viewVisitor(${visitor.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Utility Functions
function viewVisitor(visitorId) {
    const allVisitors = [...visitors, ...pendingApprovals];
    const visitor = allVisitors.find(v => v.id === visitorId);
    
    if (visitor) {
        alert(`Visitor Details:\n\nName: ${visitor.name}\nCompany: ${visitor.company}\nEmail: ${visitor.email}\nPhone: ${visitor.phone}\nPurpose: ${visitor.purpose}\nContact: ${visitor.contactPerson}\nGate: ${visitor.gate}\nStatus: ${visitor.status || 'pending'}\nTime: ${visitor.time}`);
    }
}

function refreshActivity() {
    // Simulate loading new activity
    const randomActivities = [
        { type: 'info', message: 'System health check completed', time: 'Just now' },
        { type: 'success', message: 'Gate access log updated', time: '1 minute ago' },
        { type: 'warning', message: 'Unusual activity detected at Side Gate', time: '3 minutes ago' }
    ];
    
    const randomActivity = randomActivities[Math.floor(Math.random() * randomActivities.length)];
    activities.unshift(randomActivity);
    
    if (activities.length > 10) {
        activities.pop();
    }
    
    loadRecentActivity();
    showNotification('Activity feed updated');
}

function notifyContactPerson(visitor) {
    // Simulate notification to contact person
    console.log(`Notifying ${visitor.contactPerson} about visitor ${visitor.name}`);
    
    // In a real application, this would send an email/SMS
    setTimeout(() => {
        showNotification(`Contact person ${visitor.contactPerson} has been notified`);
    }, 1000);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notification-message');
    
    messageEl.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function generateReport(type) {
    const reportTypes = {
        daily: 'Daily Security Report',
        weekly: 'Weekly Security Report',
        monthly: 'Monthly Security Report'
    };
    
    showNotification(`Generating ${reportTypes[type]}...`);
    
    // Simulate report generation
    setTimeout(() => {
        showNotification(`${reportTypes[type]} generated successfully!`);
    }, 2000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('add-visitor-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Simulate real-time updates
setInterval(() => {
    // Randomly update stats
    const totalVisitors = visitors.length + pendingApprovals.length;
    const pendingCount = pendingApprovals.length;
    const approvedCount = visitors.filter(v => v.status === 'approved').length;
    
    document.getElementById('total-visitors').textContent = totalVisitors;
    document.getElementById('pending-approvals').textContent = pendingCount;
    document.getElementById('approved-today').textContent = approvedCount;
}, 30000); // Update every 30 seconds


