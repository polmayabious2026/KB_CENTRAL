const exress = require("express")
const ourlegacy_router = exress.Router()
const upload = require("../middleware/upload")

const {Addourlegacy,Allourlegacy,Updateourlegacy,Deleteourlegacy}= require("../controller/ourlegacy.con")

ourlegacy_router.post("/add_ourlegacy",Addourlegacy)
ourlegacy_router.get("/getall_ourlegacy",Allourlegacy)
ourlegacy_router.put("/update_ourlegacy/:id",Updateourlegacy)
ourlegacy_router.delete("/delete_ourlegacy/:id",Deleteourlegacy)


module.exports = ourlegacy_router