import Accommodation from '../models/accommodationModel.js';

export const getAccommodations = async (req, res) => {
    try {
        const filter = req.query.type ? { type: req.query.type } : {};
        const accommodations = await Accommodation.find(filter);    
        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch accommodations", error });
    }
};

export const getAccommodationById = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        res.status(200).json(accommodation);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch accommodation", error });
    }
};

export const updateAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(accommodation);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update accommodation", error });
    }
};

export const deleteAccommodation = async (req, res) => {
    try {
        await Accommodation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Accommodation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete accommodation", error });
    }
};
