import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/vehicles", () => {
  it("should create a vehicle", async () => {
    const res = await request(app).post("/api/vehicles").send({ name: "Truck", capacityKg: 1000, tyres: 6 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Truck");
  });

  it("should fail with missing fields", async () => {
    const res = await request(app).post("/api/vehicles").send({});
    expect(res.status).toBe(400);
  });
});
