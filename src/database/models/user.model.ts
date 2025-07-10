import { DataTypes, Model } from "sequelize";
import { sq } from "../db";

interface IUserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  no_handphone: string;
  created_at?: Date;
  deleted_at?: Date;
}

const UserModel = sq.define<Model<IUserModel>>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_handphone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

export default UserModel;
