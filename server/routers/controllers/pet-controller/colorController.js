const Color = require("../../models/color");

const createColor = async (req, res) => {
  try {
    const { name } = req.body;
    const newColor = new Color({
      name,
    });

    await newColor.save();
    res
      .status(201)
      .json({ message: "Color created succesfully", color: newColor });
  } catch (error) {
    res.status(500).json({ message: "Error creating color", error });
  }
};

const updateColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.cid);
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }

    color.set(req.body);

    await color.save();

    res.status(200).json({ message: "Color updated successfully", color });
  } catch (error) {
    res.status(500).json({ message: "Error updating color", error });
  }
};
const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find({});
    if (colors.length === 0) {
      return res.status(404).json({ message: "No colors found" });
    }
    res.status(200).json({ message: "Colors retrieved successfully", colors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching colors", error });
  }
};

const deleteColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.cid);
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }
    await Color.findByIdAndDelete(req.params.cid);
    res.status(200).json({ message: "Color deleted successfully", color });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting color", error: error.message || error });
  }
};

module.exports = { createColor, updateColor, getAllColors, deleteColor };
