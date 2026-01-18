import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IRecord {
  id?: number
  user_account_id?: number
  date_action?: Date
  amount?: number
  category?: string
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
    user_account_id: {
      type: DataTypes.INTEGER,
      references: { model: "user_account", key: "id" },
    },
    date_action: {
      type: DataTypes.DATE,
    },
    amount: {
      type: DataTypes.BIGINT,
    },
    category: {
      type: DataTypes.STRING,
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
