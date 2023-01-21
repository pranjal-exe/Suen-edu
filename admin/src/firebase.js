import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyDVn85STihBcuXUJJFfSrr_jR40rPaVi1c",
	authDomain: "suen-b1abe.firebaseapp.com",
	projectId: "suen-b1abe",
	storageBucket: "suen-b1abe.appspot.com",
	messagingSenderId: "326362696455",
	appId: "1:326362696455:web:518d3bdfd0748b252093a2"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
