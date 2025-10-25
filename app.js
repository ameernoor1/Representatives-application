// إعداد Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCcXuYS86E0VCcMzC22Rg3t9VYGPQ_MjJE",
            authDomain: "messageemeapp.firebaseapp.com",
            databaseURL: "https://messageemeapp-default-rtdb.firebaseio.com",
            projectId: "messageemeapp",
            storageBucket: "messageemeapp.appspot.com",
            messagingSenderId: "867426696402",
            appId: "1:867426696402:web:2c88ad0c9e1a0a6a0f8f3a"
        };

// Initialize Firebase
// تحسين شريط التايتل على الهاتف
const styleHeader = document.createElement('style');
styleHeader.innerHTML = `
@media (max-width: 600px) {
    .app-header {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-start !important;
        padding: 16px 10px !important;
        font-size: 1.1rem !important;
        min-width: 100vw !important;
        background: var(--primary, #1a7b7f) !important;
        box-shadow: 0 2px 12px rgba(26,123,127,0.10);
        gap: 12px !important;
    }
    .notification-bell, .notificationCount, .notification-icon {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 1.7rem !important;
        min-width: 40px !important;
        min-height: 40px !important;
        padding: 8px !important;
        margin-left: 0 !important;
        margin-right: 8px !important;
        background: #fff !important;
        color: #1a7b7f !important;
        border-radius: 50% !important;
        box-shadow: 0 2px 8px rgba(26,123,127,0.10);
        cursor: pointer !important;
        transition: box-shadow 0.2s;
    }
    .app-header-title, .header-title {
        display: block !important;
        font-size: 1.1rem !important;
        font-weight: 700 !important;
        color: #fff !important;
        margin-right: 8px !important;
        margin-left: 8px !important;
        letter-spacing: 0.5px !important;
    }
    /* إخفاء النصوص غير المطلوبة فقط */
    .app-header-row, .app-title-main, .app-subtitle-main, .user-role, .user-name, .user-type-label, .user-info, .user-avatar, .header-left {
        display: none !important;
    }
    .sidebar-menu-btn, .sidebar-menu, .menu-toggle {
        font-size: 1.3rem !important;
        min-width: 36px !important;
        min-height: 36px !important;
        padding: 6px !important;
        margin: 0 2px !important;
    }
    body, html {
        min-width: 100vw !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
        background: linear-gradient(135deg, #f0f9f9 0%, #ffffff 50%, #f0f9f9 100%) !important;
    }
    #app, .content-area, .user-card-container, .main-content {
        min-width: 100vw !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
        padding: 0 !important;
    }
    /* تحسين المسافات بين العناصر في الواجهة */
    .users-container, .stats-grid, .filters-container {
        margin-top: 18px !important;
        margin-bottom: 18px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }
    .users-grid {
        gap: 18px !important;
        padding: 0 4px !important;
    }
    .user-card {
        margin-bottom: 18px !important;
        padding: 10px 6px !important;
    }
}
`;
document.head.appendChild(styleHeader);
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Candidates List
const CANDIDATES = [
    "سيد حسين السعبري", "حمزه جبار حربي محمد", "عدي اركان عباس نعمان",
    "عصام فخري برتو عويد", "احمد بدر جاسم حسین", "اکرام کامل ظاهر محسن",
    "ميثم عبد الجاسم عبد الحمزه", "فرح احمد کامل درب", "محمد جواد عبد الكاظم",
    "تحسين فليح حسن عبود", "حسين كامل ناجي معيدي", "حميد حمزه کاظم مسیر",
    "ابتسام حسن ذياب مرزوك", "اسیل خالد عبد محمد", "محمد هادي كاظم جواد",
    "سلام عبد الكاظم عبد الله", "ثائر عبد اللطيف عبد الحميد", "زهره محمد سعود عزیز",
    "مرزة حمزة عبدمعين", "عمر خضير عباس كسار", "زينب عباس علي لطيف",
    "زهير عباس عبود رزوقي", "الاء عبد الكاظم عباس", "غيث علي سميسم عبيد",
    "ياسر عامر صبار محيسن", "كريم سعد حسين لوطان", "نداء طالب محسن ثاجب",
    "أسماء حسين جدوع کاظم", "زهير جواد ناجي عباس", "احمد سلمان عوده بريو",
    "سعود حسن جمعة مطر"
];

