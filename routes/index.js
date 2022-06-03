const { Router } = require('express');
const homeRoutes = require("./home");
const cardRoutes = require("./card");
const orderRoutes = require("./order");
const addRoutes = require("./add");
const devicesRoutes = require("./devices");
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.use("/", homeRoutes);
router.use("/add", authMiddleware, addRoutes);
router.use("/devices", devicesRoutes);
router.use("/card", authMiddleware, cardRoutes);
router.use("/order", authMiddleware, orderRoutes);
router.use("/auth", authRoutes);
router.use("/profile", authMiddleware, profileRoutes);

module.exports = router;
