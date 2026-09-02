const exress = require("express")
const projecthighlight = exress.Router()
const upload = require("../middleware/upload")

const {
  Addprojecthighlight,
  Allprojecthighlight,
  Updateprojecthighlight,
  Deleteprojecthighlight,
}= require("../controller/project-highlight.con")

projecthighlight.post("/add_projecthighlight",upload.single("image"),Addprojecthighlight)
projecthighlight.get("/getall_projecthighlight",Allprojecthighlight)
projecthighlight.put("/update_projecthighlight/:id",upload.single("image"),Updateprojecthighlight)
projecthighlight.delete("/delete_projecthighlight/:id",Deleteprojecthighlight)


module.exports = projecthighlight