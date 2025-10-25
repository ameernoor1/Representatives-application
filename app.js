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
const storage = firebase.storage ? firebase.storage() : null;

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
        const user = snapshot.val();
        // تحقق من عدم تكرار الإشعار لنفس المستخدم
        if (!notifications.some(n => n.user && n.user.phone === user.phone && n.type === 'new_user')) {
            addNotification({
                type: 'new_user',
                message: `مستخدم جديد: ${user.fullName}`,
                user: user,
                timestamp: Date.now()
            });
        }
        updateNotifications();
    });

    // Listen for voted users
    database.ref('users').on('child_changed', (snapshot) => {
        const user = snapshot.val();
        if (user.images && user.images.front) {
            // تحقق من عدم تكرار إشعار التصويت لنفس المستخدم
            if (!notifications.some(n => n.user && n.user.phone === user.phone && n.type === 'voted')) {
                addNotification({
                    type: 'voted',
                    message: `تم الانتخاب: ${user.fullName}`,
                    user: user,
                    timestamp: Date.now()
                });
            }
            updateNotifications();
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
    individuals: users.filter(u => u.individualCount === 1).length,
    families: users.filter(u => u.individualCount > 1).length,
    voted: users.filter(u => u.profileImg && u.profileImg.trim() !== "").length,
    notVoted: users.filter(u => !u.profileImg || u.profileImg.trim() === "").length,
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
            <div class="stat-value">${stats.families} +${Object.values(filteredUsers).reduce((sum, u) => sum + (u.individualCount > 1 ? u.individualCount : 0), 0)}</div>
            <div class="stat-footer">مسجل كعائلة</div>
        </div>

        <div class="stat-card" onclick="filterBy('total-individuals')">
            <div class="stat-header">
                <span class="stat-icon">🧮</span>
            </div>
            <div class="stat-title">إجمالي الأفراد</div>
            <div class="stat-value">${Object.values(filteredUsers).reduce((sum, u) => sum + (u.individualCount > 1 ? u.individualCount : 1), 0)}</div>
            <div class="stat-footer">مجموع المستخدمين والأفراد</div>
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

    // زر إضافة مستخدم جديد للمدير فقط (زر عائم في أسفل يسار النافذة)
    let addUserBtnHtml = '';
    if (currentUser && currentUser.type === 'admin') {
        addUserBtnHtml = '<button class="floating-add-btn" onclick="showAddUserModal()"><i class="fas fa-user-plus"></i></button>';
        if (!document.getElementById('floatingAddUserBtn')) {
            var btn = document.createElement('button');
            btn.id = 'floatingAddUserBtn';
            btn.className = 'floating-add-btn';
            btn.innerHTML = '<i class="fas fa-user-plus"></i>';
            btn.onclick = showAddUserModal;
            btn.style = 'position: fixed; left: 32px; bottom: 32px; z-index: 9999; background: var(--success-color); color: white; font-size: 2rem; width: 64px; height: 64px; border-radius: 50%; box-shadow: var(--shadow-lg); display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;';
            document.body.appendChild(btn);
        }
    } else {
        var oldBtn = document.getElementById('floatingAddUserBtn');
        if (oldBtn) oldBtn.remove();
    }

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
        // صورة المستخدم: profileImg أو images.front
        let userImg = user.profileImg && user.profileImg.trim() !== '' ? user.profileImg : (user.images && user.images.front ? user.images.front : '');
        // صورة الانتخاب: images.front فقط
        let voteImg = user.images && user.images.front ? user.images.front : '';
        return '<div class="user-card">' +
            '<div class="user-card-header">' +
                (userImg ? '<img src="' + userImg + '" class="user-avatar-large" alt="صورة المستخدم" style="object-fit:cover;border-radius:50%;width:48px;height:48px;">' : '<div class="user-avatar-large">' + user.fullName.charAt(0) + '</div>') +
                '<div class="user-status">' +
                    '<span class="status-badge ' + (hasVoted ? 'status-voted' : 'status-new') + '">' +
                        '<i class="fas ' + (hasVoted ? 'fa-check-circle' : 'fa-user-plus') + '"></i>' +
                        (hasVoted ? 'تم الانتخاب' : 'مستخدم جديد') +
                    '</span>' +
                    (currentUser.type === 'admin' ? '<input type="checkbox" class="checkbox-select" data-phone="' + user.phone + '" onchange="toggleCardSelection(\'' + user.phone + '\')">' : '') +
                '</div>' +
            '</div>' +
            '<div class="user-info-section">' +
                '<div class="user-name">' + user.fullName + '</div>' +
                '<div class="user-details">' +
                    '<div class="user-detail-item"><i class="fas fa-phone"></i><span>' + user.phone + '</span></div>' +
                    '<div class="user-detail-item"><i class="fas fa-user-tie"></i><span>' + candidateName + '</span></div>' +
                    '<div class="user-detail-item"><i class="fas fa-map-marker-alt"></i><span>' + (user.district || 'غير محدد') + '</span></div>' +
                    '<div class="user-detail-item"><i class="fas fa-school"></i><span>' + (user.school || 'غير محدد') + '</span></div>' +
                    (user.gender ? '<div class="user-detail-item"><i class="fas fa-venus-mars"></i><span>' + user.gender + '</span></div>' : '') +
                    (user.type ? '<div class="user-detail-item"><i class="fas fa-id-card"></i><span>' + (user.type === 'individual' ? 'فرد' : 'عائلة') + '</span></div>' : '') +
                '</div>' +
            '</div>' +
            (voteImg ? '<div class="vote-image-container"><img src="' + voteImg + '" alt="صورة التصويت" class="vote-image" onclick="viewImage(\'' + voteImg + '\')"></div>' : '') +
            '<div class="user-actions">' +
                '<button class="action-btn action-btn-view" onclick="viewUserDetails(\'' + user.phone + '\')"><i class="fas fa-eye"></i> عرض</button>' +
                '<button class="action-btn action-btn-whatsapp" onclick="sendWhatsapp(\'' + user.phone + '\')"><i class="fab fa-whatsapp"></i> واتساب</button>' +
            '</div>' +
        '</div>';
    }).join('');

    updateBulkActionsVisibility();
}

