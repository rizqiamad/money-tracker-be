import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IUserAccount {
  id?: number
  ms_user_id?: string
  ms_account_code?: string
  amount?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const UserAccountModel = sq.define<Model<IUserAccount>>(
  "user_account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ms_user_id: {
      type: DataTypes.STRING,
      references: { model: "ms_user", key: "id" },
    },
    ms_account_code: {
      type: DataTypes.STRING,
      references: { model: "ms_account", key: "ms_account_code" },
    },
    amount: {
      type: DataTypes.BIGINT,
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

export default UserAccountModel