// Districts List
// قائمة الأقضية (Qada) والنواحي (Nahia) لمحافظة بابل – مُحدَّثة
const DISTRICTS = [
    // قضاء الحلة (مركز المحافظة)
    'الحلة',
    'الكفل',
    'أبي غرق',

    // قضاء المحاويل
    'المحاويل',
    'المشروع',
    'الإمام',
    'النيل',

    // قضاء الهاشمية
    'الهاشمية',
    'القاسم',
    'الطليعة',

    // قضاء الحمزة الغربي
    'الحمزة الغربي',
    'المدحتية',
    'الشوملي',
    'الخميسية',
    'الحصين',

    // قضاء المسيب
    'المسيب',
    'سدة الهندية',
    'جرف النصر',      // الاسم الرسمي الحالي بدل "جرف الصخر"
    'الإسكندرية',
    'الحصوة'
];

// Global Variables
let allUsers = {};
let filteredUsers = {};
let displayedUsers = {};
let currentUser = null;
let selectedCards = new Set();
let notifications = [];
let candidatesData = {};

// Admin Password
const ADMIN_PASSWORD = "admin2025";

// Initialize Candidates Data in Firebase
function initializeCandidatesData() {
    database.ref('candidates').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // First time initialization
            const initialCandidates = {};
            CANDIDATES.forEach((candidate, index) => {
                const candidateId = `candidate_${index + 1}`;
                initialCandidates[candidateId] = {
                    id: candidateId,
                    name: candidate,
                    password: `pass${index + 1}`,
                    createdAt: Date.now()
                };
            });
            database.ref('candidates').set(initialCandidates);
            candidatesData = initialCandidates;
            populateCandidateSelect();
        } else {
            candidatesData = snapshot.val();
            populateCandidateSelect();
        }
    });
}

// Populate Candidate Select
function populateCandidateSelect() {
    const candidateSelect = document.getElementById('candidateSelect');
    if (!candidateSelect) return;
    
    // Keep admin option
    candidateSelect.innerHTML = '<option value="">-- اختر المرشح --</option><option value="admin">مدير النظام (Admin)</option>';
    
    // Add all candidates
    Object.values(candidatesData).forEach(candidate => {
        const option = document.createElement('option');
        option.value = candidate.id;
        option.textContent = candidate.name;
        candidateSelect.appendChild(option);
    });
}

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const candidateValue = document.getElementById('candidateSelect').value;
    const password = document.getElementById('passwordInput').value;

    if (!candidateValue) {
        showAlert('الرجاء اختيار المرشح', 'warning');
        return;
    }

    // Check Admin
    if (candidateValue === 'admin' && password === ADMIN_PASSWORD) {
        currentUser = {
            type: 'admin',
            id: 'admin',
            name: 'مدير النظام'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
        return;
    }

    // Check Candidate
    const candidate = candidatesData[candidateValue];
    if (candidate && candidate.password === password) {
        currentUser = {
            type: 'candidate',
            id: candidate.id,
            name: candidate.name
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
    } else {
        showAlert('الرمز السري غير صحيح', 'error');
    }
});

// Check Authentication
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initializeCandidatesData();
        showDashboard();
    } else {
        initializeCandidatesData();
    }
}

function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.name.charAt(0);
    
    // Show/hide settings menu based on user type
    const settingsMenuItem = document.getElementById('settingsMenuItem');
    if (currentUser.type !== 'admin') {
        settingsMenuItem.style.display = 'none';
    }
    
    loadData();
}

function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        location.reload();
    }
}

// Load Data from Firebase
function loadData() {
    showLoading(true);
    
    // Load candidates data
    database.ref('candidates').on('value', (snapshot) => {
        candidatesData = snapshot.val() || {};
        updateFilterSelects();
    });
    
    // Load users data
    database.ref('users').on('value', (snapshot) => {
        allUsers = snapshot.val() || {};
        filterUsersByAuth();
        updateUI();
        showLoading(false);
    });

    // Listen for new users
    database.ref('users').on('child_added', (snapshot) => {
        if (Object.keys(allUsers).length > 0) {
            const user = snapshot.val();
            if (shouldShowNotification(user)) {
                addNotification({
                    type: 'new_user',
                    message: `مستخدم جديد: ${user.fullName}`,
                    user: user,
                    timestamp: Date.now()
                });
            }
        }
    });

    // Listen for voted users
    database.ref('users').on('child_changed', (snapshot) => {
        const user = snapshot.val();
        if (user.images && user.images.front && shouldShowNotification(user)) {
            addNotification({
                type: 'voted',
                message: `تم الانتخاب: ${user.fullName}`,
                user: user,
                timestamp: Date.now()
            });
        }
    });
}

// Check if should show notification
function shouldShowNotification(user) {
    if (currentUser.type === 'admin') return true;
    return user.candidateId === currentUser.id;
}

