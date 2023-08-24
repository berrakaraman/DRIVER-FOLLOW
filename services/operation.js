// All Database functions are here

const database = require('../models/database');
const time = require('../helpers/date');
//const e = require('express');


const workingStartTime = async function(req,res){
    let Id = req.body.driverId;
    var day = time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id, 'dayss':day});
    if( asdf[0] &&  asdf[0].finishh == 0 ){
        return res.json('yeniden giriş yapamazsınız');
    }
    //time.days(asdf[0].startt)
    if(asdf[0] && '2023-08-24' == time.days(time.timestamp())){
        return res.json('aynı gün içinde iki kere giriş yapılamaz');
    }
    if(time.date(time.timestamp()) < '09:00'){
        return res.json('Game Over! Turn Your Village');
    }
    var start = time.timestamp();
    var finish = 0;
    var breakStart = 0;
    var breakFinish = 0;
    var tarih = time.dateTime(); 
    var days = time.days(time.timestamp());
    var ekle = {
        driverId : req.body.driverId,
        startt : start,
        finishh : finish,
        breakStartt : breakStart,
        breakFinishh : breakFinish,
        tarihh : tarih,
        dayss : days
    };
    new database.CRUD('driverfollow','time').insert(ekle);
    return res.json('added');
};
const workingFinishTime = async function(req,res){
    let Id = req.body.driverId;
    var day = '2023-08-24'; //time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id , 'dayss': day});
    console.log(asdf[0]);
    if( asdf[0].breakStartt == 0 || asdf[0].startt == 0  || asdf[0].breakFinishh == 0){
        return res.json('Didn\'t add');
    }
    
    var finish = time.timestamp();
    new database.CRUD('driverfollow','time').update(
        {driverId: req.body.driverId, dayss: day},
        {$set: {'finishh': finish}}
    );
    return res.json('added');
    
};
const workingTime = async function(req,res){

    let Id = req.body.driverId;
    var day = '2023-08-24'; //time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id, 'dayss': day});
    
    if(asdf[0].startt == 0 || asdf[0].finishh == 0){
        return res.json('Start Didn\'t add');
    }
    else{
        var workStart = asdf[0].startt;
        var workFinish = asdf[0].finishh;
        var breakStart = asdf[0].breakStartt;
        var breakFinish = asdf[0].breakFinishh;
        var result = workFinish - workStart;
        var breakResult = breakFinish - breakStart;
        let End = result - breakResult;
        if(End > 32){
            return res.json(End + ' saniye' + ' (9 saatin üzerindeki mesailere ücret ödenmeyecektir)');
        }
        else{
            return res.json(End + ' saniye');
        }
    }
    
};

const workingMoney = async function(req,res){

    let Id = req.body.driverId;
    var day = '2023-08-24'; //time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id, 'dayss': day});
    //time.days(asdf[0].startt)
    
    if(asdf[0].startt == 0 || asdf[0].finishh == 0){
        return res.json('Start Didn\'t add');
    }
    else{
        var workStart = asdf[0].startt;
        var workFinish = asdf[0].finishh;
        var breakStart = asdf[0].breakStartt;
        var breakFinish = asdf[0].breakFinishh;
        var result = workFinish - workStart;
        var breakResult = breakFinish - breakStart;
        let End = result - breakResult;
        let end = (End * (0.02257) + ' tl');
        return res.json(end);
    }
};

const breakTimeStart = async function(req,res){
    let Id = req.body.driverId;
    var day = '2023-08-24'; //time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id,'dayss': day});
    //time.days(asdf[0].startt)
    
    if(asdf[0].startt == 0 ){
        return res.json('Start Didn\'t add');
    }
    else{
        var start = time.timestamp();
        new database.CRUD('driverfollow','time').update(
            {driverId: req.body.driverId, dayss: day},
            {$set: {'breakStartt': start}}
        );
        return res.json('added');
    }

};

const breakTimeFinish = async function(req,res){

    let Id = req.body.driverId;
    var day = '2023-08-24'; //time.days(time.timestamp());
    var asdf = await new database.CRUD('driverfollow','time').find({'driverId':Id,'dayss': day});
    //time.days(asdf[0].startt)
    
    if(asdf[0].startt == 0 || asdf[0].breakStartt == 0 ){
        return res.json('Start Didn\'t add');
    }
    else{
        var finish = time.timestamp();
        new database.CRUD('driverfollow','time').update(
            {driverId: req.body.driverId, dayss : day},
            {$set: {'breakFinishh': finish}}
        );
        return res.json('added');
    }
};

module.exports ={
    workingStartTime,
    workingFinishTime,
    workingTime,
    workingMoney,
    breakTimeStart,
    breakTimeFinish
};