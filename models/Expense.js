const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema ({
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
    },
    year: {
        type: Number
    }
});

module.exports = mongoose.model('expenses', ExpenseSchema);