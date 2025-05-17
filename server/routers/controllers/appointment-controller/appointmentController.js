const Appointment = require("../../../models/appointment-models/appointment");
const Status = require("../../../models/appointment-models/appointmentStatus");
const User = require("../../../models/user-models/user");

const createAppointment = async (req, res) => {
  try {
    const { vet, date, notes } = req.body;
    const vetExists = await User.findById(vet);
    if (!vetExists || vetExists.role !== "vet") {
      return res.status(400).json({ message: "Vet does not exist" });
    }

    const petId = req.params.pid;
    const ownerId = req.user._id;
    const pendingStatus = await Status.findOne({ name: "Pending" });

    const newAppointment = new Appointment({
      owner: ownerId,
      pet: petId,
      vet,
      date,
      notes,
      status: pendingStatus._id,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.aid);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. Not your pet's appointment." });
    }
    const pendingStatus = await Status.findOne({ name: "Pending" });
    if (!pendingStatus) {
      return res.status(400).json({ message: "Pending status not found" });
    }
    appointment.set({ ...req.body, status: pendingStatus._id });

    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

const getAllAppointmentsForPet = async (req, res) => {
  let appointments = [];
  try {
    appointments = await Appointment.find({ pet: req.params.pid })
      .populate("pet")
      .populate("vet")
      .populate("owner")
      .populate("status");

    res
      .status(200)
      .json({ message: "Appointments retrieved successfully", appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.aid);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. Not your pet's appointment." });
    }
    await Appointment.findByIdAndDelete(req.params.aid);
    res
      .status(200)
      .json({ message: "Appointment deleted successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

const changeAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.aid);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    let apptStatus;

    if (
      req.user.role === "owner" &&
      appointment.owner.toString() === req.user._id.toString()
    ) {
      apptStatus = await Status.findOne({ name: "Cancelled" });
    } else if (
      (req.user.role === "vet" &&
        appointment.vet.toString() === req.user._id.toString()) ||
      req.user.role === "admin"
    ) {
      apptStatus = await Status.findOne({ name: req.body.status });
    }

    if (!apptStatus) {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    appointment.status = apptStatus._id;
    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error });
  }
};

const getAllAppointments = async (req, res) => {
  let appointments = [];
  try {
    if (req.user.role === "admin") {
      appointments = await Appointment.find()
        .populate("pet")
        .populate("vet")
        .populate("owner")
        .populate("status");
    } else if (req.user.role === "vet") {
      appointments = await Appointment.find({ vet: req.user._id })
        .populate("pet")
        .populate("vet")
        .populate("owner")
        .populate("status");
    } else if (req.user.role === "owner") {
      appointments = await Appointment.find({ owner: req.user._id })
        .populate("pet")
        .populate("vet")
        .populate("owner")
        .populate("status");
    }

    res
      .status(200)
      .json({ message: "Appointments retrieved successfully", appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

const getOneAppointment = async (req, res) => {
  try {
    appointment = await Appointment.findOne({ _id: req.params.aid })
      .populate("pet")
      .populate("vet")
      .populate("owner")
      .populate("status");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (
      req.user.role === "owner" &&
      appointment.owner._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Not your pet's appointment." });
    } else if (
      req.user.role === "vet" &&
      appointment.vet.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not this pet's vet" });
    }
    res
      .status(200)
      .json({ message: "Appointment retrieved successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};
module.exports = {
  createAppointment,
  updateAppointment,
  getAllAppointmentsForPet,
  deleteAppointment,
  changeAppointmentStatus,
  getAllAppointments,
  getOneAppointment,
};
