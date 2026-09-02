const exress = require("express")
const wellness_router = exress.Router()
const upload = require("../middleware/upload")

const {
  Addwellness,
  Allwellness,
  Updatewellness,
  Deletewellness,
}
= require("../controller/welleness.con")

wellness_router.post("/add_wellness",upload.single("image"),Addwellness)
wellness_router.get("/getall_wellness",Allwellness)
wellness_router.put("/update_wellness/:id",upload.single("image"),Updatewellness)
wellness_router.delete("/delete_wellness/:id",Deletewellness)


module.exports = wellness_router