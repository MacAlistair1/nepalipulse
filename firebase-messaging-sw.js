importScripts(
  "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js"
);

// Initialize Firebase in the Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyA6MLysJC5RFQ5IVXDxiBxakqqjI6iQGi8",
  authDomain: "nepali-pulse.firebaseapp.com",
  projectId: "nepali-pulse",
  storageBucket: "nepali-pulse.appspot.com",
  messagingSenderId: "339661154711",
  appId: "1:339661154711:web:a0749fcc2058080f9c7cd2",
  measurementId: "G-TRHV540C25",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
