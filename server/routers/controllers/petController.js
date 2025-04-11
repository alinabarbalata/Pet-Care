const Pet = require("../../models/pet");

const createPet = async (req, res) => {
  try {
    const { name, age, breed, color, type, vaccinated } = req.body;
    const ownerId = req.user._id;
    const newPet = new Pet({
      name,
      age,
      breed,
      color,
      type,
      vaccinated,
      owner: ownerId,
    });

    await newPet.save();
    res.status(201).json({ message: "Pet created successfully", pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Error creating pet", error });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.pid);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    pet.set(req.body);

    await pet.save();

    res.status(200).json({ message: "Pet updated successfully", pet });
  } catch (error) {
    res.status(500).json({ message: "Error updating pet", error });
  }
};

const getAllPets = async (req, res) => {
  let pets = [];
  try {
    if (req.user.role === "admin") {
      pets = await Pet.find();
    } else if (req.user.role === "owner") {
      pets = await Pet.find({ owner: req.user._id });
    }
    if (pets.length === 0) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json({ message: "Pets retrieved successfully", pets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.pid);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    await Pet.findByIdAndDelete(req.params.pid);
    res.status(200).json({ message: "Pet deleted successfully", pet });
  } catch (error) {
    console.error("Error in deletePet method:", error);
    res
      .status(500)
      .json({ message: "Error deleting pet", error: error.message || error });
  }
};
module.exports = { createPet, updatePet, getAllPets, deletePet };
