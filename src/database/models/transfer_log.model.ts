import { DataTypes, Model } from "sequelize";
import { sq } from "../db";
import PoolAccountsUsersModel from "./pool_accounts_users.model";

interface ITransferLogModel {
  id?: number;
  pool_accounts_users_from_id: number;
  amount_sent: number;
  pool_accounts_users_to_id: number;
  amount_received: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const TransferLogModel = sq.define<Model<ITransferLogModel>>(
  "transfer_logs",
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    pool_accounts_users_from_id: { type: DataTypes.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
    amount_sent: { type: DataTypes.INTEGER, defaultValue: 0 },
    pool_accounts_users_to_id: { type: DataTypes.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
    amount_received: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE, defaultValue: null },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
);

PoolAccountsUsersModel.hasMany(TransferLogModel, { foreignKey: "pool_accounts_users_from_id" });
PoolAccountsUsersModel.hasMany(TransferLogModel, { foreignKey: "pool_accounts_users_to_id" });
TransferLogModel.belongsTo(PoolAccountsUsersModel);

export default TransferLogModel;
