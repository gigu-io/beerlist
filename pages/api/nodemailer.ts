import nodemailer from 'nodemailer';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const { from, to, subject, text } = req.body;

    const msg = {
        to: to,
        from: from,
        subject,
        html: text
    };

    try {
        await transporter.sendMail(msg).then(() => {
            res.status(200).json({ message: 'Email sent' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Email not sent' });
    }
};