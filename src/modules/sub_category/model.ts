import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface ISubCategory {
  sub_category_code?: string
  ms_category_code?: string
  sub_category_name?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const SubCategoryModel = sq.define<Model<ISubCategory>>(
  "sub_category",
  {
    sub_category_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ms_category_code: {
      type: DataTypes.STRING,
      references: { model: "ms_category", key: "ms_category_code" },
    },
    sub_category_name: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
)

export default SubCategoryModel