// Filter Users by Authentication
function filterUsersByAuth() {
    if (currentUser.type === 'admin') {
        filteredUsers = allUsers;
    } else {
        filteredUsers = {};
        Object.keys(allUsers).forEach(phone => {
            const user = allUsers[phone];
            // تحقق من معرف المرشح أو اسم المرشح
            if (
                (user.candidateId && candidatesData[user.candidateId] && candidatesData[user.candidateId].name === currentUser.name) ||
                (user.candidate && user.candidate === currentUser.name)
            ) {
                filteredUsers[phone] = user;
            }
        });
    }
    displayedUsers = { ...filteredUsers };
}

// Update UI
function updateUI() {
    updateStatistics();
    updateDistrictsList();
    updateUsersGrid();
    updateNotifications();
}

// Update Filter Selects
function updateFilterSelects() {
    // Update Candidate Filter
    const filterCandidate = document.getElementById('filterCandidate');
    if (filterCandidate) {
        filterCandidate.innerHTML = '<option value="">الكل</option>';
        Object.values(candidatesData).forEach(candidate => {
            const option = document.createElement('option');
            option.value = candidate.id;
            option.textContent = candidate.name;
            filterCandidate.appendChild(option);
        });
    }
    
    // Update District Filter
    const filterDistrict = document.getElementById('filterDistrict');
    if (filterDistrict) {
        filterDistrict.innerHTML = '<option value="">الكل</option>';
        DISTRICTS.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            filterDistrict.appendChild(option);
        });
    }
}

// Calculate Statistics
function calculateStatistics() {
    const users = Object.values(filteredUsers);
    
    return {
        totalUsers: users.length,
        individuals: users.filter(u => u.type === 'individual').length,
        families: users.filter(u => u.type === 'family').length,
        voted: users.filter(u => u.images && u.images.front).length,
        notVoted: users.filter(u => !u.images || !u.images.front).length,
        male: users.filter(u => u.gender === 'ذكر').length,
        female: users.filter(u => u.gender === 'أنثى').length,
        districts: {}
    };
}

// Update Statistics
function updateStatistics() {
    const stats = calculateStatistics();
    const statsGrid = document.getElementById('statsGrid');
    
    statsGrid.innerHTML = `
        <div class="stat-card" onclick="filterBy('all')">
            <div class="stat-header">
                <span class="stat-icon">👥</span>
            </div>
            <div class="stat-title">إجمالي المستخدمين</div>
            <div class="stat-value">${stats.totalUsers}</div>
            <div class="stat-footer">مسجل في النظام</div>
        </div>

        <div class="stat-card" onclick="filterBy('individuals')">
            <div class="stat-header">
                <span class="stat-icon">👤</span>
            </div>
            <div class="stat-title">المستخدمون الأفراد</div>
            <div class="stat-value">${stats.individuals}</div>
            <div class="stat-footer">مسجل كفرد</div>
        </div>

        <div class="stat-card" onclick="filterBy('families')">
            <div class="stat-header">
                <span class="stat-icon">👨‍👩‍👧‍👦</span>
            </div>
            <div class="stat-title">المستخدمون العائلات</div>
            <div class="stat-value">${stats.families}</div>
            <div class="stat-footer">مسجل كعائلة</div>
        </div>

        <div class="stat-card" onclick="filterBy('voted')">
            <div class="stat-header">
                <span class="stat-icon">✅</span>
            </div>
            <div class="stat-title">تم الانتخاب</div>
            <div class="stat-value">${stats.voted}</div>
            <div class="stat-footer">قام بالتصويت</div>
        </div>

        <div class="stat-card" onclick="filterBy('not-voted')">
            <div class="stat-header">
                <span class="stat-icon">⏳</span>
            </div>
            <div class="stat-title">لم ينتخب بعد</div>
            <div class="stat-value">${stats.notVoted}</div>
            <div class="stat-footer">لم يقم بالتصويت</div>
        </div>

        <div class="stat-card" onclick="filterBy('male')">
            <div class="stat-header">
                <span class="stat-icon">👨</span>
            </div>
            <div class="stat-title">الذكور</div>
            <div class="stat-value">${stats.male}</div>
            <div class="stat-footer">مستخدم ذكر</div>
        </div>

        <div class="stat-card" onclick="filterBy('female')">
            <div class="stat-header">
                <span class="stat-icon">👩</span>
            </div>
            <div class="stat-title">الإناث</div>
            <div class="stat-value">${stats.female}</div>
            <div class="stat-footer">مستخدم أنثى</div>
        </div>
    `;
}

