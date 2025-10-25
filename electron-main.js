const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        title: 'لوحة التحكم - ائتلاف أساس العراق',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        },
        backgroundColor: '#f0f9f9',
        show: false, // Don't show until ready
        autoHideMenuBar: false
    });

    // Load the app
    mainWindow.loadFile('admin-dashboard.html');

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Create custom menu
    const menuTemplate = [
        {
            label: 'ملف',
            submenu: [
                {
                    label: 'تحديث',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                {
                    label: 'نسخة احتياطية',
                    click: async () => {
                        const result = await dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'نسخة احتياطية',
                            message: 'سيتم إنشاء نسخة احتياطية من البيانات',
                            buttons: ['موافق', 'إلغاء']
                        });
                        if (result.response === 0) {
                            mainWindow.webContents.send('backup-data');
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'خروج',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'عرض',
            submenu: [
                {
                    label: 'ملء الشاشة',
                    accelerator: 'F11',
                    click: () => {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                },
                {
                    label: 'تكبير',
                    accelerator: 'CmdOrCtrl+Plus',
                    click: () => {
                        const currentZoom = mainWindow.webContents.getZoomLevel();
                        mainWindow.webContents.setZoomLevel(currentZoom + 1);
                    }
                },
                {
                    label: 'تصغير',
                    accelerator: 'CmdOrCtrl+-',
                    click: () => {
                        const currentZoom = mainWindow.webContents.getZoomLevel();
                        mainWindow.webContents.setZoomLevel(currentZoom - 1);
                    }
                },
                {
                    label: 'الحجم الطبيعي',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => {
                        mainWindow.webContents.setZoomLevel(0);
                    }
                },
                { type: 'separator' },
                {
                    label: 'أدوات المطور',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                }
            ]
        },
        {
            label: 'نافذة',
            submenu: [
                {
                    label: 'تصغير',
                    accelerator: 'CmdOrCtrl+M',
                    click: () => {
                        mainWindow.minimize();
                    }
                },
                {
                    label: 'إغلاق',
                    accelerator: 'CmdOrCtrl+W',
                    click: () => {
                        mainWindow.close();
                    }
                }
            ]
        },
        {
            label: 'مساعدة',
            submenu: [
                {
                    label: 'حول التطبيق',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'حول التطبيق',
                            message: 'لوحة التحكم - ائتلاف أساس العراق',
                            detail: 'الإصدار: 1.0.0\n\nتطبيق إداري لإدارة بيانات الناخبين\n\nصوتك اليوم مستقبلك غداً',
                            buttons: ['موافق']
                        });
                    }
                },
                {
                    label: 'التحديثات',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'التحديثات',
                            message: 'أنت تستخدم أحدث إصدار',
                            buttons: ['موافق']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Handle window events
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Prevent navigation
    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url !== mainWindow.webContents.getURL()) {
            event.preventDefault();
        }
    });
}

// App events
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    dialog.showErrorBox('خطأ', 'حدث خطأ غير متوقع: ' + error.message);
});
