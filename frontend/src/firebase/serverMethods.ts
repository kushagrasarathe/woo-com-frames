"use server";
import { initializeApp } from "firebase/app";
import { frameData, productData } from "./methods";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

initializeApp(firebaseConfig);

export const getFrameData = async (
  frameId: string
): Promise<frameData | undefined> => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "Frames", frameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Frame data:", docSnap.data());
      const frameData = docSnap.data();
      const productsData = await getProductsForFrame(frameId);
      if (!productsData) {
        console.log("No Product data found");
        return;
      }
      const FrameProductData = {
        frameId: frameId,
        shopLink: frameData.shopLink,
        shopName: frameData.shopName,
        products: productsData,
      };
      return FrameProductData;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForFrame = async (
  frameId: string
): Promise<productData[] | undefined> => {
  try {
    let apiData: productData[] = [];
    const db = getFirestore();
    const colRef = collection(db, "Frames", frameId, "Products");
    const querySnapshot = await getDocs(colRef);
    // querySnapshot.forEach((doc) => {
    //   return JSON.stringify(doc.data());
    // })
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      apiData.push(doc.data());
      // console.log(doc.id, " => ", doc.data());
    });
    // console.log(apiData);
    return apiData;
  } catch (error) {
    console.log(error);
  }
};
