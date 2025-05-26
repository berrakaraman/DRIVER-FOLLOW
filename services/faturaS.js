// controllers/fatura.js
const database = require("../models/database");
const faturaCreat = async function (req, res) {
  console.log("📝 faturaCreat req.body:", JSON.stringify(req.body, null, 2));

  try {
    const {
      invoice_id,
      status,
      buss_id,
      maintenanceType,
      date,
      invoice_detail = [],
      discount = 0,
      tax = 0,
      notes = "",
      box1 = "",
      box2 = "",
      box3 = "",
      quantity = 0,
      subtotal = 0,
      discountRate = 0,
      taxRate = 0,
      total = 0,
    } = req.body;
    const existing = await new database.CRUD("driverfollow", "fatura").find({
      invoice_id,
    });
    if (existing && existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Bu araç için zaten bir fatura mevcut." });
    }
    const fatura = {
      invoice_id: Number(invoice_id) || 0,
      buss_id: Number(buss_id) || 0,
      status: status || "",
      maintenanceType: maintenanceType || "",
      date: date ? new Date(date) : new Date(),
      invoice_detail: Array.isArray(invoice_detail) ? invoice_detail : [],
      discount: Number(discount) || 0,
      tax: Number(tax) || 0,
      notes,
      box1,
      box2,
      box3,
      quantity: Number(quantity) || 0,
      subtotal: Number(subtotal) || 0,
      discountRate: Number(discountRate) || 0,
      taxRate: Number(taxRate) || 0,
      total: Number(total) || 0,
    };

    await new database.CRUD("driverfollow", "fatura").insert(fatura);

    return res.status(201).json({
      message: "Fatura başarıyla oluşturuldu.",
      data: fatura,
    });
  } catch (err) {
    console.error("faturaCreat hata:", err);
    return res.status(500).json({
      error: "Sunucu hatası",
      details: err.message,
    });
  }
};

const faturaList = async (req, res) => {
  try {
    const items = await new database.CRUD("driverfollow", "fatura").find({});
    return res.status(200).json({ invoice: items });
  } catch (err) {
    console.error("faturaList hata:", err);
    return res
      .status(500)
      .json({ error: "Sunucu hatası", details: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const items = await new database.CRUD("driverfollow", "fatura").find({
      invoice_id: Number(id),
    });
    if (!items.length)
      return res.status(404).json({ message: "Fatura bulunamadı." });
    res.json({ data: items[0] });
  } catch (err) {
    console.error("getById hata:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteById = async function (req, res) {
  try {
    const { id } = req.params;
    console.log("Silinecek invoice_id:", id);
    const result = await new database.CRUD("driverfollow", "fatura").delete({
      invoice_id: Number(id),
    });
    console.log("Delete sonucu (raw):", JSON.stringify(result, null, 2));
    const count = result.deletedCount ?? result.result?.n ?? result.result ?? 0;
    if (count > 0) {
      return res.status(200).json({ message: "Fatura silindi." });
    } else {
      return res.status(404).json({ message: "Fatura bulunamadı." });
    }
  } catch (error) {
    console.error("deleteById hata:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { faturaCreat, faturaList, getById, deleteById };
