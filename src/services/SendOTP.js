import axios from "axios";
import { sendSMSApi } from "@apis/TopupApi";

const generateRandomSixDigitNumber = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  // Generate a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const SendOTP = async (phone) => {
  const sixDigitNumber = generateRandomSixDigitNumber();
  const param = {
    appId: "mmlink",
    phone: phone,
    message: "[mm-link]: Your OTP Verification is " + sixDigitNumber,
  };

  const headerBody = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(sendSMSApi, param, {
      headers: headerBody,
    });

    return {
      response: response.data,
      sixDigitNumber: sixDigitNumber,
    };
  } catch (error) {
    console.log("Failed to send SMS:", error);
    return {
      response: null,
      sixDigitNumber: sixDigitNumber,
    };
  }
};
