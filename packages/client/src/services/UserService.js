import Axios from '../utils/http.config';

export class UserService {

  static submit(data) {
    try {
      return Axios.post(`/user/login`, { data })
        .then(response => response.data.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static setToken(token) {
    localStorage.setItem(`token`, token);
  }

  static getToken() {
    localStorage.getItem(`token`);
  }
}
