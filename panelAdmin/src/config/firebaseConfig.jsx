// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Configuración correcta
const firebaseConfig = {
  apiKey: "AIzaSyDE_TRUSuS8YecLJI0ttlovjchMjPN2cDY",
  authDomain: "app-khyra-educativa.firebaseapp.com",
  projectId: "app-khyra-educativa",
  storageBucket: "app-khyra-educativa.firebasestorage.app", // CORREGIDO
  messagingSenderId: "178909647293",
  appId: "1:178909647293:web:02ed958e383b12aff902d4",
  measurementId: "G-SLQ0M4037J"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta Storage
export const storage = getStorage(app);
