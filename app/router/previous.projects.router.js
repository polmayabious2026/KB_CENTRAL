const exress = require("express")
const previousproject = exress.Router()
const upload = require("../middleware/upload")

const {
  Addpreviousprojects,
  Allpreviousprojects,
  Updatepreviousprojects,
  Deletepreviousprojects,
}= require("../controller/previousprojects.con")

previousproject.post("/add_previousproject",upload.single("image"),Addpreviousprojects)
previousproject.get("/getall_previousproject",Allpreviousprojects)
previousproject.put("/update_previousproject/:id",upload.single("image"),Updatepreviousprojects)
previousproject.delete("/delete_previousproject/:id",Deletepreviousprojects)


module.exports = previousproject