import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASGf3xaQKOEsMZaYET96y4yh0GISoI4pk",
  authDomain: "uber4things.firebaseapp.com",
  databaseURL: "https://uberd4things.firebaseio.com",
  projectId: "uber4things",
  storageBucket: "uber4things.appspot.com",
  messagingSenderId: "269078947820",
  appld: "1:269078947820:web:e78318cd4e8fb44354c2c9",
  measurementId: "G-LW7HN2YY44",
};

// Initialize Firebase
 export const appFirebase = initializeApp(firebaseConfig);

