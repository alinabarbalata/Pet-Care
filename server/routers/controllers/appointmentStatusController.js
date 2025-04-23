const Status = require("../../models/appointmentStatus");

const createStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newStatus = new Status({
      name,
    });

    await newStatus.save();
    res
      .status(201)
      .json({ message: "Status created succesfully", status: newStatus });
  } catch (error) {
    res.status(500).json({ message: "Error creating status", error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.sid);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }

    status.set(req.body);

    await status.save();

    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find({});
    if (statuses.length === 0) {
      return res.status(404).json({ message: "No status found" });
    }
    res
      .status(200)
      .json({ message: "Statuses retrieved successfully", statuses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statuses", error });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.sid);
    if (!status) {
      return res.status(404).json({ message: "status not found" });
    }
    await Status.findByIdAndDelete(req.params.sid);
    res.status(200).json({ message: "Status deleted successfully", status });
  } catch (error) {
    res.status(500).json({ message: "Error deleting status", error });
  }
};

module.exports = { createStatus, updateStatus, getAllStatuses, deleteStatus };
