import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IUserAccount {
  id?: number
  ms_user_id?: string
  ms_account_code?: string
  amount?: number
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
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: false, updatedAt: false, deletedAt: "deleted_at" }
)

export default UserAccountModel
