const submenu = require("../model/submenu");

const AddSubMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "SubMenu Name is required",
      });
    }
    if (!menu_id) {
      return res.status(400).json({
        status: false,
        message: "Menu_id is required",
      });
    }
    const capitalSubName = name.trim().toUpperCase();
    const findExistingMenu = await submenu.findOne({
      where: {
        name: capitalSubName,
      },
    });
    if (findExistingMenu) {
      return res.status(400).json({
        status: false,
        message: "SubMenu Name Already Exists",
      });
    }
    const newSubMenu = await submenu.create({
      name: capitalSubName,
      menu_id: menu_id,
    });

    return res.status(201).json({
      status: true,
      message: "SubMenu Created Successfully",
      data: newSubMenu,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const FindAllSubMenu = async (req, res) => {
  try {
    const allSubMenus = await submenu.findAll();
    return res.status(200).json({
      status: true,
      message: "All SubMenus Fetched Successfully",
      data: allSubMenus,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const FindSubMenuById = async (req, res) => {
  try {
    const {menu_id} = req.params;
    if(!menu_id){
      return res.status(400).json({
        status: false,
        message: "Menu_id is required",
      });
    } 
    const allSubMenus = await submenu.findAll({
      where:{
        menu_id:menu_id,
      }
  });
    return res.status(200).json({
      status: true,
      message: "All SubMenus Under This Menu Fetched Successfully",
      data: allSubMenus,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const UpdateSubMenu = async (req, res) => {
  try {
    const { submenu_id } = req.params;
    const { name } = req.body;
    const findsubmenu = await submenu.findByPk(submenu_id);
    if (!findsubmenu) {
      return res.status(400).json({
        status: false,
        message: "Submenu_id Not Present in db",
      });
    }
    const findExistingMenu = await submenu.findOne({
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
    const capitalname = name.trim("").toUpperCase();
    const updateSubMenu = await submenu.update(
      {
        name: capitalname,
      },
      {
        where: {
          id: submenu_id,
        },
      },
    );
    const updateddata = await submenu.findByPk(submenu_id);
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
const DeleteSubMenu = async (req, res) => {
  try {
    const { submenu_id } = req.params;
    const findsubmenu = await submenu.findByPk(submenu_id);
    if (!findsubmenu) {
      return res.status(400).json({
        status: false,
        message: "Submenu_id Not Present in db",
      });
    }

    const destroySubMenu = await submenu.destroy({
      where: {
        id: submenu_id,
      },
    });
    return res.status(200).json({
      status: true,
      message: "SubMenu Delteted Susscessfully",
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
  AddSubMenu,
  FindAllSubMenu,
  FindSubMenuById,
  UpdateSubMenu,
  DeleteSubMenu,
};
