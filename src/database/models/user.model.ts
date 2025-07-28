import { DataTypes, Model } from "sequelize";
import { sq } from "../db";

interface IUserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  no_handphone?: string;
  is_verified?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const UserModel = sq.define<Model<IUserModel>>(
  "users",
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    no_handphone: { type: DataTypes.STRING },
    is_verified: { type: DataTypes.NUMBER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
);

export default UserModel;
