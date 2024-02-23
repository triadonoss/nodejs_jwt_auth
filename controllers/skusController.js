const Sku = require('../model/Sku');

const getAllSkus = async (req, res) => {
    const skus = await Sku.find();
    if (!skus) return res.status(204).json({ 'message': 'No sku found.' });
    res.json(skus);
}

const createNewSku = async (req, res) => {
    if (!req?.body?.sku || !req?.body?.gtin || !req?.body?.lot ) {
        return res.status(400).json({ 'message': 'Sku, Gtin, and Lot numbers are required' });
    }

    try {
        const result = await Sku.create({
            sku: req.body.sku,
            gtin: req.body.gtin,
            lot: req.body.lot,
            quantity: req.body.quantity,
            printer: req.body.printer,
            template: req.body.template,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateSku = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const sku = await Sku.findOne({ _id: req.body.id }).exec();
    if (!sku) {
        return res.status(204).json({ "message": `No sku matches ID ${req.body.id}.` });
    }
    if (req.body?.sku) sku.sku = req.body.sku;
    if (req.body?.gtin) sku.gtin = req.body.gtin;
    if (req.body?.lot) sku.lot = req.body?.lot;
    if (req.body?.quantity) sku.quantity = req.body?.quantity;
    if (req.body?.printer) sku.printer = req.body?.printer;
    if (req.body?.template) sku.template = req.body?.template;
    const result = await sku.save();
    res.json(result);
}

const deleteSku = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Sku ID required.' });

    const sku = await Sku.findOne({ _id: req.body.id }).exec();
    if (!sku) {
        return res.status(204).json({ "message": `No sku matches ID ${req.body.id}.` });
    }
    const result = await sku.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getSku = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Sku ID required.' });

    const sku = await Sku.findOne({ _id: req.params.id }).exec();
    if (!sku) {
        return res.status(204).json({ "message": `No sku matches ID ${req.params.id}.` });
    }
    res.json(sku);
}

module.exports = {
    getAllSkus,
    createNewSku,
    updateSku,
    deleteSku,
    getSku
}