const nodemailer = require("nodemailer")


const EMAIL = {
    authUser: process.env.AUTH_EMAIL_USERNAME,
    authPass: process.env.AUTH_EMAIL_PASSWORD,
};


async function main(mailOptions) {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: EMAIL.authUser,
            pass: EMAIL.authPass,
        },
    });

    const info = await transporter.sendMail({
        from: mailOptions?.from,
        to: mailOptions?.to,
        subject: mailOptions?.subject,
        text: mailOptions?.text,
        html: mailOptions?.html,
    });
    return info;
}

module.exports = main;
