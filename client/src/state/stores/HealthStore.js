import { SERVER } from "../../../config/config";

class HealthStore {
  constructor() {
    this.data = {
      symptoms: [],
      diseases: [],
      quizReports: [],
    };
  }

  async createQuizReport(petId, checkedSymptoms) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/quiz-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          petId,
          checkedSymptoms,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Create quiz report response:", data);
      this.data.quizReports = [...this.data.quizReports, data];
      return data;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async getAllQuizReports() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/quiz-report`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      this.data.quizReports = data || [];
      return data;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
  async getAllQuizReportsForPet(petId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/quiz-report/${petId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      this.data.quizReports = data || [];
      return data;
    } catch (err) {
      console.error("Failed to fetch reports for pet:", err);
      alert("Error. Please try again!");
    }
  }
  async getAllSymptoms() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/admin/symptoms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      this.data.symptoms = data.symptoms || [];
      return this.data.symptoms;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async getAllDiseases() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/admin/diseases`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      this.data.diseases = data.diseases || [];
      return this.data.diseases;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
}

export default HealthStore;
