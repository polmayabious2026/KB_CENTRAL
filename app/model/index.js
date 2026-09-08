const sequelize = require("../config/dB")

const websitelogo = require("../model/websitelogo")
const menu = require("../model/menu")
const submenu = require("../model/submenu")
const about = require("../model/about")
const aboutoption = require("../model/aboutoption")
const coverphoto = require("../model/coverphotos")
const strategicadvantages = require("../model/strategic-advantages")
const strategicoption = require("../model/strategicadvantages-options")
const commercialecosystem = require("../model/commercial-ecosystem")
const commercialoption = require("../model/commercialoptions")
const brands = require("../model/brands")
const brandlogooption = require("../model/brandlogooption")
const diningexperiences = require("../model/dining-experiences")
const diningLogo = require("../model/dininglogooption")
const wellnessspaces = require("../model/wellness-spaces")
const wellnessspaceoptions = require("../model/wellspacesoption")
const floorplans = require("../model/floor-plans")
const walkthrough = require("../model/walkthrough")
const leisureexperiences= require("../model/leisure-experiences")
const leisureoptions= require("../model/leisureoptions")
const Landmark = require("../model/landmark")
const LandmarkPoint = require("../model/landmark_points")

const project_vision = require("../model/project_vission")
const key_highlights_option = require("../model/key_highlights_points")


const retailbrands = require("../model/retail&brands")
const globalfashion = require("./globalfashion")
const globalfashionoption = require("./globalfashionoption")
const accessorylabel = require("./accessory-labels")
const accessorylabeloption = require("./accessorylablesoption")
const finedining = require("./fine-dining")
const finediningoption = require("./finediningoption")
const experiences = require("./experience")

const amenities = require("./amenities")
const accessibility = require("./accessibility")
const accessibilityPoints = require("./accessibilitypoints")
const smartfeatures = require("./smart-features")
const smartfeaturesoption = require("./smartfeatureoption")

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
// key_highlight(project_vision)
project_vision.hasMany(key_highlights_option, {
  foreignKey: "projectvision_id",
  as: "key_highlights",
});

key_highlights_option.belongsTo(project_vision, {
  foreignKey: "projectvision_id",
  as: "projectvision",
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

// strategy-advantages
strategicadvantages.hasMany(strategicoption, {
  foreignKey: "strategic_id",
  as: "strategicoption",
});
strategicoption.belongsTo(strategicadvantages, {
  foreignKey: "strategic_id",
  as: "strategicadvantages",
});
// commercial-ecosystem
commercialecosystem.hasMany(commercialoption, {
  foreignKey: "commercial_id",
  as: "commercialoption",
});
commercialoption.belongsTo(commercialecosystem, {
  foreignKey: "commercial_id",
  as: "commercialecosystem",
});

// brand
brands.hasMany(brandlogooption, {
  foreignKey: "brand_id",
  as: "brandoption",
});
brandlogooption.belongsTo(brands, {
  foreignKey: "brand_id",
  as: "brand",
});
// dining-experience
diningexperiences.hasMany(diningLogo, {
  foreignKey: "dining_id",
  as: "diningoption",
});
diningLogo.belongsTo(diningexperiences, {
  foreignKey: "dining_id",
  as: "diningexperience",
});
// wellness-spaces
wellnessspaces.hasMany(wellnessspaceoptions, {
  foreignKey: "  wellnessspaces_id",
  as: "brandlogooption",
});
wellnessspaceoptions.belongsTo(wellnessspaces, {
  foreignKey: "  wellnessspaces_id",
  as: "wellnessspaces",
});
// lesire-experience
leisureexperiences.hasMany(leisureoptions, {
  foreignKey: "leisure_id",
  as: "options",
});

leisureoptions.belongsTo(leisureexperiences, {
  foreignKey: "leisure_id",
  as: "leisure",
});

// about
about.hasMany(aboutoption, {
  foreignKey: "about_id",
  as: "descriptions",
});

aboutoption.belongsTo(about, {
  foreignKey: "about_id",
  as: "about",
});
// globalfashion
globalfashion.hasMany(globalfashionoption, {
  foreignKey: "global_fashion_id",
  as: "globalfashionoptions",
});

globalfashionoption.belongsTo(globalfashion, {
  foreignKey: "global_fashion_id",
  as: "globalfashion",
});
// accessorylabels
accessorylabel.hasMany(accessorylabeloption, {
  foreignKey: "accessorylabel_id",
  as: "accessorylabeloptions",
});

accessorylabeloption.belongsTo(accessorylabel, {
  foreignKey: "accessorylabel_id",
  as: "accessorylabel",
});
// finedining
finedining.hasMany(finediningoption, {
  foreignKey: "finedining_id",
  as: "finediningoptions",
});

finediningoption.belongsTo(finedining, {
  foreignKey: "finedining_id",
  as: "finedining",
});

// smartfeature
smartfeatures.hasMany(smartfeaturesoption, {
  foreignKey: "smartfeature_id",
  as: "smartfeatureoptions",
});

smartfeaturesoption.belongsTo(smartfeatures, {
  foreignKey: "smartfeature_id",
  as: "smartfeatures",
});


sequelize.sync()
.then(()=>console.log("Db Synced Successfully"))
.catch((err)=>console.log("Db Sync Failed ",err))
