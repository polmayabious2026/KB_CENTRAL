const exress = require("express")
const entertainmentleisure_router = exress.Router()
const upload = require("../middleware/upload")

const {Addentertainmentleisure,Allentertainmentleisure}= require("../controller/entertainment_leisure.con")

entertainmentleisure_router.post("/add_entertainmentleisure",upload.single("image"),Addentertainmentleisure)
entertainmentleisure_router.get("/getall_entertainmentleisure",Allentertainmentleisure)


module.exports = entertainmentleisure_router