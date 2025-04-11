import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  const { company, role, link } = req.body;
  try {
    const newApp = new Application({
      userId: req.user.id,
      company,
      role,
      link,
    });
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const app = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(app);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting application" });
  }
};
