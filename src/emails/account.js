
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendwelcomeemail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'nandini200400@gmail.com',
    subject: 'Thanks for joining in',
    text: 'Welcome to the app ,name.Let me know how you get along'
  })
}
const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'nandini200400@gmail.com',
    subject: 'Thanks for joining in',
    text: 'WEcome'
  })
}
module.exports = {
  sendwelcomeemail,
  sendCancellationEmail
}
/* const msg =
 {
  to: 'nandini200400@gmail.com',
  from: 'nandini200400@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}; */
// sgMail.send(msg);
