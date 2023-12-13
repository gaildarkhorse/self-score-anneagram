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

import Conversion from "phantom-html-to-pdf"
const conversion = Conversion();
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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
    // tls:{
    //     minVersion: 'TLSv1.3',
    // }
})

var options = { format: 'A3' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('report.pdf', (err) => {
        if (err) {
            console.log('>>> create pdf-file error: ', err)
            res.send(Promise.reject());
        } else {
            console.log('>>> pdf file create succeed')
            const mailOptions = {
                from: EMAIL_FROM,
                to: EMAIL_TO,
                subject: 'Report from ',
                text: 'hello',
                // attachments: [{
                //     filename: 'report.pdf',
                //     path: `${__dirname}/report.pdf`
                // }]
            };
            console.log ('transporter ===>', transporter)
            console.log('>>> mail option setting succeed')
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('>>> Error:', error);
                    return res.status(400).json(error);
                } else {
                    console.log('>>> Email sent:', info.response);
                }
            });
        }

    });


});


app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('report.pdf', (err) => {
        if (err) {
            console.log('>>> create pdf-file error: ', err)
            res.send(Promise.reject());
        }
        else res.send(Promise.resolve());
    });
    console.log('>>> pdf create succeed')
    // conversion({ html: pdfTemplate(req.body), paperSize:{format:'A4'}}, function(err, pdf) {
    //     var output = fs.createWriteStream('./invoice.pdf')
    //     if (err) {
    //         console.log('>>> create pdf-file error: ', err)
    //         res.send({success: false});
    //     } else {
    //         pdf.stream.pipe(output);
    //         res.send({success: true});
    //     }
    //   });


});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/report.pdf`)
})

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
})

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

