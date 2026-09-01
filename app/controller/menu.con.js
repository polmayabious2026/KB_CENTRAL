const menu = require("../model/menu");
const submenu = require("../model/submenu");

const AddMenu = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Menu Name is required",
      });
    }
    const capitalName = name.trim().toUpperCase();
    const findExistingMenu = await menu.findOne({
      where: {
        name: capitalName,
      },
    });
    if (findExistingMenu) {
      return res.status(400).json({
        status: false,
        message: "Menu Name Already Exists",
      });
    }
    const newMenu = await menu.create({
      name: capitalName,
    });

    return res.status(201).json({
      status: true,
      message: "Menu Created Successfully",
      data: newMenu,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const FindAllMenu = async (req, res) => {
  try {
    const allMenus = await menu.findAll();
    return res.status(200).json({
      status: true,
      message: "All Menu Fetched Successfully",
      data: allMenus,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { name } = req.body;
    const findmenu = await menu.findByPk(menu_id);
    if (!findmenu) {
      return res.status(400).json({
        status: false,
        message: "Menu_id Not Present in db",
      });
    }
    const findExistingMenu = await menu.findOne({
      where: {
        name: name,
      },
    });
    if (findExistingMenu) {
      return res.status(400).json({
        status: false,
        message: "Menu Name Already Exists",
      });
    }
    const capitalName = name.trim().toUpperCase();
    const updateMenu = await menu.update(
      {
        name: capitalName,
      },
      {
        where: {
          id: menu_id,
        },
      },
    );
    const updateddata = await menu.findByPk(menu_id);
    return res.status(200).json({
      status: true,
      message: "Menu Updated Successfully",
      data: updateddata,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const DeleteMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const findmenu = await menu.findByPk(menu_id);
    if (!findmenu) {
      return res.status(400).json({
        status: false,
        message: "Menu_id Not Present in db",
      });
    }

    const destroySubMenu = await submenu.destroy({
      where: {
        menu_id: menu_id,
      },
    });

    const destroymenu = await menu.destroy({
      where: {
        id: menu_id,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Menu Delteted Susscessfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

module.exports = {
  AddMenu,
  FindAllMenu,
  UpdateMenu,
  DeleteMenu,
};
