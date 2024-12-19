// * Libraries
import nodemailer from 'nodemailer'
import ejs from 'ejs'
import { htmlToText } from 'html-to-text'
import path from 'path'
import { getLoginLinkByEnv } from './misc'
// const nodemailerSendgrid = require('nodemailer-sendgrid');
export default class Email {
  constructor(user) {
    this.to = user?.email
    this.from = `${process.env.CLIENT_NAME} <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    // // if(process.env.NODE_ENV === 'production'){
    //     // Sendgrid
    // // const transport = nodemailer.createTransport(
    // //   nodemailerSendgrid({
    //  //     apiKey: 'your API KEY HERE'
    // //   })
    // // );
    // // }

    const smtpTransport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    return smtpTransport
  }

  async configureMailOptions({ template, subject, emailProps }) {
    const to = emailProps.toMultiple ? emailProps.toMultiple : this.to
    let mailOptions

    if (emailProps.serverError) {
      const { error } = emailProps
      mailOptions = {
        from: this.from,
        to,
        subject,
        html: error,
        text: htmlToText(error),
      }
      return mailOptions
    }

    const loginLink = getLoginLinkByEnv()
    emailProps.loginLink = loginLink
    console.log('EMAIL PROPS', emailProps)

    const res = await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
      emailProps,
      subject,
    })

    mailOptions = {
      from: this.from,
      to,
      subject,
      html: res,
      text: htmlToText(res),
    }
    emailProps.attachments ? (mailOptions['attachments'] = emailProps.attachments) : null

    return mailOptions
  }
  async send(template, subject, emailProps) {
    try {
      const mailOptions = await this.configureMailOptions({ template, subject, emailProps })

      // if (emailProps.serverError) {
      // }
      // const res = await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
      //   emailProps,
      //   subject,
      // })

      // const mailOptions = {
      //   from: this.from,
      //   to: emailProps.toMultiple ? emailProps.toMultiple : this.to,
      //   subject,
      //   html: res,
      //   text: htmlToText(res),
      // }

      // emailProps.attachments ? (mailOptions['attachments'] = emailProps.attachments) : null

      try {
        await this.newTransport().sendMail(mailOptions)
        console.log(`📧 Email sent successfully to:${mailOptions.to} subject:${subject}`)
      } catch (e) {
        console.log(`❎ Failed to send mail: ${e}`)
      }
    } catch (err) {
      console.log(`❎ Something went wrong in ejs render: ${err}`)
    }
  }

  async sendServerError(arg) {
    await this.send(null, `${arg?.isDevServer ? 'DEV' : 'PROD'} - ${process.env.CLIENT_NAME} : server error`, arg)
  }

  async sendForgotPassword(arg) {
    await this.send('forgot-password', 'Reset code', arg)
  }
  async welcomeToZeal(arg) {
    await this.send('welcome-to-zeal', 'Welcome to Zeal Fitness App', arg)
  }

  async registerAccount(arg) {
    await this.send('register', 'Registration Code', arg)
  }
}
