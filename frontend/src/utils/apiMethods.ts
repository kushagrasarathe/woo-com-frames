import CryptoJS from "crypto-js";
import axios from "axios";

export const getProducts = async (
  shopURL: string,
  consumerKey: string,
  consumerSecret: string
) => {
  try {
    const response = await axios.get(`${shopURL}/wp-json/wc/v3/products`, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });
    console.log(response);
    const products = (await response).data;
    console.log(products);
    return products;

    // const response = await fetch(`${shopURL}/wp-json/wc/v3/products`, {
    //   method: "GET",
    //   headers: {
    //     Authorization:
    //       "Basic " +
    //       Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64"),
    //     "Content-Type": "application/json", // Adjust content type as needed
    //     // Add other headers if required
    //   },
    // });

    // console.log(response);
    // const products = (await response.json()).data;
    // return products;
  } catch (error) {
    console.log(error);
  }
};

export const storeCredentialsLocal = async (
  consumerKey: string,
  consumerSecret: string
) => {
  try {
    const encryptedKey = CryptoJS.AES.encrypt(consumerKey, "").toString();
    localStorage.setItem("WooConsumerKey", encryptedKey);

    const encryptedSecret = CryptoJS.AES.encrypt(consumerSecret, "").toString();
    localStorage.setItem("WooConsumerSecret", encryptedSecret);
  } catch (error) {
    console.log(error);
  }
};

export const getCredentialsLocal = async (): Promise<
  | {
      consumerKey: string;
      consumerSecret: string;
    }
  | undefined
> => {
  try {
    const encryptedKeyFromStorage = localStorage.getItem("WooConsumerKey");
    if (!encryptedKeyFromStorage) {
      console.log("Key not found");
      return;
    }
    const consumerKey = CryptoJS.AES.decrypt(
      encryptedKeyFromStorage,
      ""
    ).toString(CryptoJS.enc.Utf8);

    const encryptedSecretFromStorage =
      localStorage.getItem("WooConsumerSecret");
    if (!encryptedSecretFromStorage) {
      console.log("Secret not found");
      return;
    }
    const consumerSecret = CryptoJS.AES.decrypt(
      encryptedSecretFromStorage,
      ""
    ).toString(CryptoJS.enc.Utf8);

    return {
      consumerKey,
      consumerSecret,
    };
  } catch (error) {
    console.log(error);
  }
};
