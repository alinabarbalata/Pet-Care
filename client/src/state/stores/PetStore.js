import { SERVER } from "../../../config/config";

class PetStore {
  async createPet(name, age, breed, color, type, vaccinated) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age,
          breed,
          color,
          type,
          vaccinated,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Create pet response:", data);
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
  async getAllPets() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets`, {
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
      console.log("Get pet response:", data);
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async getAllBreeds() {
    try {
      const response = await fetch(`${SERVER}/admin/breeds`);
      if (!response.ok) {
        throw response;
      }

      const data = await response.json();
      return data.breeds || [];
    } catch (err) {
      alert("Failed to load breeds. Please try again!");
      return [];
    }
  }

  async getAllColors() {
    try {
      const response = await fetch(`${SERVER}/admin/colors`);
      if (!response.ok) {
        throw new Error("Failed to fetch colors");
      }

      const data = await response.json();
      return data.colors || [];
    } catch (err) {
      console.error("Error fetching colors:", err);
      alert("Failed to load colors. Please try again!");
      return [];
    }
  }
}

export default PetStore;
