// import { firebase } from "firebase/app";

const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAXDRYV_c6zKlhnmZSYCu9i0eBhNDJfo94",
  authDomain: "alg-frontend.firebaseapp.com",
  projectId: "alg-frontend",
  storageBucket: "alg-frontend.appspot.com",
  messagingSenderId: "727083865163",
  appId: "1:727083865163:web:ac807ede63fd56689e29ce",
  measurementId: "G-J59TH8LBYT",
};
firebase.initializeApp(firebaseConfig);
console.log(firebase);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const uploadImageD2dExpressProduct = async (file) => {
  const imageRef = storage.ref(`d2dExpressProduct/${file.name}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });

    return imgUrl[0];
  } catch (error) {
    return null;
  }
};

const getAllBlogs = async () => {
  const blogsCollectionRef = firestore.collection("blogs");
  try {
    const blogs = await blogsCollectionRef.get();
    const blogsArray = [];
    blogs.forEach((doc) => {
      blogsArray.push(doc.data());
    });
    return blogsArray;
  } catch (error) {
    alert(error);
  }
};

const getAllExpressRatesDocument = async () => {
  const expressRatesDocumentsCollectionRef = firestore.collection(
    "expressRatesDocuments"
  );
  try {
    const expressRatesDocuments =
      await expressRatesDocumentsCollectionRef.get();
    const expressRatesDocumentsArray = [];
    expressRatesDocuments.forEach((doc) => {
      expressRatesDocumentsArray.push(doc.data());
    });
    return expressRatesDocumentsArray;
  } catch (error) {
    alert(error);
  }
};
const getAllExpressRatesParcel = async () => {
  const expressRatesParcelCollectionRef =
    firestore.collection("expressRatesParcel");
  try {
    const expressRatesParcel = await expressRatesParcelCollectionRef.get();
    const expressRatesParcelArray = [];
    expressRatesParcel.forEach((doc) => {
      expressRatesParcelArray.push(doc.data());
    });
    return expressRatesParcelArray;
  } catch (error) {
    alert(error);
  }
};

const getAllD2DRates = async (freightType, country) => {
  const d2dRatesCollectionRef = firestore.collection(
    `d2d-rates-${freightType}-${country}`
  );
  try {
    const d2dRates = await d2dRatesCollectionRef.get();
    const d2dRatesArray = [];
    d2dRates.forEach((doc) => {
      d2dRatesArray.push(doc.data());
    });
    return d2dRatesArray;
  } catch (error) {
    alert(error);
  }
};

const getAllLots = async () => {
  const lotsCollectionRef = firestore.collection("lots");
  try {
    const lots = await lotsCollectionRef.orderBy("shipmentDate", "desc").get();
    const lotsArray = [];
    lots.forEach((doc) => {
      lotsArray.push(doc.data());
    });
    return lotsArray;
  } catch (error) {
    alert(error);
  }
};
const getAllBookingsOfSingleUser = async (userId) => {
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("userId", "==", userId);
  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};
const getAllReceivedExpressBookingsOfCurrentUser = async (userId) => {
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("userId", "==", userId)
    .where("bookingStatus", "==", "Received");
  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};

const getSingleBooking = async (bookingId) => {
  const bookingRef = firestore.doc(`bookingRequest/${bookingId}`);
  try {
    const snapShot = await bookingRef.get();
    return snapShot.data();
  } catch (error) {
    return null;
  }
};

const getAllParcelsOfSingleUser = async (userId) => {
  const ordersCollectionRef = firestore
    .collection("orders")
    .where("customerUid", "==", userId);
  try {
    const orders = await ordersCollectionRef.get();
    const ordersArray = [];
    orders.forEach((doc) => {
      ordersArray.push(doc.data());
    });
    return ordersArray;
  } catch (error) {
    alert(error);
  }
};

const setBookingRequest = async (bookingObj) => {
  let header;
  if (bookingObj.shipmentMethod == "Express") {
    header = "EXP";
  } else if (bookingObj.shipmentMethod == "Freight") {
    header = "FRE";
  } else if (bookingObj.shipmentMethod == "D2D") {
    header = "D2D";
  }
  const bookingId = `${header}${Math.round(Math.random() * 1000000 - 1)}`;
  const bookingRef = firestore.doc(`bookingRequest/${bookingId}`);
  delete bookingObj.file;
  const snapShot = await bookingRef.get();
  if (!snapShot.exists) {
    try {
      await bookingRef.set({
        bookingId,
        ...bookingObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await bookingRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a booking with similar uid, please try again later"
    );
  }
};

const getOrderTrackingResult = async (trackingNo) => {
  const ordersCollectionRef = firestore
    .collection("orders")
    .where("trackingNo", "==", trackingNo);
  try {
    const resultOrders = await ordersCollectionRef.get();
    let parcelsArray = [];
    resultOrders.forEach((doc) => {
      parcelsArray.push(doc.data());
    });
    if (parcelsArray.length == 0) {
      return null;
    }
    let lotArray = parcelsArray.map((parcel) => parcel.lotNo);
    let uniqueLotArray = [...new Set(lotArray)];
    let customerUidArray = parcelsArray.map((parcel) => parcel.customerUid);
    const lotNo = lotArray[0];
    const customerUid = customerUidArray[0];
    const lotRef = firestore.doc(`lots/${lotNo}`);
    const lotObj = await lotRef.get();
    const userRef = firestore.doc(`users/${customerUid}`);
    const userObj = await userRef.get();
    return {
      parcelsArray,
      lotObj: lotObj.data(),
      userObj: userObj.data(),
      lotArray: uniqueLotArray.length > 0 ? uniqueLotArray : [],
    };
  } catch (error) {
    alert(error);
    return null;
  }
};

const getBookingTrackingResult = async (trackingNo) => {
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("bookingId", "==", trackingNo)
    .where("shipmentMethod", "==", "Express");
  try {
    const resultOrders = await bookingsCollectionRef.get();
    let parcelsArray = [];
    resultOrders.forEach((doc) => {
      parcelsArray.push(doc.data());
    });
    if (parcelsArray.length == 0) {
      return null;
    }
    let bookingObj = parcelsArray[0];

    return {
      bookingObj,
    };
  } catch (error) {
    alert(error);
    return null;
  }
};

module.exports = {
  getOrderTrackingResult,
  getBookingTrackingResult,
  setBookingRequest,
  getAllLots,
  getAllD2DRates,
};
