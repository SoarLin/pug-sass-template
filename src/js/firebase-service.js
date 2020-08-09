const config = {
    apiKey: "AIzaSyDD2wSjfDUE9LYzeR2i7FwMd_T8ffc2RDk",
    authDomain: "check-phone-num.firebaseapp.com",
    databaseURL: "https://check-phone-num.firebaseio.com",
    projectId: "check-phone-num",
    storageBucket: "check-phone-num.appspot.com",
    // messagingSenderId: "1003756892648",
    appId: "1:1003756892648:web:3efb7d95c89f39110a745d",
    measurementId: "G-KDSPGGJWDM"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const db = firebase.firestore();
console.log(db);

var phone = '0910387918'
db.collection('phones').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
