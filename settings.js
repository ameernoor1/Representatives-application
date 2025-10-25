// Firebase Configuration (same as app.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "messageemeapp.firebaseapp.com",
    databaseURL: "https://messageemeapp-default-rtdb.firebaseio.com",
    projectId: "messageemeapp",
    storageBucket: "messageemeapp.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Global variables
let admins = JSON.parse(localStorage.getItem('admins')) || [
    {
        id: '1',
        name: 'المدير العام',
        username: 'admin',
        role: 'admin',
        createdAt: Date.now()
    }
];

// Load Admins
function loadAdmins() {
    const adminList = document.getElementById('adminList');
    
    if (admins.length === 0) {
        adminList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">لا يوجد مدراء</p>';
        return;
    }
    
    adminList.innerHTML = admins.map(admin => `
        <div class="admin-card">
            <div class="admin-info">
                <div class="admin-avatar">${admin.name.charAt(0)}</div>
                <div class="admin-details">
                    <div class="admin-name">${admin.name}</div>
                    <div class="admin-role">${getRoleText(admin.role)} - @${admin.username}</div>
                </div>
            </div>
            <div class="admin-actions">
                <button class="icon-btn icon-btn-edit" onclick="editAdmin('${admin.id}')" title="تعديل">
                    ✏️
                </button>
                ${admin.id !== '1' ? `
                    <button class="icon-btn icon-btn-delete" onclick="deleteAdmin('${admin.id}')" title="حذف">
                        🗑️
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function getRoleText(role) {
    const roles = {
        'admin': 'مدير كامل',
        'manager': 'مدير محدود',
        'viewer': 'عرض فقط'
    };
    return roles[role] || role;
}

// Export to Device
function exportToDevice() {
    showProgress(true);
    
    database.ref('users').once('value')
        .then(snapshot => {
            const data = {
                users: snapshot.val() || {},
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `backup-asas-iraq-${Date.now()}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم التصدير بنجاح!');
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في التصدير: ' + error.message);
        });
}

// Import from Device
function importFromDevice(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!confirm('⚠️ سيتم استبدال جميع البيانات الحالية. هل تريد المتابعة؟')) {
        event.target.value = '';
        return;
    }
    
    showProgress(true);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!data.users) {
                throw new Error('ملف غير صالح');
            }
            
            // Upload to Firebase
            database.ref('users').set(data.users)
                .then(() => {
                    updateProgress(100);
                    setTimeout(() => {
                        showProgress(false);
                        alert('✅ تم الاستيراد بنجاح!');
                        location.reload();
                    }, 500);
                })
                .catch(error => {
                    showProgress(false);
                    alert('❌ خطأ في رفع البيانات: ' + error.message);
                });
        } catch (error) {
            showProgress(false);
            alert('❌ خطأ في قراءة الملف: ' + error.message);
        }
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

// Backup to Firebase
function backupToFirebase() {
    if (!confirm('هل تريد إنشاء نسخة احتياطية في Firebase؟')) return;
    
    showProgress(true);
    
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
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم إنشاء النسخة الاحتياطية بنجاح!');
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في النسخ الاحتياطي: ' + error.message);
        });
}

// Restore from Firebase
function restoreFromFirebase() {
    if (!confirm('⚠️ سيتم استبدال جميع البيانات بآخر نسخة احتياطية. هل تريد المتابعة؟')) return;
    
    showProgress(true);
    
    database.ref('backups').orderByChild('timestamp').limitToLast(1).once('value')
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('لا توجد نسخ احتياطية');
            }
            
            let latestBackup = null;
            snapshot.forEach(child => {
                latestBackup = child.val();
            });
            
            if (!latestBackup || !latestBackup.data) {
                throw new Error('نسخة احتياطية غير صالحة');
            }
            
            return database.ref('users').set(latestBackup.data);
        })
        .then(() => {
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم الاستعادة بنجاح!');
                location.reload();
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في الاستعادة: ' + error.message);
        });
}

// Sync to Firebase
function syncToFirebase() {
    if (!confirm('هل تريد رفع البيانات إلى Firebase؟')) return;
    
    showProgress(true);
    
    database.ref('users').once('value')
        .then(snapshot => {
            const data = snapshot.val() || {};
            return database.ref('users').update(data);
        })
        .then(() => {
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم الرفع بنجاح!');
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في الرفع: ' + error.message);
        });
}

// Sync from Firebase
function syncFromFirebase() {
    if (!confirm('هل تريد تحديث البيانات من Firebase؟')) return;
    
    showProgress(true);
    
    database.ref('users').once('value')
        .then(snapshot => {
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم التحديث بنجاح!');
                location.reload();
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في التحديث: ' + error.message);
        });
}

// Factory Reset
function factoryReset() {
    const confirmation = prompt('⚠️ تحذير: سيتم حذف جميع البيانات!\n\nاكتب "حذف" للتأكيد:');
    
    if (confirmation !== 'حذف') {
        alert('تم الإلغاء');
        return;
    }
    
    if (!confirm('هل أنت متأكد 100%؟ هذا الإجراء لا يمكن التراجع عنه!')) return;
    
    showProgress(true);
    
    database.ref('users').remove()
        .then(() => {
            localStorage.clear();
            updateProgress(100);
            setTimeout(() => {
                showProgress(false);
                alert('✅ تم إعادة ضبط المصنع بنجاح!');
                location.reload();
            }, 500);
        })
        .catch(error => {
            showProgress(false);
            alert('❌ خطأ في إعادة الضبط: ' + error.message);
        });
}

// Progress Bar Functions
function showProgress(show) {
    const progressBar = document.getElementById('progressBar');
    if (show) {
        progressBar.classList.add('active');
        updateProgress(0);
    } else {
        progressBar.classList.remove('active');
    }
}

function updateProgress(percent) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';
}

// Admin Management
function showAddAdminModal() {
    document.getElementById('addAdminModal').classList.add('active');
}

function closeAddAdminModal() {
    document.getElementById('addAdminModal').classList.remove('active');
    document.getElementById('addAdminForm').reset();
}

document.getElementById('addAdminForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('adminName').value;
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const role = document.getElementById('adminRole').value;
    
    // Check if username already exists
    if (admins.some(admin => admin.username === username)) {
        alert('❌ اسم المستخدم موجود مسبقاً');
        return;
    }
    
    const newAdmin = {
        id: Date.now().toString(),
        name: name,
        username: username,
        password: password, // في الإنتاج يجب تشفير كلمة المرور
        role: role,
        createdAt: Date.now()
    };
    
    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));
    
    closeAddAdminModal();
    loadAdmins();
    alert('✅ تم إضافة المدير بنجاح!');
});

function editAdmin(id) {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;
    
    const newName = prompt('الاسم الجديد:', admin.name);
    if (!newName) return;
    
    const newRole = prompt('الصلاحية (admin/manager/viewer):', admin.role);
    if (!newRole) return;
    
    admin.name = newName;
    admin.role = newRole;
    
    localStorage.setItem('admins', JSON.stringify(admins));
    loadAdmins();
    alert('✅ تم التحديث بنجاح!');
}

function deleteAdmin(id) {
    if (!confirm('هل تريد حذف هذا المدير؟')) return;
    
    admins = admins.filter(admin => admin.id !== id);
    localStorage.setItem('admins', JSON.stringify(admins));
    loadAdmins();
    alert('✅ تم الحذف بنجاح!');
}

// Save Settings
function saveSettings() {
    const settings = {
        notifyNewUsers: document.getElementById('notifyNewUsers').checked,
        notifyVotes: document.getElementById('notifyVotes').checked
    };
    
    localStorage.setItem('appSettings', JSON.stringify(settings));
}

// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    
    if (settings.notifyNewUsers !== undefined) {
        document.getElementById('notifyNewUsers').checked = settings.notifyNewUsers;
    }
    if (settings.notifyVotes !== undefined) {
        document.getElementById('notifyVotes').checked = settings.notifyVotes;
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    loadAdmins();
    loadSettings();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addAdminModal');
    if (event.target === modal) {
        closeAddAdminModal();
    }
}