// Update Districts List
function updateDistrictsList() {
    const districtsList = document.getElementById('districtsList');
    const users = Object.values(filteredUsers);
    
    const districtCounts = {};
    DISTRICTS.forEach(district => {
        districtCounts[district] = users.filter(u => u.district === district).length;
    });
    
    districtsList.innerHTML = DISTRICTS.map(district => `
        <div class="district-item" onclick="filterByDistrict('${district}')">
            <span class="district-name">${district}</span>
            <span class="district-count">${districtCounts[district] || 0}</span>
        </div>
    `).join('');
}

// Update Users Grid
function updateUsersGrid() {
    const usersGrid = document.getElementById('usersGrid');
    const users = Object.values(displayedUsers);
    
    if (users.length === 0) {
        usersGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <div class="empty-state-title">لا توجد نتائج</div>
                <div class="empty-state-message">لم يتم العثور على مستخدمين</div>
            </div>
        `;
        return;
    }
    
    usersGrid.innerHTML = users.map(user => {
    const hasVoted = user.profileImg && user.profileImg.trim() !== "";
        let candidateName = 'غير محدد';
        if (user.candidateId && candidatesData[user.candidateId]) {
            candidateName = candidatesData[user.candidateId].name;
        } else if (user.candidate) {
            candidateName = user.candidate;
        }
        
        return `
            <div class="user-card">
                <div class="user-card-header">
                    <div class="user-avatar-large">${user.fullName.charAt(0)}</div>
                    <div class="user-status">
                        <span class="status-badge ${hasVoted ? 'status-voted' : 'status-new'}">
                            <i class="fas ${hasVoted ? 'fa-check-circle' : 'fa-user-plus'}"></i>
                            ${hasVoted ? 'تم الانتخاب' : 'مستخدم جديد'}
                        </span>
                        ${currentUser.type === 'admin' ? `<input type="checkbox" class="checkbox-select" data-phone="${user.phone}" onchange="toggleCardSelection('${user.phone}')">` : ''}
                    </div>
                </div>
                
                <div class="user-info-section">
                    <div class="user-name">${user.fullName}</div>
                    <div class="user-details">
                        <div class="user-detail-item">
                            <i class="fas fa-phone"></i>
                            <span>${user.phone}</span>
                        </div>
                        <div class="user-detail-item">
                            <i class="fas fa-user-tie"></i>
                            <span>${candidateName}</span>
                        </div>
                        <div class="user-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${user.district || 'غير محدد'}</span>
                        </div>
                        <div class="user-detail-item">
                            <i class="fas fa-school"></i>
                            <span>${user.school || 'غير محدد'}</span>
                        </div>
                        ${user.gender ? `
                        <div class="user-detail-item">
                            <i class="fas fa-venus-mars"></i>
                            <span>${user.gender}</span>
                        </div>
                        ` : ''}
                        ${user.type ? `
                        <div class="user-detail-item">
                            <i class="fas fa-id-card"></i>
                            <span>${user.type === 'individual' ? 'فرد' : 'عائلة'}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                ${hasVoted && user.images.front ? `
                <div class="vote-image-container">
                    <img src="${user.images.front}" alt="صورة التصويت" class="vote-image" onclick="viewImage('${user.images.front}')">
                </div>
                ` : ''}
                
                <div class="user-actions">
                    <button class="action-btn action-btn-view" onclick="viewUserDetails('${user.phone}')">
                        <i class="fas fa-eye"></i> عرض
                    </button>
                    <button class="action-btn action-btn-whatsapp" onclick="sendWhatsapp('${user.phone}')">
                        <i class="fab fa-whatsapp"></i> واتساب
                    </button>
                    ${currentUser.type === 'admin' ? `
                    <button class="action-btn action-btn-delete" onclick="deleteUser('${user.phone}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    updateBulkActionsVisibility();
}

// Filter Functions
function filterBy(type) {
    const users = Object.values(filteredUsers);
    
    switch(type) {
        case 'all':
            displayedUsers = { ...filteredUsers };
            break;
        case 'individuals':
            displayedUsers = {};
            users.filter(u => u.type === 'individual').forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'families':
            displayedUsers = {};
            users.filter(u => u.type === 'family').forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'voted':
            displayedUsers = {};
            users.filter(u => u.images && u.images.front).forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'not-voted':
            displayedUsers = {};
            users.filter(u => !u.images || !u.images.front).forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'male':
            displayedUsers = {};
            users.filter(u => u.gender === 'ذكر').forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'female':
            displayedUsers = {};
            users.filter(u => u.gender === 'أنثى').forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
    }
    
    updateUsersGrid();
    closeSidebar();
}

function filterByDistrict(district) {
    displayedUsers = {};
    Object.values(filteredUsers)
        .filter(u => u.district === district)
        .forEach(u => {
            displayedUsers[u.phone] = u;
        });
    
    updateUsersGrid();
    closeSidebar();
}

function applyFilters() {
    const candidateFilter = document.getElementById('filterCandidate').value;
    const districtFilter = document.getElementById('filterDistrict').value;
    const genderFilter = document.getElementById('filterGender').value;
    const votedFilter = document.getElementById('filterVoted').value;
    
    displayedUsers = {};
    Object.values(filteredUsers).forEach(user => {
        let match = true;
        // فلترة حسب المرشح
        if (candidateFilter) {
            if (
                !(user.candidateId === candidateFilter ||
                  (user.candidate && candidatesData[candidateFilter] && user.candidate === candidatesData[candidateFilter].name))
            ) {
                match = false;
            }
        }
        if (districtFilter && user.district !== districtFilter) match = false;
        if (genderFilter && user.gender !== genderFilter) match = false;
        if (votedFilter === 'voted' && (!user.images || !user.images.front)) match = false;
        if (votedFilter === 'not-voted' && (user.images && user.images.front)) match = false;
        if (match) {
            displayedUsers[user.phone] = user;
        }
    });
    
    updateUsersGrid();
}

function resetFilters() {
    document.getElementById('filterCandidate').value = '';
    document.getElementById('filterDistrict').value = '';
    document.getElementById('filterGender').value = '';
    document.getElementById('filterVoted').value = '';
    displayedUsers = { ...filteredUsers };
    updateUsersGrid();
}

// Search Function
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        displayedUsers = { ...filteredUsers };
        updateUsersGrid();
        return;
    }
    
    displayedUsers = {};
    Object.values(filteredUsers).forEach(user => {
        const searchableText = `
            ${user.fullName} 
            ${user.phone} 
            ${user.district || ''} 
            ${user.school || ''}
            ${user.gender || ''}
            ${candidatesData[user.candidateId]?.name || ''}
        `.toLowerCase();
        
        if (searchableText.includes(query)) {
            displayedUsers[user.phone] = user;
        }
    });
    
    updateUsersGrid();
}

