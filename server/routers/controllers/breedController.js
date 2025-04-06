const Breed = require("../../models/breed");

const createBreed = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newBreed = new Breed({
      name,
      type,
    });

    await newBreed.save();
    res
      .status(201)
      .json({ message: "Breed created succesfully", breed: newBreed });
  } catch (error) {
    res.status(500).json({ message: "Error creating breed", error });
  }
};

const updateBreed = async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.bid);
    if (!breed) {
      return res.status(404).json({ message: "Breed not found" });
    }

    breed.set(req.body);

    await breed.save();

    res.status(200).json({ message: "Breed updated successfully", breed });
  } catch (error) {
    res.status(500).json({ message: "Error updating breed", error });
  }
};
const getAllBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find({});
    if (breeds.length === 0) {
      return res.status(404).json({ message: "No breeds found" });
    }
    res.status(200).json({ message: "Breeds retrieved successfully", breeds });
  } catch (error) {
    res.status(500).json({ message: "Error fetching breeds", error });
  }
};

const deleteBreed = async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.bid);
    if (!breed) {
      return res.status(404).json({ message: "Breed not found" });
    }
    await Breed.findByIdAndDelete(req.params.bid);
    res.status(200).json({ message: "Breed deleted successfully", breed });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting breed", error: error.message || error });
  }
};

module.exports = { createBreed, updateBreed, getAllBreeds, deleteBreed };
