// src/app.ts
import express, { Application } from "express";
import { autoEvi } from "../../src";

export const app: Application = express();

// Middleware
app.use(express.json());

// Load Controllers
autoEvi();
