const express = require("express");
const menu_router = express.Router();

const {
  AddMenu,
  FindAllMenu,
  UpdateMenu,
  DeleteMenu,
} = require("../controller/menu.con");

// add /api/admin before routes
menu_router.post("/add_menu", AddMenu);
menu_router.get("/getall_menu", FindAllMenu);
menu_router.put("/update_menu/:menu_id", UpdateMenu);
menu_router.delete("/delete_menu/:menu_id", DeleteMenu);

module.exports = menu_router;
