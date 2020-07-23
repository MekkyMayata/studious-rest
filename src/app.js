import express from "express";
import authController from "../src/controllers/authController";

const app = express();

// router
app.use("/api/v1", authController);

module.exports = app;
