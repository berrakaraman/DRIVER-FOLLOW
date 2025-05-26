const database = require("../models/database");
const { ObjectId } = require("mongodb");

const driversAdd = async function (req, res) {
  const check = await new database.CRUD("driverfollow", "drivers").find({
    tcNumber: req.body.tcNumber,
  });
  if (!check || check.length === 0) {
    const drivers = {
      driver_id: database.id(),
      tcNumber: req.body.tcNumber,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      license_number: req.body.license_number,
      dob: req.body.dob,
      status: req.body.status,
      start_date: req.body.start_date,
      address: req.body.address,
    };
    await new database.CRUD("driverfollow", "drivers").insert(drivers);
  } else {
    return res.status(400).json({ message: "driver already exists" });
  }
};

const driversList = async function (req, res) {
  try {
    const driversList = await new database.CRUD(
      "driverfollow",
      "drivers"
    ).find();
    if (driversList.length) {
      return res.json(driversList);
    } else {
      return res.status(404).json({ error: "Veri bulunamadı" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Veritabanı hatası" });
  }
};
const driverDelete = async function (req, res) {
  const dele = { driver_id: req.params.driver_id };
  console.log("Silinecek driverId:", dele.driver_id);
  try {
    const deleteDrivers = await new database.CRUD(
      "driverfollow",
      "drivers"
    ).delete(dele);
    console.log("Delete sonucu:", deleteDrivers);
    if (deleteDrivers.result !== 0) {
      return res.status(200).json({ Message: "successful" });
    } else {
      return res.status(404).json({ Message: "not found" });
    }
  } catch (error) {
    console.error("Silme hatası:", error);
    return res.status(500).json({ Message: "server erorr" });
  }
};
const driverUpdate = async function (req, res) {
  try {
    const { _id, ...updates } = req.body;
    console.log("Updates Data:", updates);

    const filter = { _id: new ObjectId(_id) };
    const updateDoc = { $set: updates };

    const result = await new database.CRUD("driverfollow", "drivers").update(
      filter,
      updateDoc
    );

    console.log("Result:", result);
    if (result.matchedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Driver updated", data: updates });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }
  } catch (error) {
    console.error("Driver update error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = { driversAdd, driversList, driverDelete, driverUpdate };
