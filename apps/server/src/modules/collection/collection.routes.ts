import express from "express";
import { collectionController } from "./collection.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { createCollectionSchema } from "./collection.validation.js";

const router = express.Router();

router.post(
  "/",
  validationMiddleware({ body: createCollectionSchema }),
  collectionController.create,
);
