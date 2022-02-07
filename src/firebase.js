import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyASgrmd2HMi3FWlMHiljfj-izcHeiTz_8c",
  authDomain: "upload-pics-e599e.firebaseapp.com",
  databaseURL: "https://upload-pics-e599e-default-rtdb.firebaseio.com",
  projectId: "upload-pics-e599e",
  storageBucket: "upload-pics-e599e.appspot.com",
  messagingSenderId: "136407007017",
  appId: "1:136407007017:web:00edac95ea2dc623564138"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);