import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { google } from "googleapis";

export async function createTransport() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.ACCOUNT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export async function sendEmail(mailOption: Mail.Options) {
  const info = await transporter.sendMail(mailOption);

  console.log(info);
}
