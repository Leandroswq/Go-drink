"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class salesProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.sales.belongsToMany(models.products, {
        as: 'Products',
        through: salesProducts,
        foreignKey: 'sale_id',
        other_key: "product_id",
      });

      models.products.belongsToMany(models.sales, {
        as: 'Sales',
        through: salesProducts,
        foreignKey: 'product_id',
        other_key: 'sale_id',
      });
    }
  }
  salesProducts.init(
    {
      sale_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      product_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "salesProducts",
      timestamps: false,
    }
  );
  return salesProducts;
};
