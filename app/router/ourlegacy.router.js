const exress = require("express")
const ourlegacy_router = exress.Router()
const upload = require("../middleware/upload")

const {Addourlegacy,Allourlegacy}= require("../controller/ourlegacy.con")

ourlegacy_router.post("/add_ourlegacy",Addourlegacy)
ourlegacy_router.get("/getall_ourlegacy",Allourlegacy)


module.exports = ourlegacy_router