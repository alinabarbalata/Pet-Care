import { SERVER } from "../../../config/config";

class UserStore {
  constructor() {
    this.data = {};
  }

  async login(email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      localStorage.setItem("token", this.data.token);
      console.log("Login response:", this.data, "Token:", this.data.token);
      alert("LOGIN SUCCESSFUL!");
    } catch (err) {
      console.log("Response status:", err.status);
      console.log("Response body:", await err.json());
      alert("Login error. Please try again!");
      throw error;
    }
  }

  async register(email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      console.log("Register response:", this.data);
      alert("REGISTER SUCCESSFUL!");
    } catch (err) {
      alert("Register error. Please try again!");
    }
  }
  async logout() {
    try {
      this.data = {};
      localStorage.removeItem("token");

      console.log("Logout successful!");
      alert("You have been logged out.");
    } catch (err) {
      console.log("Error during logout:", err);
      alert("Logout error. Please try again.");
    }
  }
}

export default UserStore;
