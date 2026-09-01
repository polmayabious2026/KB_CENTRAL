const sequelize = require("../config/dB");
const { DataTypes } = require("sequelize");

const landmarkSchema = sequelize.define(
  "landmark",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    map_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark_4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance_4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark_5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance_5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "landmark",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = landmarkSchema;
