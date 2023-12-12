//Copyright (c) 2023 darkhorse

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
//import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import pdf from 'html-pdf'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import userRoutes from './routes/userRoutes.js'

import profile from './routes/profile.js'
import pdfTemplate from './documents/index.js'
// import invoiceTemplate from './s/invoice.js'

import { SMTP_PASS, SMTP_HOST, SMTP_USER, SMTP_PORT, EMAIL_FROM, EMAIL_TO } from './config/constants.js'
import { DB_URL, PORT } from './config/constants.js'

const app = express()
//dotenv.config()

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))

app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/users', userRoutes)
app.use('/profiles', profile)

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
    
})



var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
    console.log('>>> pdf file create succeed')
    const mailOptions = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Report from ',
        text: 'hello',
        // html: req.body,
        attachments: [{
            filename: 'invoice.pdf',
            path: `${__dirname}/invoice.pdf`
        }]
    };
    console.log('>>> mail option setting succeed')
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('>>> Error:', error);
            return res.status(400).json(error);
        } else {
            console.log('>>> Email sent:', info.response);
        }
    });
});


app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`)
})

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
})

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

