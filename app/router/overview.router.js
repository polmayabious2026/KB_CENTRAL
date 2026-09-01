const exress = require("express")
const overview_router = exress.Router()

const {AddOverview,AllOverviews}= require("../controller/overview.con")

overview_router.post("/add_overview",AddOverview)
overview_router.get("/getall_overview",AllOverviews)


module.exports = overview_router