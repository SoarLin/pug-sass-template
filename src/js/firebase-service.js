import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

import dayjs from 'dayjs';

class DBHelper {
  constructor(collectionName = null) {
    this.DB = null;
		this.CollectionName = (collectionName !== null) ? collectionName : 'phones';
    const config = {
      apiKey: 'AIzaSyDD2wSjfDUE9LYzeR2i7FwMd_T8ffc2RDk',
      authDomain: 'check-phone-num.firebaseapp.com',
      databaseURL: 'https://check-phone-num.firebaseio.com',
      projectId: 'check-phone-num',
      storageBucket: 'check-phone-num.appspot.com',
      // messagingSenderId: "1003756892648",
      appId: '1:1003756892648:web:3efb7d95c89f39110a745d',
      measurementId: 'G-KDSPGGJWDM'
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
		}
		this.DB = firebase.firestore();
  }

  checkPhoneNumber(phone) {
    return new Promise((resolve, reject) => {
      this.DB.collection('phones')
        .doc(phone)
        .get()
        .then((doc) => {
          resolve(doc.exists);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllPhones() {
    return new Promise((resolve, reject) => {
      let allPhone = {};
      this.DB.collection('phones')
        .get()
        .then((query) => {
          query.forEach((doc) => {
						let phone = doc.id
						let data = doc.data()
						allPhone[phone] = data;
					});
					resolve(allPhone);
				})
				.catch(err => reject(err))
    });
  }
}

export default DBHelper;

// var phone = '0910387919';
// const phoneCollections = DB.collection('phones').get();
// const phoneRef = DB.collection('phones').doc(phone);

// phoneRef.get().then((doc) => {
//   if (doc.exists === false) {
//     console.log('Can not find this phone number');
//   }
// });

// phoneCollections.then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     const today = dayjs(dayjs().format('YYYY-MM-DD')).unix();
//     const latest_date = dayjs(doc.data().latest_date).unix();
//     console.log(today, latest_date);
//     if (today > latest_date) {
//       console.log('今天日期比較新');
//     } else {
//       console.log('今天日期"沒有"比較新');
//     }
//   });
// });
