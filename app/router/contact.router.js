const exress = require("express")
const contact = exress.Router()
const upload = require("../middleware/upload")

const {
  Addcontact,
  Allcontact,
  Updatecontact,
  Deletecontact,
}= require("../controller/contact.con")

contact.post("/add_contact",upload.single("image"),Addcontact)
contact.get("/getall_contact",Allcontact)
contact.put("/update_contact/:id",upload.single("image"),Updatecontact)
contact.delete("/delete_contact/:id",Deletecontact)


module.exports = contact