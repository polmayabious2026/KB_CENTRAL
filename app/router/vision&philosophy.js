const exress = require("express")
const visionphilosophy_router = exress.Router()
const upload = require("../middleware/upload")

const {
  Addvisionphilosophy,
  Allvisionphilosophy,
  Updatevisionphilosophy,
  Deletevisionphilosophy,
}= require("../controller/visionphilisophy.con")

visionphilosophy_router.post("/add_visionphilosophy",Addvisionphilosophy)
visionphilosophy_router.get("/getall_visionphilosophy",Allvisionphilosophy)
visionphilosophy_router.put("/update_visionphilosophy/:id",Updatevisionphilosophy)
visionphilosophy_router.delete("/delete_visionphilosophy/:id",Deletevisionphilosophy)


module.exports = visionphilosophy_router