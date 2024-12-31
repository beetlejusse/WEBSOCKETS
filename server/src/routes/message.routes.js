import {Router} from "express";
import { protectedRouteMiddleware } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.get("/users", protectedRouteMiddleware, getUsersForSidebar);
router.get("/:id", protectedRouteMiddleware, getMessages);

router.post("/send/:id", protectedRouteMiddleware, sendMessage);

export default router;