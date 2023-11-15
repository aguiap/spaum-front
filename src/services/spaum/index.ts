import { BASE_URL, BASE_URL_API } from "@/services/api";
import axios from "axios";
import { session$ } from "@/store";

export default class ApiSpaum {
  // Essa chave precisa bater com a chave do back-end
  static secretkey = "XkhZG4fW2t2WdasqWQEQ06dfsda12daQ"; //Length 32

  static header = () => {
    return {
      Accept: "application/json",
      Origin: BASE_URL,
      Authorization: `Bearer ${session$.getValue().accessToken}`
    };
  };

  static encryptData = (password: string) => {
    let CryptoJS = require("crypto-js");
    let key = CryptoJS.enc.Utf8.parse(ApiSpaum.secretkey);
    let iv = CryptoJS.enc.Utf8.parse(ApiSpaum.secretkey.substring(0, 16));

    return CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  };

  static decryptedData = (password: string) => {
    let CryptoJS = require("crypto-js");
    let key = CryptoJS.enc.Utf8.parse(ApiSpaum.secretkey);
    let iv = CryptoJS.enc.Utf8.parse(ApiSpaum.secretkey.substring(0, 16));

    let decrypted = CryptoJS.AES.decrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  static async login(username: string, password: string) {
    return await axios.post(
      `${BASE_URL_API}/auth/signin`,
      {
        username: username,
        password: ApiSpaum.encryptData(password)
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  }

  static async getAllCourses() {
    return await axios.get(`${BASE_URL_API}/api/v1/courses/get-all-courses`, {
      headers: ApiSpaum.header()
    });
  }

  static async editCourse(body: any) {
    return await axios.put(`${BASE_URL_API}/api/v1/courses`, body, {
      headers: ApiSpaum.header()
    });
  }

  static async createCourse(body: any) {
    return await axios.post(`${BASE_URL_API}/api/v1/courses`, body, {
      headers: ApiSpaum.header()
    });
  }

  static async deleteCourse(id: number) {
    return await axios.delete(`${BASE_URL_API}/api/v1/courses/${id}`, {
      headers: ApiSpaum.header()
    });
  }

  static async getSubjectsWithCourseId(id: bigint | string) {
    return await axios.get(
      `${BASE_URL_API}/api/v1/courses/get-all-subjects/${id}`,
      {
        headers: ApiSpaum.header()
      }
    );
  }

  static async editSubject(body: any) {
    return await axios.put(`${BASE_URL_API}/api/v1/courses/subject`, body, {
      headers: ApiSpaum.header()
    });
  }

  static async createSubject(id: bigint, body: any) {
    return await axios.post(
      `${BASE_URL_API}/api/v1/courses/${id}/subject`,
      body,
      {
        headers: ApiSpaum.header()
      }
    );
  }

  static async createSubjectMultiple(id: bigint, body: any) {
    return await axios.post(
      `${BASE_URL_API}/api/v1/courses/${id}/subject/multiple`,
      body,
      {
        headers: ApiSpaum.header()
      }
    );
  }

  static async deleteSubject(id: bigint) {
    return await axios.delete(`${BASE_URL_API}/api/v1/courses/subject/${id}`, {
      headers: ApiSpaum.header()
    });
  }

  static async changePassword(password: string) {
    return await axios.patch(
      `${BASE_URL_API}/api/v1/user/change-password`,
      {
        username: session$.getValue().username,
        password: ApiSpaum.encryptData(password)
      },
      {
        headers: ApiSpaum.header()
      }
    );
  }

  static async getAllAnalysisByToken(token: string) {
    return await axios.get(
      `${BASE_URL_API}/token/v1/analysis/get-all-analysis-by-token/${token}`,
      {
        headers: ApiSpaum.header()
      }
    );
  }

  static async sendEmail(body: any) {
    return await axios.post(`${BASE_URL_API}/api/v1/send-email`, body, {
      headers: ApiSpaum.header()
    });
  }
}
