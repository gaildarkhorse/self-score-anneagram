import mongoose from 'mongoose'

const InvoiceSchema = mongoose.Schema({
    date: Date,
    quizState: Array,
    notes: String,
    invoiceNumber: String,
    creator: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    totalCount:Number,
    limitCount:Number,
})

const InvoiceModel = mongoose.model('InvoiceModel', InvoiceSchema)
export default InvoiceModel