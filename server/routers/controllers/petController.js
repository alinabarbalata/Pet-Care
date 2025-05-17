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
    console.error("Error creating appointment:", error);
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
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
      pets = await Pet.find()
        .populate("owner")
        .populate("breed")
        .populate("color");
    } else if (req.user.role === "owner") {
      pets = await Pet.find({ owner: req.user._id })
        .populate("owner")
        .populate("breed")
        .populate("color");
    }
    res.status(200).json({ message: "Pets retrieved successfully", pets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
};

const getOnePet = async (req, res) => {
  try {
    let pet = await Pet.findOne({ _id: req.params.pid })
      .populate("owner")
      .populate("breed")
      .populate("color");
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (
      req.user.role === "owner" &&
      pet.owner._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied. Not your pet." });
    }
    res.status(200).json({ message: "Pet retrieved successfully", pet });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet", error });
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
module.exports = { createPet, updatePet, getAllPets, deletePet, getOnePet };
