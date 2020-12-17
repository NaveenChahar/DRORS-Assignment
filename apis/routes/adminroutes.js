const express = require('express');
const AdminRoutes = express.Router();

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const upload = require('../../Utils/excelUpload');    //requiring multer for excel upload

const singleUpload = upload.single('file')

const adminCrud = require('../../db/crudoperations/admincrud');

AdminRoutes.post('/login', (req, res) => {
    let isAdmin = adminCrud.login(req.body)
    if (isAdmin) {
        res.status(200).json({ msg: 'Login Successful' })
    }
    else {
        res.status(401).json({ msg: 'Invalid Credentials' });
    }
})

AdminRoutes.get('/employees', async (req, res) => {
    try {
        let emps = await adminCrud.getAllEmployees();
        if (emps) {
            res.status(200).json({ msg: 'got employees', data: emps })
        }
        else {
            res.status(400).json({ msg: 'no employees found' })
        }
    }
    catch (err) {
        res.status(404).json({ msg: 'some error occured' })
    }

})

AdminRoutes.get('/covidStatus',async (req, res) => {
    try {
        let emps = await adminCrud.covidStatus();
        if (emps) {
            res.status(200).json({ msg: 'got employees', data: emps })
        }
        else {
            res.status(400).json({ msg: 'no employees found' })
        }
    }
    catch (err) {
        res.status(404).json({ msg: 'some error occured' })
    }
})

AdminRoutes.get('/quarantinedStatus',async (req, res) => {
    try {
        let emps = await adminCrud.quarantinedStatus();
        if (emps) {
            res.status(200).json({ msg: 'got employees', data: emps })
        }
        else {
            res.status(400).json({ msg: 'no employees found' })
        }
    }
    catch (err) {
        res.status(404).json({ msg: 'some error occured' })
    }
})

AdminRoutes.post('/markCovid',async (req, res) => {
    try {
        let emps = await adminCrud.markCovid(req.body.empId);
        if (emps) {
            res.status(200).json({ msg: 'got employees', data: emps })
        }
        else {
            res.status(400).json({ msg: 'no employees found' })
        }
    }
    catch (err) {
        res.status(404).json({ msg: 'some error occured' })
    }
})


AdminRoutes.post('/excelUpload', (req, res) => {
    var xlsxj; //Initialization

    singleUpload(req, res, async function (err) {
        if (err) {
            console.log(err);
        } else if (err) {
            //console.log(req.file)
            res.json(err);
        }
        console.log(req.file);
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            xlsxj = xlsxtojson;
        } else {
            xlsxj = xlstojson;
        }

        try {
            xlsxj({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    // return new Promise(function(resolve,reject){
                    //     reject({msg:'some error occured'});
                    // })
                    res.json({ error_code: 1, err_desc: err, data: null });
                }
                //console.log('result success',result)
                adminCrud.uploadEmployees(result)
                res.status(200).json({ msg: 'records uploaded' })
            })
        }
        catch (err) {
            console.log('error during upload', err)
        }
    })
})




module.exports = AdminRoutes;