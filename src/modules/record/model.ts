import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IRecord {
  id?: number
  from_user_account_id?: number
  to_user_account_id?: number
  date_action?: Date
  type?: string
  amount?: number
  sub_category_code?: string
  description?: string
  created_at?: Date
}

const RecordModel = sq.define<Model<IRecord>>(
  "record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_user_account_id: {
      type: DataTypes.INTEGER,
      references: { model: "user_account", key: "id" },
    },
    to_user_account_id: {
      type: DataTypes.INTEGER,
      references: { model: "user_account", key: "id" },
    },
    date_action: {
      type: DataTypes.DATEONLY,
    },
    type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.BIGINT,
    },
    sub_category_code: {
      type: DataTypes.STRING,
      references: { model: "sub_category", key: "sub_category_code" },
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: "created_at", updatedAt: false, deletedAt: false }
)

export default RecordModel
