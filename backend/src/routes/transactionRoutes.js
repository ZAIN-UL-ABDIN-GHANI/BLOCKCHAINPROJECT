import { Router } from "express";
import { body } from "express-validator";
import { transferEther } from "../controllers/transactionController.js";
import { validateRequest } from "../middleware/validationMiddleware.js";

const router = Router();

const transferValidators = [
  body("from").trim().notEmpty().withMessage("Sender address is required."),
  body("to").trim().notEmpty().withMessage("Receiver address is required."),
  body("amount")
    .notEmpty().withMessage("Amount is required.")
    .isFloat({ gt: 0 }).withMessage("Amount must be a positive number."),
];

router.post("/transfer", transferValidators, validateRequest, transferEther);

export default router;
