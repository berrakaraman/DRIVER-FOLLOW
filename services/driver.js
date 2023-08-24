// All Database functions are here
//const express = require('express');
const response =  require('../helpers/response');
const database = require('../models/database');
var jwt = require('jsonwebtoken');


const register = async function(req,res){
    const newDriver = {
        driverId : database.id(),
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        role: 'driver'
    };

    if(req.body.name && req.body.surname && req.body.password){
        var check = await new database.CRUD('driverfollow','driver').find({
            $and: [
                {'name':req.body.name},
                {'surname':req.body.surname},
                {'password':req.body.password}
            ]
        });
        if(check.length > 0){
            return res.status(409).json({staus:false});    
        }
        else{
            new database.CRUD('driverfollow','driver').insert(newDriver);
            return res.json(newDriver);
        }
    }
    return res.status(404).json({status:false});
};
const login =  async function(req,res){
    var check = await new database.CRUD('driverfollow','driver').find({
        $and :[
            {'driverId': req.body.driverId},
            {'password': req.body.password}
        ]
    });
    if(check.length == 0 ){
        return res.status(400).json({status:false});
    }
    
    else{
        const token = jwt.sign(check[0], 'asdf', {expiresIn: '60m'} );
        //res.json(token);
        return res.status(200).json(response.TRUE(check,token));
    }
   
};
const driversList =  async function(req,res){
    var fulldata = await  new database.CRUD('driverfollow','driver').find({ },[0,5]); //ilk parametre query ikinci parametre limit(databaseden kaç tane veri geleceğini gösteriyor)
    return res.json(fulldata);
};
const admin = async function(req,res){
    var updates = await  new database.CRUD('driverfollow','driver').update(
        {driverId: req.body.driverId},
        {$set: {'role': req.body.role}}
    );
    if(updates.modifiedCount == 0 ){
        return res.json('modified Count = 0');
    }
    else{
        return res.json('role update');
    }
};
const updatee = async function(req,res){
    var updates = await  new database.CRUD('driverfollow','driver').update(
        {driverId: req.body.driverId},
        {$set: {'name': req.body.name}}
    );
    if(updates.modifiedCount == 0 ){
        return res.json('modified Count = 0');
    }
    else{
        return res.json('user update');
    }
};
const deletee = async function(req,res){
    let dele = {
        driverId: req.body.driverId
    };
    var deletedriver = await  new database.CRUD('driverfollow','driver').delete(dele);
    if(deletedriver.result != 0){
        return res.json('succesful');
    }
    else{
        return res.json('failed');
    }
}; 










module.exports ={
    register,
    login,
    driversList,
    admin,
    updatee,
    deletee
};