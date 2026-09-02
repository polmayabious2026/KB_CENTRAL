const exress = require("express")
const experience = exress.Router()
const upload = require("../middleware/upload")

const {
  Addexperience,
  Allexperience,
  Updateexperience,
  Deleteexperience,
}= require("../controller/experience.con")

experience.post("/add_experience",upload.single("image"),Addexperience)
experience.get("/getall_experience",Allexperience)
experience.put("/update_experience/:id",upload.single("image"),Updateexperience)
experience.delete("/delete_experience/:id",Deleteexperience)


module.exports = experience