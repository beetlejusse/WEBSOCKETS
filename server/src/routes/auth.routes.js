import { Router } from "express";
import { loginController, logoutController, signUpController, updateProfileController, checkAuthController } from "../controllers/auth.controller.js";
import { protectedRouteMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signUpController);

router.post("/login", loginController);
// router.post("/send-otp", sendOTPController)

router.post("/logout", logoutController);
router.put("/update-profile", protectedRouteMiddleware, updateProfileController);

router.get("/checkAuth", protectedRouteMiddleware, checkAuthController);

export default router;