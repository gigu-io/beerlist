import nodemailer from "nodemailer";
import functions from "firebase/functions";

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

