/* eslint-disable no-unused-expressions */
const sgMail = require("@sendgrid/mail");
const config = require("../database/config/index");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const msg = {
  from: `Findate <${config.SENDGRID_EMAIL}>`,
  mail_settings: { sandbox_mode: { enable: false } }
};

() => {
  msg.mail_settings.sandbox_mode.enable = true;
};

const sendEmail = async (email, subject, message) => {
  try {
    msg.to = email;
    msg.subject = subject;
    msg.text = message;
    await sgMail.send(msg);
    console.log("message sent...");
  } catch (err) {
    return err;
  }
};

module.exports = sendEmail;
