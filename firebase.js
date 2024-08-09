const firebaseConfig = {
  apiKey: "AIzaSyA6MLysJC5RFQ5IVXDxiBxakqqjI6iQGi8",
  authDomain: "nepali-pulse.firebaseapp.com",
  projectId: "nepali-pulse",
  storageBucket: "nepali-pulse.appspot.com",
  messagingSenderId: "339661154711",
  appId: "1:339661154711:web:a0749fcc2058080f9c7cd2",
  measurementId: "G-TRHV540C25",
};

// Ensure Firebase SDK is loaded
console.log("Checking Firebase SDK...");
if (typeof firebase !== "undefined") {
  console.log("Firebase SDK loaded successfully");
} else {
  console.error("Firebase SDK is not loaded");
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized");

// Initialize Firebase Messaging
try {
  const messaging = firebase.messaging();
  console.log("Firebase Messaging initialized");
} catch (error) {
  console.error("Error initializing Firebase Messaging:", error);
}

// Request permission for notifications (for browsers, permission is typically handled via the Notification API)
Notification.requestPermission()
  .then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Get FCM token
      messaging
        .getToken({ vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
        .then((token) => {
          console.log("FCM Registration Token:", token);
        })
        .catch((error) => {
          console.error("Error getting FCM token:", error);
        });
    } else {
      console.error("Notification permission denied.");
    }
  })
  .catch((error) => {
    console.error("Error requesting notification permission:", error);
  });

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log("Message received:", payload);
  // Customize notification here if needed
});
