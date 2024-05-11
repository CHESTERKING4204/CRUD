const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/NewModal');


const route = express.Router();

//POST - To insert the info 
route.post('/', async (req, res) => {

    const { name, email, number, dob } = req.body;

    try {
        const UserAdded = await User.create({
            name: name,
            email: email,
            number: number,
            dob: dob
        });
        res.status(201).json(UserAdded);
    } catch (error) {
        console.log(error, 'not me must be another one');
        res.status(400).json({ error: error.message });
    }
});


//GET - To get the info for all
route.get("/", async (req, res) => {
    try {
        const ShowAll = await User.find();
        return res.status(200).json(ShowAll);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
    // res.send("api running");
});

//To search the id of one user
route.get('/:id',async (req,res)=>{
    const {id} = req.params;

    try{
        const getOne = await User.findById(id);
        res.status(200).json(getOne);
    }catch (error){
        console.log(error,'may be another place but not here')
        res.status(500).json({error:error.message});
    }

});

//To delete the user
route.delete("/:_id", async (req, res) => {
    const { _id } = req.params;

    try {
        const deleteData = await User.findByIdAndDelete(_id);
        res.status(200).json(deleteData);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
});


//To update the data
route.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, number, dob } = req.body;
    try {
        const UpdateData = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(UpdateData);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
    // res.send("api running");
});


module.exports = route;