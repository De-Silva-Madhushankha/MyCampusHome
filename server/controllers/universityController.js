import University from "../models/UniversityModel.js";

export const getUniversities = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const universities = await University.find(filter);
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch universities", error });
  }
};


export const addUniversity = async (req, res) => {
  try {

    const newUniversity = new University({
      name: req.body.name,
      id: req.body.id,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
    });

    await newUniversity.save();
    res.status(201).json(newUniversity);
  } catch (error) {
    res.status(500).json({ message: "Failed to add university", error });
  }
};


export const deleteUniversity = async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete university", error });
  }
};
