// Need to store a data for a specific Frame , the products involved

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

// -> frameId -> frame data -> products[] => product data
export interface frameData {
  frameId: string;
  shopLink: string;
  products: productData[];
}

export interface productData {
  id: string;
  name: string;
  permaLink: string;
  price: number;
  currency: string;
  description: string;
  image: string;
}

export const createFrameData = async (shopLink: string) => {
  try {
    const colRef = collection(db, "Frames");
    const docRef = await addDoc(colRef, {
      shopLink: shopLink,
    });
    console.log("Frame Data object created", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const addProducts = async (frameId: string, product: productData) => {
  try {
    const docRef = doc(db, "Frames", frameId, "Products", product.id);
    await setDoc(docRef, {
      ...product,
    });
    console.log("Product Added");
  } catch (error) {
    console.log(error);
  }
};

export const getFrameData = async (
  frameId: string
): Promise<frameData | undefined> => {
  try {
    const docRef = doc(db, "Frames", frameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Frame data:", docSnap.data());
      const frameData = docSnap.data();
      const productsData = await getProductsForFrame(frameId);
      if (!productsData) {
        console.log("No Product data found");
        return;
      }
      const FrameProductData = {
        frameId: frameId,
        shopLink: frameData.shopLink,
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
    console.log(apiData);
    return apiData;
  } catch (error) {
    console.log(error);
  }
};
