import { SERVER } from "../../../config/config";

class AppointmentStore {
  constructor() {
    this.data = {
      appointments: [],
      vets: [],
    };
  }
  async getAllVets() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/auth/vets`, {
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
      this.data.vets = data.vets || [];
      return this.data.vets;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async createAppointment(pet, vet, date, notes) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/pets/${pet}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vet,
          date,
          notes,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Create appointment response:", data);
      this.data.appointments = [...this.data.appointments, data];
      return this.data.appointments;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async getAllAppointments() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/api/appointments`, {
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
      this.data.appointments = data.appointments || [];
      return this.data.appointments;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async changeAppointmentStatus(pet, appointment, newStatus) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${SERVER}/api/pets/${pet}/appointments/${appointment}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Change appointment status response:", data);
      const appointments = await this.getAllAppointments();
      this.data.appointments = appointments;
      return this.data;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }

  async updateAppointment(pet, appointment, updatedData) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${SERVER}/api/pets/${pet}/appointments/${appointment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log("Update appointment response:", data);

      const appointments = await this.getAllAppointments();
      this.data.appointments = appointments;
      return this.data;
    } catch (err) {
      alert("Error. Please try again!");
    }
  }
}

export default AppointmentStore;
