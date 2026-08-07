/**
 * TypeMaster - Admin Role Promotion Tool
 * 
 * Usage:
 *   node scripts/set-admin-role.js <USER_UID_OR_EMAIL>
 * 
 * Example:
 *   node scripts/set-admin-role.js admin@typebangla.com
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

async function setAdminRole(targetIdentifier) {
  if (!targetIdentifier) {
    console.error('❌ Error: Please specify a user UID or Email address.');
    console.log('Usage: node scripts/set-admin-role.js <email_or_uid>');
    process.exit(1);
  }

  console.log(`🔍 Searching for user matching: "${targetIdentifier}"...`);
  
  // Note: For client-side Firestore without service account key,
  // edit the document directly in Firebase Console > Firestore > users > {uid} > role = "admin"
  console.log('\n==========================================================');
  console.log('📌 HOW TO SET ADMIN ROLE IN FIREBASE CONSOLE (RECOMMENDED):');
  console.log('==========================================================');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Select project: "studio-4489913213-ea5ac"');
  console.log('3. Open: Firestore Database > "users" collection');
  console.log(`4. Find document for user (${targetIdentifier})`);
  console.log('5. Change field "role": "student"  -->  "admin"');
  console.log('6. Save and refresh the app!');
  console.log('==========================================================\n');
}

setAdminRole(process.argv[2]);
