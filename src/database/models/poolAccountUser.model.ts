import { DataTypes, Model } from "sequelize";
import { sq } from "../db";
import UserModel from "./user.model";
import AccountModel from "./account.model";

interface IPoolAccountsUsersModel {
  id?: number;
  user_id?: number;
  account_id?: number;
  total_balance?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const PoolAccountsUsersModel = sq.define<Model<IPoolAccountsUsersModel>>(
  "pool_accounts_users",
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { key: "id", model: "users" } },
    account_id: { type: DataTypes.INTEGER, allowNull: false, references: { key: "id", model: "accounts" } },
    total_balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE, defaultValue: null },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
);

UserModel.hasMany(PoolAccountsUsersModel, { foreignKey: "user_id" });
PoolAccountsUsersModel.belongsTo(UserModel, { foreignKey: "user_id" });

AccountModel.hasMany(PoolAccountsUsersModel, { foreignKey: "account_id" });
PoolAccountsUsersModel.belongsTo(AccountModel, { foreignKey: "account_id" });

export default PoolAccountsUsersModel;
