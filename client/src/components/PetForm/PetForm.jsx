import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { paw, heartCircle } from "ionicons/icons";
import PetStore from "../../state/stores/PetStore";

import "./PetForm.css";

const PetForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [colors, setColors] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const petStore = new PetStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedBreeds, fetchedColors] = await Promise.all([
          petStore.getAllBreeds(),
          petStore.getAllColors(),
        ]);
        if (Array.isArray(fetchedBreeds)) {
          setBreeds(fetchedBreeds);
        } else {
          console.error("Failed to fetch breeds");
        }
        if (Array.isArray(fetchedColors)) {
          setColors(fetchedColors);
        } else {
          console.error("Failed to fetch breeds");
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await petStore.createPet(
      name,
      age,
      selectedBreed,
      selectedColor,
      "cat",
      vaccinated
    );
  };

  return (
    <div className="add-pet-wrapper">
      <div className="form-box create-pet">
        <h1>Add a Pet</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <IonIcon icon={paw} />
            </span>
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="icon">
              <IonIcon icon={heartCircle} />
            </span>
            <input
              type="number"
              required
              placeholder="Age"
              min={1}
              max={35}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="input-box">
            <select
              name="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              required
            >
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color._id} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-box">
            <select
              name="breed"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              required
            >
              <option value="">Select Breed</option>
              {breeds.map((breed) => (
                <option key={breed._id} value={breed.name}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={vaccinated}
              onChange={(e) => setVaccinated(e.target.checked)}
            />
            <label>My pet is vaccinated</label>
          </div>

          <button type="submit" className="btn">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetForm;
