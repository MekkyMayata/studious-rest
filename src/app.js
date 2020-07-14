import express from "express";
import authController from "../src/controller/authController";

const app = express();

// router
app.use("/api/v1", authController);

module.exports = app;
