const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord,
    summary
} = require("../controllers/recordController");

router.post("/", auth, role("admin"), createRecord);
router.get("/", auth, role("viewer", "analyst", "admin"), getRecords);
router.get("/summary", auth, role("analyst", "admin"), summary);
router.put("/:id", auth, role("admin"), updateRecord);
router.delete("/:id", auth, role("admin"), deleteRecord);


module.exports = router;