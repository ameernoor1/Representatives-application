# 🚀 دليل البدء السريع

## خطوات التشغيل السريعة

### 1. إعداد Firebase

**مهم جداً**: يجب إعداد Firebase قبل تشغيل التطبيق!

1. افتح ملف `app.js`
2. ابحث عن `firebaseConfig`
3. ضع بيانات مشروع Firebase الخاص بك:

```javascript
const firebaseConfig = {
    apiKey: "ضع_مفتاح_API_هنا",
    authDomain: "messageemeapp.firebaseapp.com",
    databaseURL: "https://messageemeapp-default-rtdb.firebaseio.com",
    projectId: "messageemeapp",
    storageBucket: "messageemeapp.appspot.com",
    messagingSenderId: "رقم_المرسل",
    appId: "معرف_التطبيق"
};
```

4. افعل نفس الشيء في ملف `settings.js`

### 2. رفع البيانات إلى Firebase

1. اذهب إلى Firebase Console
2. اختر Realtime Database
3. استورد البيانات من ملف JSON الذي يحتوي على المستخدمين

### 3. تشغيل التطبيق

#### أ) تشغيل كتطبيق ويب:

```bash
# استخدم أي خادم محلي، مثل:
npx serve .

# أو
python -m http.server 8000

# ثم افتح المتصفح على:
# http://localhost:8000/admin-dashboard.html
```

#### ب) تشغيل كتطبيق Electron (سطح المكتب):

```bash
# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm start
```

### 4. تسجيل الدخول

**حساب المدير الافتراضي:**
- المستخدم: مدير النظام (Admin)
- الرمز السري: `admin123`

**⚠️ مهم: غيّر كلمة المرور في ملف app.js قبل الاستخدام الفعلي!**

## ⚡ نصائح مهمة

1. **الأمان**:
   - غيّر كلمة مرور Admin فوراً
   - استخدم HTTPS في الإنتاج
   - فعّل قواعد الأمان في Firebase

2. **النسخ الاحتياطي**:
   - اعمل نسخة احتياطية دورية
   - استخدم صفحة الإعدادات للنسخ

3. **الأداء**:
   - التطبيق يعمل بدون إنترنت (بعد أول زيارة)
   - البيانات تُحفظ محلياً وتتزامن مع Firebase

## 📋 الملفات المهمة

- `admin-dashboard.html` - الصفحة الرئيسية
- `app.js` - منطق التطبيق الرئيسي
- `settings.html` - صفحة الإعدادات
- `settings.js` - منطق الإعدادات
- `electron-main.js` - تطبيق Electron
- `manifest-admin.json` - إعدادات PWA
- `service-worker-admin.js` - Service Worker

## 🎯 المميزات الأساسية

✅ إحصائيات شاملة ومباشرة
✅ فلاتر متقدمة
✅ بحث شامل
✅ إدارة المستخدمين
✅ التواصل عبر واتساب
✅ نظام الإشعارات
✅ النسخ الاحتياطي
✅ متوافق مع جميع الأجهزة

## 🐛 حل المشاكل

**المشكلة**: لا تظهر البيانات
- **الحل**: تأكد من إعدادات Firebase وأن البيانات موجودة

**المشكلة**: لا يمكن تسجيل الدخول
- **الحل**: تأكد من كلمة المرور في `app.js`

**المشكلة**: الصور لا تظهر
- **الحل**: تأكد من صلاحيات Firebase Storage

## 📞 المساعدة

اقرأ ملف `README.md` للتفاصيل الكاملة

---

**ائتلاف أساس العراق - صوتك اليوم مستقبلك غداً** 🇮🇶
