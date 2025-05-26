// All Database functions are here
const database = require("../models/database");
const time = require("../helpers/date");
const axios = require("axios");

const workingStartTime = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (asdf[0] && asdf[0].finishh == 0) {
      return res.status(403).json({ Message: "yeniden giriş yapamazsınız" });
    }
    if (asdf[0] && time.days(asdf[0].startt) == time.days(time.timestamp())) {
      return res
        .status(403)
        .json({ Message: "aynı gün içinde iki kere giriş yapılamaz" });
    }
    if (time.date(time.timestamp()) < "09:00") {
      return res.status(403).json({ Message: "Game Over! Turn Your Village" });
    }
    var start = time.timestamp();
    var finish = 0;
    var breakStart = 0;
    var breakFinish = 0;
    var tarih = time.dateTime();
    var days = time.days(time.timestamp());
    var ekle = {
      driver_id: req.body.driver_id,
      startt: start,
      finishh: finish,
      breakStartt: breakStart,
      breakFinishh: breakFinish,
      tarihh: tarih,
      dayss: days,
    };
    new database.CRUD("driverfollow", "time").insert(ekle);
    return res.status(200).json({ Message: "added" });
  } catch (error) {
    return res.json(error);
  }
};
const workingFinishTime = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (
      asdf[0].breakStartt == 0 ||
      asdf[0].startt == 0 ||
      asdf[0].breakFinishh == 0
    ) {
      return res.status(403).json({ Message: "Didn't add" });
    }
    var finish = time.timestamp();
    new database.CRUD("driverfollow", "time").update(
      { driver_id: req.body.driver_id, dayss: day },
      { $set: { finishh: finish } }
    );
    return res.status(200).json({ Message: "added" });
  } catch (error) {
    return res.json(error);
  }
};
const workingTime = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });

    if (asdf[0].startt == 0 || asdf[0].finishh == 0) {
      return res.status(403).json({ Message: "Start Didn't add" });
    } else {
      var workStart = asdf[0].startt;
      var workFinish = asdf[0].finishh;
      var breakStart = asdf[0].breakStartt;
      var breakFinish = asdf[0].breakFinishh;
      var result = workFinish - workStart;
      var breakResult = breakFinish - breakStart;
      let End = result - breakResult;
      if (End > 32) {
        return res.json(
          End +
            " saniye" +
            " (9 saatin üzerindeki mesailere ücret ödenmeyecektir)"
        );
      } else {
        return res.json(End + " saniye");
      }
    }
  } catch (error) {
    return res.json(error);
  }
};

const workingMoney = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (asdf[0].startt == 0 || asdf[0].finishh == 0) {
      return res.json("Start Didn't add");
    } else {
      var workStart = asdf[0].startt;
      var workFinish = asdf[0].finishh;
      var breakStart = asdf[0].breakStartt;
      var breakFinish = asdf[0].breakFinishh;
      var result = workFinish - workStart;
      var breakResult = breakFinish - breakStart;
      let End = result - breakResult;
      let end = End * 0.02257 + " tl";
      return res.json(end);
    }
  } catch (error) {
    return res.json(error);
  }
};

const breakTimeStart = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (asdf[0].startt == 0 || asdf[0].breakStartt != 0) {
      return res.status(403).json({ Message: "Start Didn't add" });
    }
    var start = time.timestamp();
    new database.CRUD("driverfollow", "time").update(
      { driver_id: req.body.driver_id, dayss: day },
      { $set: { breakStartt: start } }
    );
    return res.json("added");
  } catch (error) {
    return res.json(error);
  }
};

const breakTimeFinish = async function (req, res) {
  try {
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (asdf[0].startt == 0 || asdf[0].breakStartt == 0) {
      return res.json("Start Didn't add");
    } else {
      var finish = time.timestamp();
      new database.CRUD("driverfollow", "time").update(
        { driver_id: req.body.driver_id, dayss: day },
        { $set: { breakFinishh: finish } }
      );
      return res.json("added");
    }
  } catch (error) {
    return res.json(error);
  }
};

