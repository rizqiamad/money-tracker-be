import { DataTypes, Model } from "sequelize";
import { sq } from "../db";

interface IAccountModel {
  id?: number;
  account_name?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const AccountModel = sq.define<Model<IAccountModel>>(
  "accounts",
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    account_name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
);

export default AccountModel;
