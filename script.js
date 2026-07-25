// Firebase-এর মডিউলগুলো ইম্পোর্ট করা হচ্ছে
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
            const user = result.user;
           // alert("Login Successful! Welcome, " + user.displayName);
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            alert("Login Failed: " + error.message);
        });
});

// ==========================================
// ২. Phone OTP Login Code (নতুন যোগ করা হলো)
// ==========================================

// reCAPTCHA সেটআপ (মানুষ নাকি রোবট যাচাই করার জন্য)
auth.useDeviceLanguage();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA সলভ হলে এই অংশটি কাজ করবে
    console.log("reCAPTCHA Solved!");
  }
});

// Send OTP বাটনের কাজ
document.getElementById('sendOtpBtn').addEventListener('click', () => {
    let phoneNumber = document.getElementById('phoneNumber').value.trim();
    const appVerifier = window.recaptchaVerifier;

    // যদি নম্বরের শুরুতে '+' না থাকে, তবে অটোমেটিক '+91' যোগ করে নেওয়া
    if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+91' + phoneNumber;
    }

    // ফোন নম্বরের দৈর্ঘ্য ঠিক আছে কি না চেক করা
    if (phoneNumber.length < 13) { // +91 সহ মোট ১৩ ডিজিট হওয়া উচিত
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    // OTP পাঠানোর রিকোয়েস্ট
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP sent successfully! Please check your mobile.");
            
            document.getElementById('phoneInputContainer').style.display = 'none';
            document.getElementById('otpInputContainer').style.display = 'block';
        }).catch((error) => {
            console.error("Error sending OTP:", error);
            alert("Error sending OTP: " + error.message);
            window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
            });
        });
});

// Verify OTP বাটনের কাজ
document.getElementById('verifyOtpBtn').addEventListener('click', () => {
    const code = document.getElementById('otpCode').value;

    if (code.length === 0) {
        alert("Please enter the 6-digit OTP!");
        return;
    }

    // OTP মেলানো হচ্ছে
    confirmationResult.confirm(code).then((result) => {
        alert("Phone Login Successful!");
        window.location.href = "dashboard.html"; // সফল হলে ড্যাশবোর্ডে যাবে
    }).catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP! Please try again.");
    });
});




    // ১. মাউসের রাইট ক্লিক ডিজাবেল করা
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Right click is disabled to protect content privacy!');
    });

    // ২. কিবোর্ড শর্টকাট (Ctrl+C, Ctrl+U, Print Screen ইত্যাদি) ব্লক করা
    document.addEventListener('keydown', function(e) {
        // Ctrl+C (Copy), Ctrl+U (View Source), Ctrl+S (Save), F12 (Inspect) ব্লক করা
        if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
            e.preventDefault();
            alert('Copying content is strictly prohibited!');
        }
        // Print Screen বা স্ক্রিনশট কি ব্লক করা
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            navigator.clipboard.writeText(''); // ক্লিপবোর্ড ক্লিয়ার করে দেওয়া
            alert('Screenshots are not allowed on this platform!');
        }
    });

    // ৩. টেক্সট সিলেক্ট করা বা ড্র্যাগ করা বন্ধ করা
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

  