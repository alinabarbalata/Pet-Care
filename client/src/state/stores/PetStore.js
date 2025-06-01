import { SERVER } from "../../../config/config";

class PetStore {
  constructor() {
    this.data = {
      pets: [],
      breeds: [],
      colors: [],
    };
  }
  async createPet(formData) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Create pet response:", data);
      this.data.pets = [...this.data.pets, data];
      return this.data.pets;
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
      this.data.pets = data.pets || [];
      console.log("Get pet response:", this.data.pets);

      return this.data.pets;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
  async deletePet(petId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets/${petId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Delete pet response:", data);
      this.data.pets = this.data.pets.filter((pet) => pet._id !== petId);
      return this.data.pets;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
  async getAllBreeds() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/admin/breeds`, {
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
      this.data.breeds = data.breeds || [];
      return this.data.breeds;
    } catch (err) {
      alert("Failed to load breeds. Please try again!");
      return [];
    }
  }

  async getAllColors() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/admin/colors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      this.data.colors = data.colors || [];
      return this.data.colors;
    } catch (err) {
      console.error("Error fetching colors:", err);
      alert("Failed to load colors. Please try again!");
      return [];
    }
  }

  async getOnePet(petId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets/${petId}`, {
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
      return data.pet;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
}

export default PetStore;
