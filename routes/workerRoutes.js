const express = require("express");
const coookieParse = require('cookie-parser');
const authentication = require("../middleware/authentication");
const {
    workerRegistration,
    workerLogin,
    workerProfile,
    editWorker,
    getAllWorkers,
    deleteWorker,
    workerLogout
} = require("../controllers/workerController");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());
router.route("/register").post(workerRegistration);
router.route("/login").post(workerLogin);
router.route("/profile").get(authentication, workerProfile);
router.route("/editWorker").put(authentication, editWorker);
router.route("/getAllWorkers").get(getAllWorkers);
router.route("/deleteWorker").delete(authentication, deleteWorker);
router.route("/logout").post(authentication, workerLogout);
// find single worker
// edit profile
// find all workers
// delete workers

// Full name, address, password, phone, email,  location(default address -> Prayagraj), occupation, Arrayslist services, charges
module.exports = router;