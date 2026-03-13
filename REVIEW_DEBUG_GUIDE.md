# 🔧 Review Submission Debugging Guide

## 🚨 Issue: "Submit Failed" Error

If you're getting a "submit failed" error when trying to submit a review, here's how to debug it:

## 📋 Debugging Steps

### 1. Check Browser Console
1. **Open Developer Tools**: Press F12 or Ctrl+Shift+I
2. **Go to Console tab**
3. **Clear the console** and try submitting a review
4. **Look for error messages** in red text

### 2. Common Error Messages & Solutions

#### 🔒 Permission Denied Error
```
Error: permission-denied
```
**Solution**: 
- Check Firebase Firestore security rules
- Ensure reviews collection allows write access

#### 🌐 Network Error
```
Error: unavailable or network-error
```
**Solution**:
- Check internet connection
- Verify Firebase project is active
- Check if Firestore is enabled

#### 📊 Index Error
```
Error: The query requires an index
```
**Solution**:
- Click the error link to create index in Firebase Console
- Or manually create indexes as shown in FIRESTORE_INDEXES.md

#### ⚡ Quota Exceeded
```
Error: resource-exhausted
```
**Solution**:
- Check Firebase usage limits
- Upgrade Firebase plan if needed

### 3. Firebase Console Checks

#### ✅ Verify Project Settings
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `harvest-store-8d206`
3. Check if Firestore Database is enabled
4. Verify project is not in test mode

#### ✅ Check Firestore Rules
1. Go to Firestore Database → Rules
2. Ensure rules allow writing to reviews collection:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{docId} {
      allow create: if request.auth != null || true; // Allow anyone to create reviews
      allow read: if true; // Allow anyone to read approved reviews
    }
  }
}
```

#### ✅ Check Indexes
1. Go to Firestore Database → Indexes
2. Ensure reviews collection has these indexes:
   - `createdAt` (DESC)
   - `status` (ASC)
   - `rating` (DESC)

### 4. Test with Simple Data

Try submitting a review with minimal data:
- **Name**: "Test User"
- **Rating**: 5 stars
- **Comment**: "Test review"
- **Email**: Leave empty

### 5. Check Network Tab
1. **Open Developer Tools** → Network tab
2. **Submit a review** and watch for failed requests
3. **Check the request URL** and response status

### 6. Firebase Configuration Check

Ensure your `firebase.js` has correct configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDM1RaDHtQ2BD-2qrpN5Q1bwJVAHcGspDg",
  authDomain: "harvest-store-8d206.firebaseapp.com",
  projectId: "harvest-store-8d206",
  // ... rest of config
};
```

## 🛠️ Quick Fix Solutions

### Solution 1: Update Firestore Rules
Add this to your Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{docId} {
      allow create: if true; // Temporarily allow anyone to create reviews
      allow read: if true;   // Allow anyone to read reviews
    }
  }
}
```

### Solution 2: Create Missing Indexes
1. Go to Firebase Console → Firestore Database → Indexes
2. Click "Add Index"
3. Collection: `reviews`
4. Fields: `createdAt` (Descending), `status` (Ascending)
5. Click Create

### Solution 3: Test with Browser Incognito
1. **Open incognito window**
2. **Try submitting review**
3. **If it works**, clear browser cache and cookies

## 📞 Still Having Issues?

If none of these solutions work:

1. **Check the console** for specific error messages
2. **Verify Firebase project status** is active
3. **Contact Firebase support** if there are service issues
4. **Check if Firestore is enabled** in your project

## 🔍 What the Debug Logs Show

The review system now has detailed logging. Look for these messages in console:

```
Review submission started: {name: "...", rating: 5, comment: "..."}
Submitting review to Firebase...
Review data: {name: "...", rating: 5, comment: "...", status: "pending", createdAt: "..."}
Review service: Starting review submission...
Review service: Document created with ID: "..."
Review submitted successfully!
```

If you see errors instead of success messages, the error details will help identify the exact issue.

---

**Try these steps in order. Most review submission issues are caused by Firestore rules or missing indexes.**