const exchange = async function (req, res) {
  try {
    const url = "https://finans.truncgil.com/today.json";
    const response = await axios.get(url);
    var brm = req.body.birim;
    for (const key in response.data) {
      if (key === brm) {
        var Currency = response.data[key].Satış;
        console.log(Currency);
      }
    }
    let Id = req.body.driver_id;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD("driverfollow", "time").find({
      driver_id: Id,
      dayss: day,
    });
    if (asdf[0].startt == 0 || asdf[0].finishh == 0) {
      return res.json("Start Didn't add");
    } else {
      var workStart = asdf[0].startt;
      var workFinish = asdf[0].finishh;
      var breakStart = asdf[0].breakStartt;
      var breakFinish = asdf[0].breakFinishh;
      var result = workFinish - workStart;
      var breakResult = breakFinish - breakStart;
      let End = result - breakResult;
      let end = End * 0.02257;
      var addd = parseFloat(Currency.replace(",", "."));
      return res.json(end * addd);
    }
  } catch (error) {
    return res.json(error);
  }
};
const benzin = async (req, res) => {
  try {
    const apiRes = await axios.get(
      "https://hasanadiguzel.com.tr/api/akaryakit/sehir=istanbul"
    );
    const raw = apiRes.data.data;
    const districtKey = Object.keys(raw)[0];
    const currentPrice = parseFloat(
      raw[districtKey]["Diesel_TL/lt"].replace(",", ".")
    );

    const today = new Date();
    const fuelPrices = Array.from({ length: 7 })
      .map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const fluctuation = (Math.random() - 0.5) * 0.3;
        return {
          date: d.toISOString().split("T")[0],
          price: parseFloat((currentPrice + fluctuation).toFixed(2)),
        };
      })
      .reverse();

    return res.json({ fuelPrices });
  } catch (err) {
    console.error("benzin hata:", err.response?.data || err.message);
    return res
      .status(500)
      .json({ message: "Benzin fiyatları alınırken hata oluştu." });
  }
};

const events = async function (req, res) {
  try {
    const driverId = req.query.driver_id;
    if (!driverId) {
      return res.status(400).json({ message: "driver_id gerekli" });
    }

    const filter = { driver_id: driverId };
    if (!req.query.all) {
      const day = time.days(time.timestamp());
      filter.dayss = day;
    }
    const records = await new database.CRUD("driverfollow", "time").find(
      filter
    );
    const events = records.flatMap((doc) => {
      const evs = [];

      if (doc.startt) {
        evs.push({
          id: `${doc._id}-start`,
          title: "İşe Başla",
          start: new Date(doc.startt * 1000).toISOString(),
          allDay: false,
          color: "#4caf50",
        });
      }

      if (doc.breakStartt) {
        evs.push({
          id: `${doc._id}-break-start`,
          title: "Molaya Başla",
          start: new Date(doc.breakStartt * 1000).toISOString(),
          allDay: false,
          color: "#ff9800",
        });
      }
      if (doc.breakFinishh) {
        evs.push({
          id: `${doc._id}-break-end`,
          title: "Molayı Bitir",
          start: new Date(doc.breakFinishh * 1000).toISOString(),
          allDay: false,
          color: "#03a9f4",
        });
      }

      if (doc.finishh) {
        evs.push({
          id: `${doc._id}-end`,
          title: "İşi Bitir",
          start: new Date(doc.finishh * 1000).toISOString(),
          allDay: false,
          color: "#f44336",
        });
      }

      return evs;
    });

    return res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sunucu hatası", error });
  }
};

const dashboardStats = async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ message: "user_id gerekli" });
    }

    // Tüm kayıtları çek (filtreleme isterseniz gün/hafta bazlı ekleyin)
    const records = await new database.CRUD("driverfollow", "time").find({
      driver_id: userId,
    });

    // Süreleri topla
    let totalWorkSeconds = 0;
    let totalBreakSeconds = 0;

    records.forEach((doc) => {
      // sadece tamamlanmış kayıtları say
      if (doc.startt && doc.finishh) {
        totalWorkSeconds += doc.finishh - doc.startt;
      }
      if (doc.breakStartt && doc.breakFinishh) {
        totalBreakSeconds += doc.breakFinishh - doc.breakStartt;
      }
    });

    // Saniyeyi saat ve dakikaya çevir
    const formatHours = (sec) => {
      const hours = Math.floor(sec / 3600);
      const minutes = Math.floor((sec % 3600) / 60);
      return { hours, minutes };
    };

    const worked = formatHours(totalWorkSeconds);
    const broke = formatHours(totalBreakSeconds);

    const totalWorkedHoursDecimal = totalWorkSeconds / 3600;

    const hourlyWage = 115;
    const totalEarned = totalWorkedHoursDecimal * hourlyWage;

    return res.json({
      workedHours: `${worked.hours}s ${worked.minutes}d`,
      breakHours: `${broke.hours}s ${broke.minutes}d`,
      estimatedEarnings: `${totalEarned.toFixed(2)} TL`,
    });
  } catch (err) {
    console.error("dashboardStats hata:", err);
    return res
      .status(500)
      .json({ message: "İstatistikler alınırken hata oluştu." });
  }
};

module.exports = {
  workingStartTime,
  workingFinishTime,
  workingTime,
  workingMoney,
  breakTimeStart,
  breakTimeFinish,
  exchange,
  events,
  benzin,
  dashboardStats,
};
