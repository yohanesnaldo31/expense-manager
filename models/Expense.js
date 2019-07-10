const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ExpenseSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('expenses', ExpenseSchema);