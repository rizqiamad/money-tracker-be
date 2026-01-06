import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

export interface IMsUser {
  id?: string
  username?: string
  email?: string
  password?: string
  no_handphone?: string
  is_verified?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const MsUserModel = sq.define<Model<IMsUser>>(
  "ms_user",
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    },
    is_verified: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: "created_at", updatedAt: "updated_at", deletedAt: "deleted_at" }
)

export default MsUserModel
