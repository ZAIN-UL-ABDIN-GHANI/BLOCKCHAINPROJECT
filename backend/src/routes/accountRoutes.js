import { Router } from "express";
import { getAccounts, getAccountBalance } from "../controllers/accountController.js";

const router = Router();

router.get("/", getAccounts);
router.get("/:address/balance", getAccountBalance);

export default router;
