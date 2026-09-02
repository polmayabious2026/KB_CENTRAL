const exress = require("express")
const retailbrands = exress.Router()
const upload = require("../middleware/upload")

const {
  Addretailbrands,
  Allretailbrands,
  Updateretailbrands,
  Deleteretailbrands,
}= require("../controller/retailbrands.con")

retailbrands.post("/add_retailbrands",upload.single("image"),Addretailbrands)
retailbrands.get("/getall_retailbrands",Allretailbrands)
retailbrands.put("/update_retailbrands/:id",upload.single("image"),Updateretailbrands)
retailbrands.delete("/delete_retailbrands/:id",Deleteretailbrands)


module.exports = retailbrands