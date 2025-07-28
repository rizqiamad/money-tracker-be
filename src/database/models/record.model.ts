import { DataTypes, Model } from "sequelize";
import { sq } from "../db";
import PoolAccountsUsersModel from "./poolAccountsUsers.model";

interface IRecordModel {
  id?: number;
  pool_accounts_users_id?: number;
  type?: "income" | "expenses";
  category?: "residence" | "meal" | "lifestyle" | "equipment" | "transportation" | "charity" | "health" | "salary" | "investment" | "freelance" | "internet" | "etc";
  amount?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const RecordModel = sq.define<Model<IRecordModel>>(
  "records",
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    pool_accounts_users_id: { type: DataTypes.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
    type: { type: DataTypes.ENUM("incomes", "expenses"), allowNull: false },
    category: { type: DataTypes.ENUM("residence", "meal", "lifestyle", "equipment", "transportation", "charity", "health", "salary", "investment", "freelance", "internet", "etc"), allowNull: false },
    amount: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
);

PoolAccountsUsersModel.hasMany(RecordModel, { foreignKey: "pool_accounts_users_id" });
RecordModel.belongsTo(PoolAccountsUsersModel);

export default RecordModel;
