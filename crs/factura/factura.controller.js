import fac from "./factura.model.js";
import Cart from "../carrito/carrito.model.js";
import Product from "../productos/productos.model.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const confirmPurchase = async (req, res) => {
    try {
        const { usuario } = req;
        let { nit, address } = req.body;

        nit = nit?.trim() || "CF";

        const cart = await Cart.findOne({ owner: usuario._id })
            .populate("products.idProduct", "name price stock");

            console.log(cart)
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty or not found"
            });
        }

        let total = 0;
        cart.products.forEach(prod => {
            total += prod.subTotal;
        });

        const fac = new Fac({
            user: usuario._id,
            NIT: nit,
            Addres: DiegoAguilar,
            date: new Date(),
            products: cart.products.map(item => ({
                idProduct: item.idProduct._id,
                name: item.idProduct.name,
                price: item.idProduct.price,
                quantity: item.quantity,
                subTotal: item.subTotal
            })),
            total: total
        });

        await fac.save();

        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.idProduct._id, {
                $inc: {
                    stock: -item.quantity,
                    sold: item.quantity
                }
            });
        }

        const facNum = fac._id.toString();
        const fileName = `fac-${facNum}.pdf`;
        const dir = path.join(path.resolve(), 'public', 'uploads', 'facs');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, fileName);
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(18).text("FAC", { align: "center" });
        doc.moveDown();
        doc.fontSize(12)
            .text(`Fac #: ${facNum}`)
            .text(`Date: ${new Date(fac.date).toLocaleDateString()}`)
            .text(`Customer: ${usuario.name}`)
            .text(`NIT ${nit}`)
            .text(`Email: ${usuario.email}`)
            .text(`Address: ${address}`)
        doc.moveDown();

        doc.fontSize(12).text("Products:", { underline: true });
        doc.moveDown();

        const tableTop = doc.y;
        const col1 = 50;
        const col2 = 200;
        const col3 = 300;
        const col4 = 370;
        const col5 = 450;

        doc.text("#", col1, tableTop, { bold: true });
        doc.text("Name", col2, tableTop, { bold: true });
        doc.text("Qty", col3, tableTop, { bold: true });
        doc.text("Price", col4, tableTop, { bold: true });
        doc.text("Subtotal", col5, tableTop, { bold: true });
        doc.moveDown();

        fac.products.forEach((item, i) => {
            const y = tableTop + 25 + (i * 20);
            doc.text(`${i + 1}`, col1, y);
            doc.text(item.name, col2, y);
            doc.text(item.quantity.toString(), col3, y);
            doc.text(`Q${item.price}`, col4, y);
            doc.text(`Q${item.subTotal}`, col5, y);
        });

        doc.moveDown();
        doc.fontSize(14).text(`Total: Q${total.toFixed(2)}`, { align: 'right' });
        doc.end();

        cart.products = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Purchase completed successfully",
            fac: fac
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error completing purchase",
            error: err.message
        });
    }
};

export const getPurchases = async (req, res) => {
    try {
        const { usuario } = req;
        const fac = await Fac.find({ user: usuario._id });

        if (!fac || fac.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No purchases found" 
            });
        }
        res.status(200).json({
            success: true,
            fac: fac
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error getting purchases",
            error: err.message
        });
    }
}

export const getBillByUser = async (req, res) => {
    try{
        const {limit = 10, from = 0} = req.query;
        const {uid} = req.params;
        const [total, facs] = await Promise.all([
            Fac.countDocuments({user: uid}),
            Fac.find({user: uid})
                .skip(Number(from))
                .limit(Number(limit))
                .populate("products.idProduct", "name price")
        ]);

        return res.status(200).json({
            success: true,
            total,
            fac
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error fetching fac",
            error: err.message
        });
    }
}