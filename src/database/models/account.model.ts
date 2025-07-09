import { DataTypes, Model } from "sequelize";
import { sq } from "../db";
import UserModel from "./user.model";

interface IAccountModel {
  id: number;
  user_id: number;
  account_name: string;
  total_balance: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

const AccountModel = sq.define<Model<IAccountModel>>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true, updatedAt: "updated_at", createdAt: "created_at", paranoid: true }
);

UserModel.hasMany(AccountModel, { foreignKey: "user_id" });
AccountModel.belongsTo(UserModel, { foreignKey: "user_id" });

export default AccountModel;
