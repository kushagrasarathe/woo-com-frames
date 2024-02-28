import dotenv from "dotenv";

dotenv.config();
const COMMERCE_API_KEY = process.env.COMMERCE_API_KEY;
if (!COMMERCE_API_KEY) {
  throw new Error(`API KEY MISSING`);
}

export const createCharge = async (
  name: string,
  description: string,
  localPrice: { amount: string; currency: string }
) => {
  try {
    const url = "https://api.commerce.coinbase.com/charges";

    const requestBody = {
      local_price: {
        amount: localPrice.amount, //price of charge
        currency: localPrice.currency, //currency
      },
      pricing_type: "fixed_price",

      name: name,
      description: description,
      redirect_url: "https:/google.com", //optional redirect URL
    };

    const payload = {
      method: "POST",
      //   mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CC-Api-Key": COMMERCE_API_KEY, //API key from Commerce
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, payload);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
