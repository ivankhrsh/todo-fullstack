import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const options = () => ({
      from: process.env.FROM_EMAIL,
      to: email,
      subject,
      text
    });

    // Send email
    transporter.sendMail(options(), (error: Error) => {
      if (error) {
        return error;
      }
      return { success: true };
    });
  } catch (error) {
    return error;
  }
};
