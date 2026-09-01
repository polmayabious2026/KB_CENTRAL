const exress = require("express")
const overview_router = exress.Router()

const {
  AddOverview,
  AllOverviews,
  UpdateOverview,
  DeleteOverview,
}= require("../controller/overview.con")

overview_router.post("/add_overview",AddOverview)
overview_router.get("/getall_overview",AllOverviews)
overview_router.put("/update_overview/:overview_id",UpdateOverview)
overview_router.delete("/delete_overview/:overview_id",DeleteOverview)


module.exports = overview_router