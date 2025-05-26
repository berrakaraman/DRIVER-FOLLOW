//services/busS.js
const database = require("../models/database");
const { ObjectId } = require("mongodb");
const { CRUD } = require("../models/database");

const bussAdd = async function (req, res) {
  const check = await new database.CRUD("driverfollow", "buses").find({
    plate: req.body.plate,
  });
  if (!check || check.length === 0) {
    const buss = {
      buss_id: database.id(),
      plate: req.body.plate,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      productionYear: req.body.productionYear,
      seatCapacity: req.body.seatCapacity,
      fuelType: req.body.fuelType,
      engineNumber: req.body.engineNumber,
      vin: req.body.vin,
      registrationDate: req.body.registrationDate,
      gpsDeviceId: req.body.gpsDeviceId,
      status: req.body.status || 2,
    };
    await new database.CRUD("driverfollow", "buses").insert(buss);
  } else {
    return res.status(400).json({ message: "bus already exists" });
  }
};

const bussList = async function (req, res) {
  try {
    const bussList = await new database.CRUD("driverfollow", "buses").find();
    if (bussList.length > 0) {
      return res.json(bussList);
    } else {
      return res.status(404).json({ error: "Veri bulunamadı" });
    }
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};

const bussUpdate = async function (req, res) {
  try {
    const { _id, ...updates } = req.body;
    console.log("Updates Data:", updates);
    const filter = { _id: new ObjectId(_id) };
    const updateDoc = { $set: updates };
    const result = await new database.CRUD("driverfollow", "buses").update(
      filter,
      updateDoc
    );
    console.log("Result:", result);
    if (result.matchedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "bus updated", data: updates });
    } else {
      return res.status(404).json({ success: false, message: "bus not found" });
    }
  } catch (error) {
    console.error("bus update error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const bussDelete = async function (req, res) {
  const dele = { buss_id: req.params.buss_id };
  console.log("Silinecek buss_id:", dele.buss_id);
  try {
    const deleteCar = await new database.CRUD("driverfollow", "buses").delete(
      dele
    );
    console.log("Delete sonucu:", deleteCar);
    if (deleteCar.result !== 0) {
      return res.status(200).json({ Message: "Successful" });
    } else {
      return res.status(404).json({ Message: "Not Found" });
    }
  } catch (error) {
    console.error("Silme hatası:", error);
    return res.status(500).json({ Message: "Server error" });
  }
};

const bussSeferAdd = async function (req, res) {
  try {
    const { busNo, kalkis, varis, rows } = req.body;
    if (!Array.isArray(rows)) {
      return res
        .status(400)
        .json({ message: "Geçersiz veri: rows bir dizi olmalı." });
    }
    const seferCRUD = new CRUD("driverfollow", "bussSefer");
    const existing = await seferCRUD.find({ busNo });
    if (existing && existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Bu hatta ait sefer zaten kayıtlı." });
    }
    const seferDoc = {
      sefer_id: database.id(),
      busNo,
      kalkis,
      varis,
      rows,
    };

    const insertResult = await seferCRUD.insert(seferDoc);
    if (!insertResult) {
      throw new Error("Sefer ekleme başarısız");
    }

    return res
      .status(200)
      .json({ message: "Sefer başarıyla eklendi.", data: seferDoc });
  } catch (err) {
    console.error("Sefer ekleme hatası:", err);
    return res
      .status(500)
      .json({ message: "Bir hata oluştu.", error: err.message });
  }
};
const bussSeferList = async function (req, res) {
  try {
    const seferCRUD = new CRUD("driverfollow", "bussSefer");
    const list = await seferCRUD.find();

    if (list && list.length > 0) {
      return res.json(list);
    } else {
      return res.status(404).json({ error: "Veri bulunamadı" });
    }
  } catch (err) {
    console.error("Sefer listesi çekme hatası:", err);
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};
module.exports = {
  bussAdd,
  bussList,
  bussUpdate,
  bussDelete,
  bussSeferAdd,
  bussSeferList,
};
