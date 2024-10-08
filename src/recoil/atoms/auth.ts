import { atom } from "recoil";
import axios from "axios";

interface AuthData {
  salt: string;
  // Add other properties if needed
}

export const authAtom = atom<AuthData | null>({
  key: "authAtom",
  default: null,
});

export const login = async (body: { [key: string]: any }) => {
  try {
    const url = "http://localhost:5000/challenge";
    const data = {
      header: {
        trId: "020001",
      },
      body,
    };
    const { data: response } = await axios.post(url, data); // Using POST since you're sending data

    if (response?.header?.rtnCode !== "000000") {
      throw { customError: true, payload: response };
    }

    return response;
  } catch (err: any) {
    if (err.customError) {
      return err.payload;
    } else if (err.response?.data) {
      return err.response.data;
    } else {
      return {
        error: {
          url: "로그인",
          code: err.code ?? "UNKNOWN_ERROR",
          message: err.message ?? "An unknown error occurred",
        },
      };
    }
  }
};
