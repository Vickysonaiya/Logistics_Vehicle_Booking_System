import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import { calculateRideDuration } from "../utils/rideDuration.js";

export async function addVehicle(req, res) {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ error: "All fields required" });
    }
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAvailableVehicles(req, res) {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const duration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const vehicles = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } });

    const bookings = await Booking.find({
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

    const unavailableIds = bookings.map(b => b.vehicleId.toString());
    const availableVehicles = vehicles.filter(v => !unavailableIds.includes(v._id.toString()));

    res.json({ estimatedRideDurationHours: duration, vehicles: availableVehicles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
