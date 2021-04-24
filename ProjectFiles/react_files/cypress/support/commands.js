// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add cypress-firebase commands.
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
    apiKey: "AIzaSyD06iZQiikFSbQ2cuQ3fKbtBVWvHQz0w7k",
    authDomain: "fairshare-48f9f.firebaseapp.com",
    projectId: "fairshare-48f9f",
    storageBucket: "fairshare-48f9f.appspot.com",
    messagingSenderId: "1097496332317",
    appId: "1:1097496332317:web:7c6de0506d954ddf961ef4",
    measurementId: "G-EQK1GXWT16",
};
firebase.initializeApp(fbConfig);
firebase.firestore().settings({ experimentalAutoDetectLongPolling: true });

attachCustomCommands({ Cypress, cy, firebase });
