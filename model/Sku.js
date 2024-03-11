const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skuSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    gtin: {
        type: String,
        required: true
    },
    lot: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: false
    },
    printer: {
        type: String,
        required: false
    },
    template: {
        type: String,
        required: false
    }
});
skuSchema.set('autoIndex', false)
skuSchema.index({sku:'text',lot:'text'})
const skuIndex = mongoose.model('Sku', skuSchema)
skuIndex.createIndexes()

module.exports = mongoose.model('Sku', skuSchema);