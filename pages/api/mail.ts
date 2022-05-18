import sendgrid from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.error('SENDGRID_API_KEY is not set');
}
    
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    const { from, to, subject, text } = req.body;

    const msg = {
        to: to,
        from: from,
        subject,
        html: text
    };

    try {
        await sendgrid.send(msg);
        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Email not sent' });
    }
};