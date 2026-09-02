const exress = require("express")
const amenities = exress.Router()
const upload = require("../middleware/upload")

const {
  Addamenities,
  Allamenities,
  Updateamenities,
  Deleteamenities,
}
= require("../controller/amenities.con")

amenities.post("/add_amenities",upload.single("image"),Addamenities)
amenities.get("/getall_amenities",Allamenities)
amenities.put("/update_amenities/:id",upload.single("image"),Updateamenities)
amenities.delete("/delete_amenities/:id",Deleteamenities)

module.exports = amenities