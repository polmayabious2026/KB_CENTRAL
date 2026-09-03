const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const landmarkPointsModel = sequelize.define(
  "landmark_point",
  {
    landmark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    landmark: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    distance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "landmark_point",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports= landmarkPointsModel
