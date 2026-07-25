// ফায়ারবেসের সার্ভিসগুলো ইম্পোর্ট করা হচ্ছে
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

// তোমার ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyDDy7xLO6WhCXFt8bPAU9AYFYtVoVw8t9k",
    authDomain: "ed-tech-c6b5a.firebaseapp.com",
    projectId: "ed-tech-c6b5a",
    storageBucket: "ed-tech-c6b5a.firebasestorage.app",
    messagingSenderId: "176482715149",
    appId: "1:176482715149:web:8fce7c5fe4fcbe4edff744"
};

// অ্যাপ ইনিশিয়ালাইজ করা
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ব্যাকগ্রাউন্ডে নোটিফিকেশন রিসিভ করার কোড
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png' // এখানে তোমার লোগোর লিংক দিতে পারো
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});