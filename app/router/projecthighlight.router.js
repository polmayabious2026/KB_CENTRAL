const exress = require("express")
const projecthighlight = exress.Router()
const upload = require("../middleware/upload")

const {Addprojecthighlight,Allprojecthighlight}= require("../controller/project-highlight.con")

projecthighlight.post("/add_projecthighlight",upload.single("image"),Addprojecthighlight)
projecthighlight.get("/getall_projecthighlight",Allprojecthighlight)


module.exports = projecthighlight