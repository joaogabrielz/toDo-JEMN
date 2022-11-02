const express = require ("express")
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/login", (req, res) => {
    let payload = {
        nome:req.body.nome,
        senha:req.body.senha
    }

let token = jwt.sign(payload, process.env.JWT_KEY);
// let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60*10});
res.send(token)


})

router.post("/verificar", (req, res) =>{
    let decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
    res.json(decoded)
})

module.exports=router