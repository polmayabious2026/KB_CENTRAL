const exress = require("express")
const entertainmentleisure_router = exress.Router()
const upload = require("../middleware/upload")

const {
  Addentertainmentleisure,
  Allentertainmentleisure,
  Updateentertainmentleisure,
  Deleteentertainmentleisure,
}= require("../controller/entertainment_leisure.con")

entertainmentleisure_router.post("/add_entertainmentleisure",upload.single("image"),Addentertainmentleisure)
entertainmentleisure_router.get("/getall_entertainmentleisure",Allentertainmentleisure)
entertainmentleisure_router.put("/update_entertainmentleisure/:id",upload.single("image"),Updateentertainmentleisure)
entertainmentleisure_router.delete("/delete_entertainmentleisure/:id",Deleteentertainmentleisure)


module.exports = entertainmentleisure_router