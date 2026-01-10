import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IMsAccount {
  ms_account_code?: string
  ms_account_name?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const MsAccountModel = sq.define<Model<IMsAccount>>(
  "ms_account",
  {
    ms_account_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ms_account_name: {
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

export default MsAccountModel
