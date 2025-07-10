import { DataTypes, Model } from "sequelize";
import { sq } from "../db";
import AccountModel from "./account.model";

interface IRecordModel {
  id?: number;
  account_id: number;
  type: "Expenses" | "Income";
  category:
    | "Equipment"
    | "Lifestyle"
    | "Meal"
    | "Residence"
    | "Transportation"
    | "Internet"
    | "ETC"
    | "Charity"
    | "Freelance"
    | "Salary"
    | "Health"
    | "Investment";
  amount: number;
  description: string;
  created_at?: Date;
}

const RecordModel = sq.define<Model<IRecordModel>>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "accounts", key: "id" },
    },
    type: {
      type: DataTypes.ENUM("Expenses", "Income"),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "Equipment",
        "Lifestyle",
        "Meal",
        "Residence",
        "Transportation",
        "Internet",
        "ETC",
        "Charity",
        "Freelance",
        "Salary",
        "Health",
        "Investment"
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true, updatedAt: false, createdAt: "created_at" }
);

AccountModel.hasMany(RecordModel, { foreignKey: "account_id" });
RecordModel.belongsTo(AccountModel, { foreignKey: "account_id" });

export default RecordModel;