// User Actions
function viewUserDetails(phone) {
    const user = allUsers[phone];
    if (!user) return;
    
    let candidateName = 'غير محدد';
    if (user.candidateId && candidatesData[user.candidateId]) {
        candidateName = candidatesData[user.candidateId].name;
    } else if (user.candidate) {
        candidateName = user.candidate;
    }
    const hasVoted = user.profileImg && user.profileImg.trim() !== "";
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 120px; height: 120px; margin: 0 auto 1rem; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 700; box-shadow: var(--shadow-md); overflow: hidden;">
                ${hasVoted ? `<img src='${user.profileImg}' alt='صورة الانتخاب' style='width:100%;height:100%;object-fit:cover;border-radius:50%;'>` : user.fullName.charAt(0)}
            </div>
            <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${user.fullName}</h2>
            <span class="status-badge ${hasVoted ? 'status-voted' : 'status-new'}" style="display: inline-flex;">
                <i class="fas ${hasVoted ? 'fa-check-circle' : 'fa-user-plus'}"></i>
                ${hasVoted ? 'تم الانتخاب' : 'لم ينتخب بعد'}
            </span>
        </div>
        
        <div style="display: grid; gap: 1.5rem;">
            <div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px;">
                <h3 style="color: var(--primary-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-info-circle"></i> المعلومات الأساسية
                </h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-phone" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">رقم الهاتف</div>
                            <div style="font-weight: 600;">${user.phone}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-user-tie" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">المرشح</div>
                            <div style="font-weight: 600;">${candidateName}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-map-marker-alt" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">القضاء</div>
                            <div style="font-weight: 600;">${user.district || 'غير محدد'}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-school" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">المدرسة</div>
                            <div style="font-weight: 600;">${user.school || 'غير محدد'}</div>
                        </div>
                    </div>
                    ${user.gender ? `
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-venus-mars" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">الجنس</div>
                            <div style="font-weight: 600;">${user.gender}</div>
                        </div>
                    </div>
                    ` : ''}
                    ${user.type ? `
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-id-card" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">النوع</div>
                            <div style="font-weight: 600;">${user.type === 'individual' ? 'فرد' : 'عائلة'}</div>
                        </div>
                    </div>
                    ` : ''}
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-calendar" style="color: var(--primary-color); width: 30px;"></i>
                        <div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">تاريخ التسجيل</div>
                            <div style="font-weight: 600;">${new Date(user.createdAt).toLocaleDateString('ar-IQ')}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${hasVoted && user.images.front ? `
            <div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px;">
                <h3 style="color: var(--success-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-check-circle"></i> صورة التصويت
                </h3>
                <img src="${user.images.front}" style="width: 100%; border-radius: 12px; box-shadow: var(--shadow-md); cursor: pointer;" onclick="viewImage('${user.images.front}')">
            </div>
            ` : ''}
            
            <div style="display: flex; gap: 1rem;">
                <button class="action-btn action-btn-whatsapp" onclick="sendWhatsapp('${user.phone}')" style="flex: 1;">
                    <i class="fab fa-whatsapp"></i> مراسلة واتساب
                </button>
                ${currentUser.type === 'admin' ? `
                <button class="action-btn action-btn-delete" onclick="deleteUser('${user.phone}')" style="flex: 1;">
                    <i class="fas fa-trash"></i> حذف المستخدم
                </button>
                ` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('userModal').classList.add('active');
}

function sendWhatsapp(phone) {
    const user = allUsers[phone];
    if (!user) return;
    
    const message = `مرحباً ${user.fullName}، نشكرك على تسجيلك في ائتلاف أساس العراق. صوتك اليوم مستقبلك غداً! 🇮🇶`;
    let phoneNumber = phone;
    // إضافة الرمز الدولي 964 إذا لم يكن موجوداً
    if (!phoneNumber.startsWith('964')) {
        phoneNumber = '964' + phoneNumber.replace(/^0+/, '');
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function deleteUser(phone) {
    if (!currentUser || currentUser.type !== 'admin') {
        showAlert('غير مصرح لك بحذف المستخدمين', 'error');
        return;
    }
    
    const user = allUsers[phone];
    if (!user) return;
    
    if (confirm(`هل أنت متأكد من حذف المستخدم: ${user.fullName}؟`)) {
        database.ref(`users/${phone}`).remove()
            .then(() => {
                showAlert('تم حذف المستخدم بنجاح', 'success');
                closeModal();
            })
            .catch(error => {
                showAlert('حدث خطأ أثناء الحذف: ' + error.message, 'error');
            });
    }
}

function viewImage(imageUrl) {
    window.open(imageUrl, '_blank');
}

// Card Selection
function toggleCardSelection(phone) {
    if (selectedCards.has(phone)) {
        selectedCards.delete(phone);
    } else {
        selectedCards.add(phone);
    }
    updateBulkActionsVisibility();
}

function updateBulkActionsVisibility() {
    const bulkBtn = document.getElementById('bulkWhatsappBtn');
    if (bulkBtn) {
        bulkBtn.style.display = selectedCards.size > 0 ? 'flex' : 'none';
    }
}

function sendBulkWhatsapp() {
    if (selectedCards.size === 0) return;
    
    const users = Array.from(selectedCards).map(phone => allUsers[phone]).filter(u => u);
    const message = `مرحباً، نشكركم على تسجيلكم في ائتلاف أساس العراق. صوتكم اليوم مستقبلكم غداً! 🇮🇶`;
    
    users.forEach(user => {
        let phoneNumber = user.phone;
        if (!phoneNumber.startsWith('964')) {
            phoneNumber = '964' + phoneNumber.replace(/^0+/, '');
        }
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    selectedCards.clear();
    updateBulkActionsVisibility();
    updateUsersGrid();
}

// Notifications
function addNotification(notification) {
    notifications.unshift(notification);
    if (notifications.length > 50) {
        notifications = notifications.slice(0, 50);
    }
    updateNotifications();
}

function updateNotifications() {
    const notificationCount = document.getElementById('notificationCount');
    const notificationList = document.getElementById('notificationList');
    
    notificationCount.textContent = notifications.length;
    
    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div class="empty-state" style="padding: 2rem;">
                <i class="fas fa-bell-slash"></i>
                <div class="empty-state-title">لا توجد إشعارات</div>
                <div class="empty-state-message">لا توجد إشعارات جديدة</div>
            </div>
        `;
        return;
    }
    
    notificationList.innerHTML = notifications.map(notif => `
        <div class="notification-item" onclick="viewUserDetails('${notif.user.phone}')">
            <div class="notification-item-header">
                <div class="notification-icon ${notif.type === 'new_user' ? 'new-user' : 'voted'}">
                    <i class="fas ${notif.type === 'new_user' ? 'fa-user-plus' : 'fa-check-circle'}"></i>
                </div>
                <div class="notification-message">${notif.message}</div>
            </div>
            <div class="notification-time">${getTimeAgo(notif.timestamp)}</div>
        </div>
    `).join('');
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'الآن';
    if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`;
    if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`;
    return `منذ ${Math.floor(seconds / 86400)} يوم`;
}

function clearNotifications() {
    if (confirm('هل تريد مسح جميع الإشعارات؟')) {
        notifications = [];
        updateNotifications();
    }
}

// UI Functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('active');
}

function showUserMenu() {
    const menu = `
        <div style="position: absolute; top: 60px; left: 20px; background: white; border-radius: 12px; box-shadow: var(--shadow-lg); padding: 1rem; min-width: 200px; z-index: 2000;">
            <div style="padding: 0.75rem; cursor: pointer; border-radius: 8px; transition: var(--transition);" onmouseover="this.style.background='var(--bg-gradient-start)'" onmouseout="this.style.background=''" onclick="showPage('settings')">
                <i class="fas fa-cog"></i> الإعدادات
            </div>
            <div style="padding: 0.75rem; cursor: pointer; border-radius: 8px; transition: var(--transition);" onmouseover="this.style.background='var(--bg-gradient-start)'" onmouseout="this.style.background=''" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
            </div>
        </div>
    `;
    // This is a simple implementation - in production, you'd want a more robust menu system
}

function closeModal() {
    document.getElementById('userModal').classList.remove('active');
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}

function showAlert(message, type = 'info') {
    alert(message);
}

// Page Navigation
function showPage(pageName) {
    // Hide all page contents
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Update active menu item
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    switch(pageName) {
        case 'dashboard':
            document.getElementById('dashboardContent').classList.add('active');
            break;
        case 'users':
            loadUsersPage();
            break;
        case 'voters':
            loadVotersPage();
            break;
        case 'reports':
            loadReportsPage();
            break;
        case 'settings':
            if (currentUser.type === 'admin') {
                loadSettingsPage();
            } else {
                showAlert('غير مصرح لك بالوصول إلى الإعدادات', 'error');
            }
            break;
    }
    
    closeSidebar();
}

function loadUsersPage() {
    const content = document.getElementById('usersContent');
    content.classList.add('active');
    content.innerHTML = `
        <div class="users-container">
            <h2 style="color: var(--primary-color); margin-bottom: 2rem;">
                <i class="fas fa-users"></i> جميع المستخدمين
            </h2>
            <div class="users-grid" id="allUsersGrid"></div>
        </div>
    `;
    
    // Display all users
    const allUsersGrid = document.getElementById('allUsersGrid');
    allUsersGrid.innerHTML = document.getElementById('usersGrid').innerHTML;
}

function loadVotersPage() {
    const content = document.getElementById('votersContent');
    content.classList.add('active');
    
    const votedUsers = Object.values(filteredUsers).filter(u => u.images && u.images.front);
    
    content.innerHTML = `
        <div class="users-container">
            <h2 style="color: var(--success-color); margin-bottom: 2rem;">
                <i class="fas fa-check-circle"></i> المنتخبون (${votedUsers.length})
            </h2>
            <div class="users-grid" id="votersGrid"></div>
        </div>
    `;
    
    const votersGrid = document.getElementById('votersGrid');
    
    if (votedUsers.length === 0) {
        votersGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-vote-yea"></i>
                <div class="empty-state-title">لا يوجد منتخبون</div>
                <div class="empty-state-message">لم يقم أي مستخدم بالتصويت بعد</div>
            </div>
        `;
        return;
    }
    
    // Reuse the user card rendering logic
    displayedUsers = {};
    votedUsers.forEach(u => displayedUsers[u.phone] = u);
    votersGrid.innerHTML = document.getElementById('usersGrid').innerHTML;
}

function loadReportsPage() {
    const content = document.getElementById('reportsContent');
    content.classList.add('active');
    
    const stats = calculateStatistics();
    const users = Object.values(filteredUsers);
    
    content.innerHTML = `
        <div style="display: grid; gap: 2rem;">
            <div class="settings-section">
                <h2 class="settings-title">
                    <i class="fas fa-chart-bar"></i> تقارير وتحليلات شاملة
                </h2>
                
                <div class="stats-grid" style="margin-bottom: 2rem;">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-title">إجمالي المستخدمين</div>
                        <div class="stat-value">${stats.totalUsers}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-title">تم الانتخاب</div>
                        <div class="stat-value">${stats.voted}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-title">لم ينتخب</div>
                        <div class="stat-value">${stats.notVoted}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-title">نسبة الانتخاب</div>
                        <div class="stat-value">${stats.totalUsers > 0 ? Math.round((stats.voted / stats.totalUsers) * 100) : 0}%</div>
                    </div>
                </div>
                
                <h3 style="color: var(--primary-color); margin: 2rem 0 1rem;">التوزيع حسب المرشح</h3>
                <div style="display: grid; gap: 1rem;">
                    ${(() => {
                        const BASE_USERS = 5000;
                        return Object.values(candidatesData).map(candidate => {
                            const count = users.filter(u =>
                                (u.candidateId === candidate.id) ||
                                (u.candidate && u.candidate === candidate.name)
                            ).length;
                            const percentage = count > 0 ? ((count / BASE_USERS) * 100).toFixed(2) : '0.00';
                            return `
                                <div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">${candidate.name}</div>
                                        <div style="color: var(--text-light); font-size: 0.9rem;">عدد المستخدمين: ${count}</div>
                                    </div>
                                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${percentage}%</div>
                                </div>
                            `;
                        }).join('');
                    })()}
                </div>
                
                <h3 style="color: var(--primary-color); margin: 2rem 0 1rem;">التوزيع حسب القضاء</h3>
                <div style="display: grid; gap: 1rem;">
                    ${DISTRICTS.map(district => {
                        const BASE_USERS = 5000;
                        const count = users.filter(u => u.district === district).length;
                        const percentage = count > 0 ? ((count / BASE_USERS) * 100).toFixed(2) : '0.00';
                        return `
                            <div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">${district}</div>
                                    <div style="color: var(--text-light); font-size: 0.9rem;">عدد المستخدمين: ${count}</div>
                                </div>
                                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${percentage}%</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

function loadSettingsPage() {
    const content = document.getElementById('settingsContent');
    content.classList.add('active');
    
    content.innerHTML = `
        <div style="display: grid; gap: 2rem;">
            <div class="settings-section">
                <h2 class="settings-title">
                    <i class="fas fa-user-tie"></i> إدارة المرشحين
                </h2>
                <div class="candidate-list" id="candidateList"></div>
            </div>
            
            <div class="settings-section">
                <h2 class="settings-title">
                    <i class="fas fa-database"></i> إدارة البيانات
                </h2>
                <div style="display: grid; gap: 1rem;">
                    <button class="filter-btn filter-btn-apply" onclick="exportData()" style="width: 100%;">
                        <i class="fas fa-download"></i> تصدير البيانات
                    </button>
                    <button class="filter-btn filter-btn-reset" onclick="backupData()" style="width: 100%;">
                        <i class="fas fa-cloud-upload-alt"></i> نسخ احتياطي
                    </button>
                </div>
            </div>
        </div>
    `;
    
    loadCandidateList();
}

function loadCandidateList() {
    const candidateList = document.getElementById('candidateList');
    if (!candidateList) return;
    
    candidateList.innerHTML = Object.values(candidatesData).map(candidate => `
        <div class="candidate-card">
            <div class="candidate-info">
                <div class="candidate-avatar">${candidate.name.charAt(0)}</div>
                <div class="candidate-details">
                    <h4>${candidate.name}</h4>
                    <p>الرمز: ${candidate.password}</p>
                </div>
            </div>
            <div class="candidate-actions">
                <button class="icon-btn icon-btn-edit" onclick="editCandidate('${candidate.id}')" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editCandidate(candidateId) {
    const candidate = candidatesData[candidateId];
    if (!candidate) return;
    
    const newPassword = prompt(`أدخل الرمز السري الجديد للمرشح: ${candidate.name}`, candidate.password);
    if (!newPassword) return;
    
    database.ref(`candidates/${candidateId}/password`).set(newPassword)
        .then(() => {
            showAlert('تم تحديث الرمز السري بنجاح', 'success');
            loadCandidateList();
        })
        .catch(error => {
            showAlert('حدث خطأ: ' + error.message, 'error');
        });
}

function exportData() {
    const data = {
        users: allUsers,
        candidates: candidatesData,
        exportDate: new Date().toISOString(),
        version: '2.0.0'
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `asas-iraq-backup-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showAlert('تم تصدير البيانات بنجاح', 'success');
}

function backupData() {
    if (!confirm('هل تريد إنشاء نسخة احتياطية في Firebase؟')) return;
    
    showLoading(true);
    
    database.ref('users').once('value')
        .then(snapshot => {
            const data = snapshot.val() || {};
            const backupRef = database.ref('backups').push();
            
            return backupRef.set({
                data: data,
                timestamp: Date.now(),
                date: new Date().toISOString()
            });
        })
        .then(() => {
            showLoading(false);
            showAlert('تم إنشاء النسخة الاحتياطية بنجاح', 'success');
        })
        .catch(error => {
            showLoading(false);
            showAlert('حدث خطأ: ' + error.message, 'error');
        });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Close modal on outside click
    window.onclick = function(event) {
        const modal = document.getElementById('userModal');
        if (event.target === modal) {
            closeModal();
        }
    };
});
