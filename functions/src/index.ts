import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
// @ts-ignore
import * as cors from "cors";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "", // add credentials locally
        pass: "", // add credentials locally
    },
});

export const sendMail = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => {
        const { from, to, subject, html } = req.body;

        const mailOptions: any = {
            to: to,
            from: from,
            subject,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send(error.toString());
            }
            return res.send("Email sent: " + info.response);
        });
    });
});
