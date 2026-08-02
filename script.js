// Firebase-এর মডিউলগুলো ইম্পোর্ট করা হচ্ছে
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// তোমার দেওয়া সঠিক ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDDy7xLO6WhCXFt8bPAU9AYFYtVoVw8t9k",
  authDomain: "ed-tech-c6b5a.firebaseapp.com",
  projectId: "ed-tech-c6b5a",
  storageBucket: "ed-tech-c6b5a.firebasestorage.app",
  messagingSenderId: "176482715149",
  appId: "1:176482715149:web:8fce7c5fe4fcbe4edff744"
};

// ফায়ারবেস চালু করা হচ্ছে
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ==========================================
// ১. Google Login Code
// ==========================================
document.getElementById('googleLoginBtn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            alert("Login Failed: " + error.message);
        });
});

// ==========================================
// ২. Email & Password Login Code (Razorpay Testing)
// ==========================================
document.getElementById('emailLoginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert("Please enter both Email and Password!");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login Successful
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error signing in with email:", error);
            alert("Invalid Email or Password! Please try again.");
        });
});

// ==========================================
// ৩. Security Features (Right Click & Shortcuts Block)
// ==========================================
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right click is disabled to protect content privacy!');
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        alert('Copying content is strictly prohibited!');
    }
    if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText(''); 
        alert('Screenshots are not allowed on this platform!');
    }
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});
