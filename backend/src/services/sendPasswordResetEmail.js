
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendPasswordResetEmail = async (user,email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const secret = process.env.JWT_SECRET;

    const href = () => {
        const token = jwt.sign({email: user.email, id: user.id}, secret, {expiresIn: '1h'})

        return `http://localhost:5173/password-recovery-page?token=${token}`;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Nouveau mot de passe',
        text : `
        Bonjour DeadlineDrive a reçu une demande de réinitialisation de mot de passe pour ton compte.
        Pour choisir un nouveau de passe, tu dois confirmer la réinitialisation : ${href()}. 
        Si tu ne souhaites pas réinitialiser 
        ton mot de passe, tu peux tout simplement ignorer ce courriel.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Le mail a bien été envoyé : ", info.response);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        throw error;
      }
    };

module.exports = {
    sendPasswordResetEmail,
  };