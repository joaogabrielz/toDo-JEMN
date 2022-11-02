const express = require("express")
const router = express.Router()
const taskcontroller = require("../controllers/TaskController")

router.get("/", taskcontroller.listarTasks)
router.post("/", taskcontroller.cadastrarTask)
router.delete("/", taskcontroller.deletarTask)
router.put("/", taskcontroller.alterarTask)

module.exports = router