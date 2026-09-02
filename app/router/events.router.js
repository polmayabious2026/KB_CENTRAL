const exress = require("express")
const events_router = exress.Router()
const upload = require("../middleware/upload")

const {
  Addevents,
  Allevents,
  Updateevents,
  Deleteevents,
}
= require("../controller/events.con")

events_router.post("/add_events",upload.single("image"),Addevents)
events_router.get("/getall_events",Allevents)
events_router.put("/update_events/:id",upload.single("image"),Updateevents)
events_router.delete("/delete_events/:id",Deleteevents)


module.exports = events_router