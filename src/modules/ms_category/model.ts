import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IMsCategory {
  ms_category_code?: string
  ms_category_name?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const MsCategoryModel = sq.define<Model<IMsCategory>>(
  "ms_category",
  {
    ms_category_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ms_category_name: {
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

export default MsCategoryModel
