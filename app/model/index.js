const sequelize = require("../config/dB")

const websitelogo = require("../model/websitelogo")
const menu = require("../model/menu")
const submenu = require("../model/submenu")
const coverphoto = require("../model/coverphotos")
const strategicadvantages = require("../model/strategic-advantages")
const commercialecosystem = require("../model/commercial-ecosystem")
const brands = require("../model/brands")
const diningexperiences = require("../model/dining-experiences")
const floorplans = require("../model/floor-plans")
const walkthrough = require("../model/walkthrough")
const leisureexperiences= require("../model/leisure-experiences")
const Landmark = require("../model/landmark")
const LandmarkPoint = require("../model/landmark_points")
const overview = require("../model/overview")
const locationadvantages = require("../model/location_advantages")
const connectivity = require("../model/connectivity")
const projecthighlight = require("../model/project-highlight")
const retailbrands = require("../model/retail&brands")
const globalfashion = require("./globalfashion")
const accessorylabel = require("./accessory-labels")
const finedining = require("./fine-dining")
const wellness = require("./wellness")
const events = require("./events")
const experiences = require("./experience")
const amenities = require("./amenities")
const powerbackup = require("./power-backup")
const accessibility = require("./accessibility")
const accessibilityPoints = require("./accessibilitypoints")
const smartfeatures = require("./smart-features")
const aboutavoragroup = require("./aboutavora-group")
const ourlegacy = require("./our-legacy")
const visionphilosophy = require("./vision&philosophy")
const contact = require("./contact")
const admin = require("./admin.model")





// landmark
Landmark.hasMany(LandmarkPoint, {
  foreignKey: "landmark_id",
  as: "landmarks",
});

LandmarkPoint.belongsTo(Landmark, {
  foreignKey: "landmark_id",
  as: "map",
});
// accessibility
accessibility.hasMany(accessibilityPoints, {
  foreignKey: "accessibility_id",
  as: "accessibilityPoints",
});
accessibilityPoints.belongsTo(accessibility, {
  foreignKey: "accessibility_id",
  as: "accessibility",
});


sequelize.sync()
.then(()=>console.log("Db Synced Successfully"))
.catch((err)=>console.log("Db Sync Failed ",err))
