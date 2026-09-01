const exress = require("express")
const visionphilosophy_router = exress.Router()
const upload = require("../middleware/upload")

const {Addvisionphilosophy,Allvisionphilosophy}= require("../controller/visionphilisophy.con")

visionphilosophy_router.post("/add_visionphilosophy",Addvisionphilosophy)
visionphilosophy_router.get("/getall_visionphilosophy",Allvisionphilosophy)


module.exports = visionphilosophy_router