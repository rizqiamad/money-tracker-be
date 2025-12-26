import { DataTypes, Model } from "sequelize"
import { sq } from "../../config/connection"

interface IUserOtp {
  id?: number
  ms_user_id?: string
  otp?: string
  otp_type?: "email" | "no_handphone"
  expired_at?: Date
  used_at?: Date
  created_at?: Date
}

const UserOtpModel = sq.define<Model<IUserOtp>>(
  "user_otp",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ms_user_id: {
      type: DataTypes.UUID,
      references: { model: "ms_user", key: "id" },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_type: {
      type: DataTypes.STRING,
    },
    expired_at: {
      type: DataTypes.DATE,
    },
    used_at: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: "created_at", updatedAt: false, deletedAt: false }
)

export default UserOtpModel
