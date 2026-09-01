const exress = require("express")
const events_router = exress.Router()
const upload = require("../middleware/upload")

const {Addevents,Allevents}= require("../controller/events.con")

events_router.post("/add_events",upload.single("image"),Addevents)
events_router.get("/getall_events",Allevents)


module.exports = events_router