// عرض نموذج إضافة مستخدم جديد
function showAddUserModal() {
    var modal = document.getElementById('userModal');
    // بناء خيارات القضاء
    var districtOptions = DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');
    // بناء خيارات المرشحين
    var candidateOptions = Object.values(candidatesData).map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    modal.innerHTML = `
        <div class="modal-content" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); border-radius: 18px; box-shadow: var(--shadow-lg);">
            <div class="modal-header" style="background: var(--primary-dark); color: #fff; border-top-left-radius: 18px; border-top-right-radius: 18px; padding: 1.2rem 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <span class="modal-title" style="font-size: 1.5rem; font-weight: 700;">إضافة مستخدم جديد</span>
                <button class="modal-close" onclick="closeModal()" style="font-size: 1.7rem; background: none; border: none; color: #fff; cursor: pointer;">&times;</button>
            </div>
            <form id="addUserForm" style="padding: 2rem; display: grid; gap: 1.2rem; background: #fff; border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;">
                <label style="font-weight:600;">الاسم الثلاثي:<input type="text" name="fullName" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">رقم الهاتف:<input type="text" name="phone" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">المدرسة / المركز:<input type="text" name="school" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">رقم المحطة:<input type="text" name="stationNumber" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">القضاء:
                    <select name="district" class="form-select" required style="margin-top:6px;">
                        <option value="">-- اختر القضاء --</option>
                        ${districtOptions}
                    </select>
                </label>
                <label style="font-weight:600;">الجنس:
                    <select name="gender" class="form-select" required style="margin-top:6px;">
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                    </select>
                </label>
                <label style="font-weight:600;">اسم المرشح:
                    <select name="candidate" class="form-select" required style="margin-top:6px;">
                        <option value="">-- اختر المرشح --</option>
                        ${candidateOptions}
                    </select>
                </label>
                <label style="font-weight:600;">اسم الركيزة:<input type="text" name="parent" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">عدد أفراد الأسرة:<input type="number" name="individualCount" value="1" min="1" required class="form-input" style="margin-top:6px;"></label>
                <label style="font-weight:600;">صورة أمامية:<br>
                    <input type="file" name="frontImgFile" accept="image/*" required style="margin-top:6px;">
                </label>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button type="submit" class="action-btn action-btn-add" style="flex:1;background:var(--success-color);color:white;font-size:1.1rem;padding:0.8rem 0;border-radius:12px;">تسجيل المستخدم</button>
                    <button type="button" class="action-btn" onclick="closeModal()" style="flex:1;background:#f5f5f5;color:#333;font-size:1.1rem;padding:0.8rem 0;border-radius:12px;">إلغاء</button>
                </div>
            </form>
        </div>
    `;
    modal.classList.add('active');
    document.getElementById('addUserForm').onsubmit = function(e) {
        e.preventDefault();
        var form = e.target;
        var newUser = {
            fullName: form.fullName.value.trim(),
            phone: form.phone.value.trim(),
            school: form.school.value.trim(),
            stationNumber: form.stationNumber.value.trim(),
            district: form.district.value,
            gender: form.gender.value,
            candidate: form.candidate.value,
            parent: form.parent.value.trim(),
            individualCount: parseInt(form.individualCount.value) || 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            type: 'user',
            images: {},
            profileImg: ''
        };

        // رفع الصورة الأمامية فقط
        var frontImgFile = form.frontImgFile.files[0];

        function saveUserWithFrontImage(frontImgUrl) {
            if (frontImgUrl) newUser.images.front = frontImgUrl;
            database.ref('users/' + newUser.phone).set(newUser).then(() => {
                showAlert('تمت إضافة المستخدم بنجاح!');
                closeModal();
                loadData();
            }).catch(err => {
                showAlert('حدث خطأ أثناء إضافة المستخدم: ' + err.message, 'error');
            });
        }

        if (frontImgFile) {
            var frontRef = firebase.storage().ref('voteImages/' + newUser.phone + '_' + Date.now());
            frontRef.put(frontImgFile).then(snap => {
                snap.ref.getDownloadURL().then(frontImgUrl => {
                    saveUserWithFrontImage(frontImgUrl);
                });
            }).catch(err => {
                showAlert('خطأ في رفع الصورة الأمامية: ' + err.message, 'error');
                saveUserWithFrontImage(null);
            });
        } else {
            saveUserWithFrontImage(null);
        }
    };
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
            users.filter(u => u.individualCount === 1).forEach(u => {
                displayedUsers[u.phone] = u;
            });
            break;
        case 'families':
            displayedUsers = {};
            users.filter(u => u.individualCount > 1).forEach(u => {
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
            users.filter(u => !u.profileImg || u.profileImg.trim() === "").forEach(u => {
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
    
    const userPhones = Object.keys(displayedUsers);
    if (userPhones.length === 1) {
        viewUserDetails(userPhones[0]);
        closeSidebar();
        return;
    }
    updateUsersGrid();
    closeSidebar();
    scrollToUsersGrid();
}

function filterByDistrict(district) {
    displayedUsers = {};
    Object.values(filteredUsers)
        .filter(u => u.district === district)
        .forEach(u => {
            displayedUsers[u.phone] = u;
        });
    
    const userPhones = Object.keys(displayedUsers);
    if (userPhones.length === 1) {
        viewUserDetails(userPhones[0]);
        closeSidebar();
        return;
    }
    updateUsersGrid();
    closeSidebar();
    scrollToUsersGrid();
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
    
    const userPhones = Object.keys(displayedUsers);
    if (userPhones.length === 1) {
        viewUserDetails(userPhones[0]);
        return;
    }
    updateUsersGrid();
    scrollToUsersGrid();
}

// دالة التمرير التلقائي إلى قسم البطاقات (يجب أن تكون معرفة في المستوى الأعلى)
function scrollToUsersGrid() {
    setTimeout(function() {
        var grid = document.getElementById('usersGrid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 200);
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
        hideSearchResultsDropdown();
        return;
    }
    // بحث شامل في جميع الحقول المهمة
    const results = Object.values(filteredUsers).filter(user => {
        const searchableText = `
            ${user.fullName || ''}
            ${user.phone || ''}
            ${user.district || ''}
            ${user.school || ''}
            ${user.gender || ''}
            ${user.candidate || ''}
            ${user.parent || ''}
            ${user.stationNumber || ''}
            ${user.nationalId || ''}
            ${(candidatesData[user.candidateId]?.name || '')}
        `.toLowerCase();
        return searchableText.includes(query);
    });
    showSearchResultsDropdown(results);
}

function showSearchResultsDropdown(results) {
    // Remove any previous dropdowns
    document.querySelectorAll('#searchResultsDropdown').forEach(e => e.remove());
    let dropdown = document.createElement('div');
    dropdown.id = 'searchResultsDropdown';
    const isMobile = window.innerWidth <= 600;
    dropdown.style.position = isMobile ? 'fixed' : 'absolute';
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #ddd';
    dropdown.style.width = isMobile ? '96vw' : '100%';
    dropdown.style.left = isMobile ? '2vw' : '0';
    dropdown.style.top = isMobile ? '70px' : '';
    dropdown.style.zIndex = '2000';
    dropdown.style.maxHeight = isMobile ? '60vh' : '300px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
    dropdown.style.direction = 'rtl';
    dropdown.style.borderRadius = isMobile ? '18px' : '8px';
    dropdown.style.padding = isMobile ? '1rem 0.5rem' : '0';
    dropdown.style.fontSize = isMobile ? '1.1rem' : '1rem';
    dropdown.style.marginTop = isMobile ? '0' : '4px';
    // Always append to .search-box if exists, else to body
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.appendChild(dropdown);
    } else {
        document.body.appendChild(dropdown);
    }
    dropdown.innerHTML = '';
    if (results.length === 0) {
        dropdown.innerHTML = '<div style="padding: 1rem; color: #888;">لا توجد نتائج</div>';
        return;
    }
    results.forEach(user => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.style.padding = '0.7rem 1rem';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid #eee';
        item.innerHTML = '<b>' + (user.fullName || user.phone) + '</b>' +
            '<div style="font-size:0.95rem;color:#666;">' +
                (user.candidate ? 'مرشح: ' + user.candidate + ' | ' : '') +
                (user.district ? 'قضاء: ' + user.district + ' | ' : '') +
                (user.school ? 'مدرسة: ' + user.school + ' | ' : '') +
                (user.parent ? 'ركيزة: ' + user.parent + ' | ' : '') +
                (user.stationNumber ? 'محطة: ' + user.stationNumber : '') +
            '</div>';
        item.onclick = function() {
            hideSearchResultsDropdown();
            viewUserDetails(user.phone);
        };
        dropdown.appendChild(item);
    });
}

function hideSearchResultsDropdown() {
    const dropdown = document.getElementById('searchResultsDropdown');
    if (dropdown) dropdown.remove();
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

    // جلب جميع الحقول من بيانات المستخدم
    const details = [
            { label: 'المرشح', icon: 'fa-user-tie', value: user.candidate || user.candidateName || 'غير محدد' },
        { label: 'رقم الهاتف', icon: 'fa-phone', value: user.phone },
        { label: 'القضاء', icon: 'fa-map-marker-alt', value: user.district },
        { label: 'المدرسة', icon: 'fa-school', value: user.school },
        { label: 'الجنس', icon: 'fa-venus-mars', value: user.gender },
        { label: 'اسم الركيزة', icon: 'fa-user-friends', value: user.parent },
        { label: 'عدد الأفراد', icon: 'fa-users', value: user.individualCount },
        { label: 'رقم المحطة', icon: 'fa-hashtag', value: user.stationNumber },
        { label: 'تاريخ التسجيل', icon: 'fa-calendar', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-IQ') : '' },
        { label: 'تاريخ التحديث', icon: 'fa-calendar-day', value: user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('ar-IQ') : '' },
    ];

    let detailsHtml = '';
    details.filter(function(d) { return d.value; }).forEach(function(d) {
        detailsHtml += '<div style="display: flex; align-items: center; gap: 1rem;">' +
            '<i class="fas ' + d.icon + '" style="color: var(--primary-color); width: 30px;"></i>' +
            '<div>' +
                '<div style="color: var(--text-light); font-size: 0.9rem;">' + d.label + '</div>' +
                '<div style="font-weight: 600;">' + d.value + '</div>' +
            '</div>' +
        '</div>';
    });
    var voteImageHtml = '';
    if (hasVoted && user.images && user.images.front) {
        voteImageHtml = '<div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px;">' +
            '<h3 style="color: var(--success-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">' +
                '<i class="fas fa-check-circle"></i> صورة التصويت' +
            '</h3>' +
            '<img src="' + user.images.front + '" style="width: 100%; border-radius: 12px; box-shadow: var(--shadow-md); cursor: pointer;" onclick="viewImage(\'' + user.images.front + '\')">' +
        '</div>';
    }

    // صورة المستخدم أسفل التفاصيل
    var userProfileImgHtml = '';
    if (user.profileImg && user.profileImg.trim() !== '') {
        userProfileImgHtml = '<div style="margin: 1.5rem auto 0; text-align: center;">' +
            '<h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">صورة المستخدم</h3>' +
            '<img src="' + user.profileImg + '" alt="صورة المستخدم" style="max-width: 220px; border-radius: 12px; box-shadow: var(--shadow-md); cursor: pointer;" onclick="viewImage(\'' + user.profileImg + '\')">' +
        '</div>';
    }
    var isMobile = window.innerWidth <= 600;
    var adminEditBtn = '';
    if (currentUser.type === 'admin') {
        adminEditBtn = '<button class="action-btn action-btn-edit" onclick="showEditUserModal(\'' + user.phone + '\')" style="flex: 1; background: var(--info-color); color: white;">' +
            '<i class="fas fa-edit"></i>' + (isMobile ? '' : ' تعديل البيانات') +
        '</button>';
    }
    var adminDeleteBtn = '';
    if (currentUser.type === 'admin') {
        adminDeleteBtn = '<button class="action-btn action-btn-delete" onclick="deleteUser(\'' + user.phone + '\')" style="flex: 1;">' +
            '<i class="fas fa-trash"></i>' + (isMobile ? '' : ' حذف المستخدم') +
        '</button>';
    }
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML =
        '<div style="text-align: center; margin-bottom: 2rem;">' +
            '<div style="width: 120px; height: 120px; margin: 0 auto 1rem; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 700; box-shadow: var(--shadow-md); overflow: hidden;">' +
                (hasVoted ? '<img src="' + user.profileImg + '" alt="صورة الانتخاب" style="width:100%;height:100%;object-fit:cover;border-radius:50%">' : user.fullName.charAt(0)) +
            '</div>' +
            '<h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">' + user.fullName + '</h2>' +
            '<span class="status-badge ' + (hasVoted ? 'status-voted' : 'status-new') + '" style="display: inline-flex;">' +
                '<i class="fas ' + (hasVoted ? 'fa-check-circle' : 'fa-user-plus') + '"></i>' +
                (hasVoted ? 'تم الانتخاب' : 'لم ينتخب بعد') +
            '</span>' +
        '</div>' +
        '<div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">' +
            '<h3 style="color: var(--primary-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">' +
                '<i class="fas fa-info-circle"></i> جميع التفاصيل' +
            '</h3>' +
            '<div style="display: grid; gap: 1rem;">' + detailsHtml + '</div>' +
        '</div>' +
        userProfileImgHtml +
        voteImageHtml +
        '<div style="display: flex; gap: 1rem; margin-top: 1.5rem;">' +
            '<button class="action-btn action-btn-whatsapp" onclick="sendWhatsapp(\'' + user.phone + '\')" style="flex: 1;">' +
                '<i class="fab fa-whatsapp"></i>' + (isMobile ? '' : ' مراسلة واتساب') +
            '</button>' +
            adminEditBtn +
            adminDeleteBtn +
        '</div>';
    document.getElementById('userModal').classList.add('active');
// نافذة تعديل بيانات المستخدم
window.showEditUserModal = function(phone) {
    const user = allUsers[phone];
    if (!user) return;
    let modal = document.getElementById('editUserModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'editUserModal';
        modal.className = 'modal active';
        document.body.appendChild(modal);
    }
        var isMobile = window.innerWidth <= 600;
        modal.innerHTML = `
            <div class="modal-content" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); border-radius: 18px; box-shadow: var(--shadow-lg); ${isMobile ? 'max-width:100vw;padding:0;' : ''}">
                <div class="modal-header" style="background: var(--primary-dark); color: #fff; border-top-left-radius: 18px; border-top-right-radius: 18px; padding: 1.2rem 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                    <span class="modal-title" style="font-size: 1.5rem; font-weight: 700;">تعديل بيانات المستخدم</span>
                    <button class="modal-close" onclick="closeEditUserModal()" style="font-size: 1.7rem; background: none; border: none; color: #fff; cursor: pointer;">&times;</button>
                </div>
                <form id="editUserForm" style="${isMobile ? 'padding:1rem;' : 'padding:2rem;'} display: grid; gap: 1.2rem; background: #fff; border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;">
                    <input type="hidden" name="phone" value="${user.phone}">
                    <div style="display: grid; grid-template-columns: ${isMobile ? '1fr' : '1fr 1fr'}; gap: 1.2rem;">
                        <label style="font-weight:600;">الاسم الكامل:<input type="text" name="fullName" value="${user.fullName || ''}" required class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">رقم الهاتف:<input type="text" name="phoneDisplay" value="${user.phone || ''}" disabled class="form-input" style="margin-top:6px;background:#f5f5f5;"></label>
                        <label style="font-weight:600;">القضاء:<input type="text" name="district" value="${user.district || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">الجنس:
                            <select name="gender" class="form-select" style="margin-top:6px;">
                                <option value="ذكر" ${user.gender==='ذكر'?'selected':''}>ذكر</option>
                                <option value="أنثى" ${user.gender==='أنثى'?'selected':''}>أنثى</option>
                            </select>
                        </label>
                        <label style="font-weight:600;">عدد الأفراد:<input type="number" name="individualCount" value="${user.individualCount || 1}" min="1" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">رقم المحطة:<input type="text" name="stationNumber" value="${user.stationNumber || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">المرشح:<input type="text" name="candidate" value="${user.candidate || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">المدرسة:<input type="text" name="school" value="${user.school || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">اسم الركيزة:<input type="text" name="parent" value="${user.parent || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">رقم الهوية الوطنية:<input type="text" name="nationalId" value="${user.nationalId || ''}" class="form-input" style="margin-top:6px;"></label>
                        <label style="font-weight:600;">صورة المستخدم:<br>
                            <input type="file" name="profileImgFile" accept="image/*" style="margin-top:6px;">
                            ${user.profileImg ? `<img src="${user.profileImg}" style="width:60px;height:60px;border-radius:8px;margin-top:8px;">` : ''}
                        </label>
                        <label style="font-weight:600;">صورة التصويت (أمامية):<br>
                            <input type="file" name="frontImgFile" accept="image/*" style="margin-top:6px;">
                            ${user.images && user.images.front ? `<img src="${user.images.front}" style="width:60px;height:60px;border-radius:8px;margin-top:8px;">` : ''}
                        </label>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                        <button type="submit" class="action-btn action-btn-edit" style="flex:1;background:var(--success-color);color:white;font-size:1.1rem;padding:0.8rem 0;border-radius:12px;${isMobile ? 'min-width:48px;max-width:100vw;' : ''}">حفظ التعديلات</button>
                        <button type="button" class="action-btn" onclick="closeEditUserModal()" style="flex:1;background:#f5f5f5;color:#333;font-size:1.1rem;padding:0.8rem 0;border-radius:12px;${isMobile ? 'min-width:48px;max-width:100vw;' : ''}">إلغاء</button>
                    </div>
                </form>
            </div>
        `;
    modal.classList.add('active');
        document.getElementById('editUserForm').onsubmit = async function(e) {
            e.preventDefault();
            const form = e.target;
            let updatedUser = {
                fullName: form.fullName.value,
                district: form.district.value,
                gender: form.gender.value,
                individualCount: parseInt(form.individualCount.value),
                stationNumber: form.stationNumber.value,
                candidate: form.candidate.value,
                school: form.school.value,
                parent: form.parent.value,
                nationalId: form.nationalId.value,
                updatedAt: new Date().toISOString()
            };
            // رفع صورة المستخدم
            const profileImgFile = form.profileImgFile.files[0];
            if (profileImgFile) {
                try {
                    const storageRef = firebase.storage().ref();
                    const imgRef = storageRef.child(`user-images/${user.phone}_profile_${Date.now()}`);
                    await imgRef.put(profileImgFile);
                    updatedUser.profileImg = await imgRef.getDownloadURL();
                } catch (err) {
                    alert('خطأ في رفع صورة المستخدم');
                }
            } else {
                updatedUser.profileImg = user.profileImg || '';
            }
            // رفع صورة التصويت الأمامية
            const frontImgFile = form.frontImgFile.files[0];
            if (frontImgFile) {
                try {
                    const storageRef = firebase.storage().ref();
                    const imgRef = storageRef.child(`user-images/${user.phone}_front_${Date.now()}`);
                    await imgRef.put(frontImgFile);
                    const frontUrl = await imgRef.getDownloadURL();
                    updatedUser.images = { front: frontUrl };
                } catch (err) {
                    alert('خطأ في رفع صورة التصويت');
                }
            } else {
                updatedUser.images = user.images || {};
            }
            database.ref('users/' + user.phone).update(updatedUser, function(error) {
                if (error) {
                    alert('حدث خطأ أثناء حفظ التعديلات');
                } else {
                    alert('تم حفظ التعديلات بنجاح');
                    closeEditUserModal();
                    loadData();
                }
            });
        };
}

window.closeEditUserModal = function() {
    const modal = document.getElementById('editUserModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(()=>{modal.remove();},300);
    }
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
    var message = 'مرحباً، نشكركم على تسجيلكم في ائتلاف أساس العراق. صوتكم اليوم مستقبلكم غداً! 🇮🇶';
    
    users.forEach(user => {
        let phoneNumber = user.phone;
        if (!phoneNumber.startsWith('964')) {
            phoneNumber = '964' + phoneNumber.replace(/^0+/, '');
        }
    var whatsappUrl = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');
    });
    
    selectedCards.clear();
    updateBulkActionsVisibility();
    updateUsersGrid();
}

// Notifications
function addNotification(notification) {
    // تحقق من الإشعارات الممسوحة
    let clearedNotifs = JSON.parse(localStorage.getItem('clearedNotifications') || '[]');
    // إذا كان الإشعار لنفس المستخدم ولنفس النوع وتم مسحه سابقاً، لا تضفه
    if (notification.user && clearedNotifs.some(n => n.user && n.user.phone === notification.user.phone && n.type === notification.type)) {
        return;
    }
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
        notificationList.innerHTML =
            '<div class="empty-state" style="padding: 2rem;">' +
                '<i class="fas fa-bell-slash"></i>' +
                '<div class="empty-state-title">لا توجد إشعارات</div>' +
                '<div class="empty-state-message">لا توجد إشعارات جديدة</div>' +
            '</div>';
        return;
    }
    
    notificationList.innerHTML = notifications.map(function(notif) {
        if (notif.user && notif.user.phone) {
            return '<div class="notification-item" onclick="viewUserDetails(\'' + notif.user.phone + '\')">' +
                '<div class="notification-item-header">' +
                    '<div class="notification-icon ' + (notif.type === 'new_user' ? 'new-user' : 'voted') + '">' +
                        '<i class="fas ' + (notif.type === 'new_user' ? 'fa-user-plus' : 'fa-check-circle') + '"></i>' +
                    '</div>' +
                    '<div class="notification-message">' + notif.message + '</div>' +
                '</div>' +
                '<div class="notification-time">' + getTimeAgo(notif.timestamp) + '</div>' +
            '</div>';
        } else {
            return '<div class="notification-item">' +
                '<div class="notification-item-header">' +
                    '<div class="notification-icon ' + (notif.type === 'new_user' ? 'new-user' : 'voted') + '">' +
                        '<i class="fas ' + (notif.type === 'new_user' ? 'fa-user-plus' : 'fa-check-circle') + '"></i>' +
                    '</div>' +
                    '<div class="notification-message">' + notif.message + '</div>' +
                '</div>' +
                '<div class="notification-time">' + getTimeAgo(notif.timestamp) + '</div>' +
            '</div>';
        }
    }).join('');
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'الآن';
    if (seconds < 3600) return 'منذ ' + Math.floor(seconds / 60) + ' دقيقة';
    if (seconds < 86400) return 'منذ ' + Math.floor(seconds / 3600) + ' ساعة';
    return 'منذ ' + Math.floor(seconds / 86400) + ' يوم';
}

function clearNotifications() {
    if (confirm('هل تريد مسح جميع الإشعارات؟')) {
        // حفظ الإشعارات الممسوحة في localStorage
        localStorage.setItem('clearedNotifications', JSON.stringify(notifications));
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
    const menu =
        '<div style="position: absolute; top: 60px; left: 20px; background: white; border-radius: 12px; box-shadow: var(--shadow-lg); padding: 1rem; min-width: 200px; z-index: 2000;">' +
            '<div style="padding: 0.75rem; cursor: pointer; border-radius: 8px; transition: var(--transition);" onmouseover="this.style.background=\'var(--bg-gradient-start)\'" onmouseout="this.style.background=\'\'" onclick="showPage(\'settings\')">' +
                '<i class="fas fa-cog"></i> الإعدادات' +
            '</div>' +
            '<div style="padding: 0.75rem; cursor: pointer; border-radius: 8px; transition: var(--transition);" onmouseover="this.style.background=\'var(--bg-gradient-start)\'" onmouseout="this.style.background=\'\'" onclick="logout()">' +
                '<i class="fas fa-sign-out-alt"></i> تسجيل الخروج' +
            '</div>' +
        '</div>';
    // This is a simple implementation - in production, you'd want a more robust menu system
}

function closeModal() {
    document.getElementById('userModal').classList.remove('active');
}

    // حذف المستخدم من قاعدة البيانات وحذف البطاقة من الواجهة
    function deleteUser(phone) {
        if (!phone) return;
        if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) return;
        // حذف من Firebase Realtime Database
        firebase.database().ref('users/' + phone).remove()
            .then(function() {
                // حذف البطاقة من الواجهة
                var card = document.querySelector('.user-card[data-phone="' + phone + '"]');
                if (card) card.remove();
                // إغلاق نافذة التفاصيل إذا كانت مفتوحة
                closeModal();
                // إشعار بالنجاح
                addNotification({
                    type: 'success',
                    message: 'تم حذف المستخدم بنجاح.'
                });
            })
            .catch(function(error) {
                addNotification({
                    type: 'error',
                    message: 'حدث خطأ أثناء حذف المستخدم: ' + error.message
                });
            });
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
    content.innerHTML =
        '<div class="users-container">' +
            '<h2 style="color: var(--primary-color); margin-bottom: 2rem;">' +
                '<i class="fas fa-users"></i> جميع المستخدمين' +
            '</h2>' +
            '<div class="users-grid" id="allUsersGrid"></div>' +
        '</div>';
    
    // Display all users
    const allUsersGrid = document.getElementById('allUsersGrid');
    allUsersGrid.innerHTML = document.getElementById('usersGrid').innerHTML;
}

function loadVotersPage() {
    const content = document.getElementById('votersContent');
    content.classList.add('active');
    
    const votedUsers = Object.values(filteredUsers).filter(u => u.images && u.images.front);
    
    content.innerHTML =
        '<div class="users-container">' +
            '<h2 style="color: var(--success-color); margin-bottom: 2rem;">' +
                '<i class="fas fa-check-circle"></i> المنتخبون (' + votedUsers.length + ')' +
            '</h2>' +
            '<div class="users-grid" id="votersGrid"></div>' +
        '</div>';
    
    const votersGrid = document.getElementById('votersGrid');
    
    if (votedUsers.length === 0) {
        votersGrid.innerHTML =
            '<div class="empty-state">' +
                '<i class="fas fa-vote-yea"></i>' +
                '<div class="empty-state-title">لا يوجد منتخبون</div>' +
                '<div class="empty-state-message">لم يقم أي مستخدم بالتصويت بعد</div>' +
            '</div>';
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
    
    var candidateStatsHtml = '';
    var BASE_USERS = 5000;
    Object.values(candidatesData).forEach(function(candidate) {
        var count = users.filter(function(u) {
            return (u.candidateId === candidate.id) || (u.candidate && u.candidate === candidate.name);
        }).length;
        var percentage = count > 0 ? ((count / BASE_USERS) * 100).toFixed(2) : '0.00';
        candidateStatsHtml += '<div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
                '<div style="font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">' + candidate.name + '</div>' +
                '<div style="color: var(--text-light); font-size: 0.9rem;">عدد المستخدمين: ' + count + '</div>' +
            '</div>' +
            '<div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">' + percentage + '%</div>' +
        '</div>';
    });

    var districtStatsHtml = '';
    DISTRICTS.forEach(function(district) {
        var count = users.filter(function(u) { return u.district === district; }).length;
        var percentage = count > 0 ? ((count / BASE_USERS) * 100).toFixed(2) : '0.00';
        districtStatsHtml += '<div style="background: var(--bg-gradient-start); padding: 1.5rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
                '<div style="font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">' + district + '</div>' +
                '<div style="color: var(--text-light); font-size: 0.9rem;">عدد المستخدمين: ' + count + '</div>' +
            '</div>' +
            '<div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">' + percentage + '%</div>' +
        '</div>';
    });

    content.innerHTML =
        '<div style="display: grid; gap: 2rem;">' +
            '<div class="settings-section">' +
                '<h2 class="settings-title">' +
                    '<i class="fas fa-chart-bar"></i> تقارير وتحليلات شاملة' +
                '</h2>' +
                '<div class="stats-grid" style="margin-bottom: 2rem;">' +
                    '<div class="stat-card">' +
                        '<div class="stat-icon">👥</div>' +
                        '<div class="stat-title">إجمالي المستخدمين</div>' +
                        '<div class="stat-value">' + stats.totalUsers + '</div>' +
                    '</div>' +
                    '<div class="stat-card">' +
                        '<div class="stat-icon">✅</div>' +
                        '<div class="stat-title">تم الانتخاب</div>' +
                        '<div class="stat-value">' + stats.voted + '</div>' +
                    '</div>' +
                    '<div class="stat-card">' +
                        '<div class="stat-icon">⏳</div>' +
                        '<div class="stat-title">لم ينتخب</div>' +
                        '<div class="stat-value">' + stats.notVoted + '</div>' +
                    '</div>' +
                    '<div class="stat-card">' +
                        '<div class="stat-icon">📊</div>' +
                        '<div class="stat-title">نسبة الانتخاب</div>' +
                        '<div class="stat-value">' + (stats.totalUsers > 0 ? Math.round((stats.voted / stats.totalUsers) * 100) : 0) + '%</div>' +
                    '</div>' +
                '</div>' +
                '<h3 style="color: var(--primary-color); margin: 2rem 0 1rem;">التوزيع حسب المرشح</h3>' +
                '<div style="display: grid; gap: 1rem;">' + candidateStatsHtml + '</div>' +
                '<h3 style="color: var(--primary-color); margin: 2rem 0 1rem;">التوزيع حسب القضاء</h3>' +
                '<div style="display: grid; gap: 1rem;">' + districtStatsHtml + '</div>' +
            '</div>' +
        '</div>';
}

function loadSettingsPage() {
    const content = document.getElementById('settingsContent');
    content.classList.add('active');
    
    content.innerHTML =
        '<div style="display: grid; gap: 2rem;">' +
            '<div class="settings-section">' +
                '<h2 class="settings-title">' +
                    '<i class="fas fa-user-tie"></i> إدارة المرشحين' +
                '</h2>' +
                '<div class="candidate-list" id="candidateList"></div>' +
            '</div>' +
            '<div class="settings-section">' +
                '<h2 class="settings-title">' +
                    '<i class="fas fa-database"></i> إدارة البيانات' +
                '</h2>' +
                '<div style="display: grid; gap: 1rem;">' +
                    '<button class="filter-btn filter-btn-apply" onclick="exportData()" style="width: 100%;">' +
                        '<i class="fas fa-download"></i> تصدير البيانات' +
                    '</button>' +
                    '<button class="filter-btn filter-btn-reset" onclick="backupData()" style="width: 100%;">' +
                        '<i class="fas fa-cloud-upload-alt"></i> نسخ احتياطي' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    
    loadCandidateList();
}

function loadCandidateList() {
    const candidateList = document.getElementById('candidateList');
    if (!candidateList) return;
    
    candidateList.innerHTML = Object.values(candidatesData).map(function(candidate) {
        return '<div class="candidate-card">' +
            '<div class="candidate-info">' +
                '<div class="candidate-avatar">' + candidate.name.charAt(0) + '</div>' +
                '<div class="candidate-details">' +
                    '<h4>' + candidate.name + '</h4>' +
                    '<p>الرمز: ' + candidate.password + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="candidate-actions">' +
                '<button class="icon-btn icon-btn-edit" onclick="editCandidate(\'' + candidate.id + '\')" title="تعديل">' +
                    '<i class="fas fa-edit"></i>' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

function editCandidate(candidateId) {
    const candidate = candidatesData[candidateId];
    if (!candidate) return;
    
    const newPassword = prompt('أدخل الرمز السري الجديد للمرشح: ' + candidate.name, candidate.password);
    if (!newPassword) return;
    
    database.ref('candidates/' + candidateId + '/password').set(newPassword)
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
    link.download = "asas-iraq-backup-" + Date.now() + ".json";
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
