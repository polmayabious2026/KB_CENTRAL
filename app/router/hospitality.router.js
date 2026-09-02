const exress = require("express")
const hospitality_router = exress.Router()
const upload = require("../middleware/upload")

const {
  Addhospitality,
  Allhospitality,
  Updatehospitality,
  Deletehospitality,
}= require("../controller/hospitality.con")

hospitality_router.post("/add_hospitality",upload.single("image"),Addhospitality)
hospitality_router.get("/getall_hospitality",Allhospitality)
hospitality_router.put("/update_hospitality/:id",upload.single("image"),Updatehospitality)
hospitality_router.delete("/delete_hospitality/:id",Deletehospitality)

module.exports = hospitality_router