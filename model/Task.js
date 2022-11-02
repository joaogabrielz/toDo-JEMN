const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema( {descricao: String, concluida: Boolean})
const Task = mongoose.model("Task", TaskSchema)

module.exports = Task