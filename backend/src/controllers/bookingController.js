import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import { calculateRideDuration } from "../utils/rideDuration.js";

export async function createBooking(req, res) {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    const duration = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const conflict = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

    if (conflict) return res.status(409).json({ error: "Vehicle already booked for this slot" });

    const booking = await Booking.create({ vehicleId, fromPincode, toPincode, startTime: start, endTime: end, customerId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
