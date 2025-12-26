import { google } from "googleapis"
import nodemailer, { TransportOptions } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { CustomError } from "./error"

export async function createTransporter() {
  const oauth2Client = new google.auth.OAuth2(process.env.EMAIL_CLIENT_ID, process.env.EMAIL_CLIENT_SECRET, process.env.EMAIL_REDIRECT_URI)

  oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN,
  })

  const { token } = await oauth2Client.getAccessToken()
  if (!token) {
    throw new CustomError(502, "failed to get access token")
  }

  const transportOptions: SMTPTransport.Options = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: token,
    },
  }

  return nodemailer.createTransport(transportOptions)
}

export async function sendEmail(options: SMTPTransport.MailOptions) {
  try {
    const transporter = await createTransporter()
    await transporter.sendMail(options)
  } catch (err) {
    throw new CustomError(502, "transporter failed to send mail")
  }
}
