import 'dotenv/config';
import nodemailer from 'nodemailer';



let transporter;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log('Email server connection error:', error);
        } else {
            console.log('Email server is ready to take our messages');
        }
    });
} else {
    console.warn('Email server credentials (SMTP_USER, SMTP_PASS) are not configured in .env. Email functionality will be disabled.');
    // Create a mock transporter that does nothing
    transporter = {
        sendMail: () => Promise.resolve(console.log('Email not sent: Email service is not configured.'))
    };
}

export default transporter;

