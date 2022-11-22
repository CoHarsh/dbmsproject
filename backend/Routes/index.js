const { Router } =  require("express");
const router = Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPlatform,
} = require("../controllers/index.controller");

const {gettheProductHistory} = require("../Controllers/getAllProductDetails")

router.get("/users", getUsers);
router.get("/platform", getPlatform);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/updateusers", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/pricehistory",gettheProductHistory)

module.exports = router;

// localhost:4920/users