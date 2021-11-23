const express = require("express");
const router = express.Router();
const utils = require('../utils/validators');
const log4js = require('log4js');
const logger = log4js.getLogger('studentslog');
const StudentDb = require('../db/studentdb');
const StudentSchema = require('../models/student').StudentSchema;
var XLSX = require('xlsx')
const upload = require("../services/file-upload").upload;
const fs = require('fs')



//exel upload and read
router.post("/upload", upload.single("file"), async (req, res) => {

    const fileLocation = req.file;
    if (!fileLocation) {
        logger.info("Invalid file selected");
        return res.status(400).send({ status: false, message: "Invalid file selected" });

    }

    const path = fileLocation.path
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var error_data = [];
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    });
    for (i = 0; i < json.length; i++) {


        let student_id = json[i].id;
        let name = json[i].name;
        let age = json[i].age;
        let mark1 = json[i].makr1;
        let mark2 = json[i].mark2;
        let mark3 = json[i].mark3;
        

        if (!student_id || (typeof student_id != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Profile pic is either not a string type or empty");
            continue;
        } else if (!name || (typeof name != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Store name is either not a string type or empty");
            continue;
        } else if (!age || (typeof age != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Name is either not a string type or empty");
            continue;
        } else if (!mark1 || (typeof age != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Contact is either not conation +91 folowwed by 10 digit or empty");
            continue;
        } else if (!mark2 || (typeof mark2 != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Email is either not a string type or empty");
            continue;
        } else if (!mark3 || (typeof mark3 != 'string')) {
            error_data.push("Error in line Number " + (i + 2) + " Error : Gstin is either not a string type or empty");
            continue;
        } 
            let newStudent = StudentSchema;
            newStudent.student_id = student_id;
            newStudent.name = name;
            newStudent.age = age;
            newStudent.mark1 = mark1;
            newStudent.mark2 = mark2;
            newStudent.mark3 = mark3;
       

            

            var result = await Distributor.registerdistributor(newStudent)
            if (result.errno == 1062) {
                error_data.push("Error in line Number " + (i + 2) + " Error : distributor already register with mobile no " + newStudent.mobileNo);
            } else if (result.message) {
                error_data.push("Error in line Number " + (i + 2) + " Error : " + result.message);
            }else{
                var result1 = await Address.registeraddress(newAddress)
                if(result1.message) {
                error_data.push("Error in line Number " + (i + 2) + " Error : Error in registring address" + result.message);
            }
            }
        }


    


    if (error_data.length < 1) {

        logger.info("Sucessfully insert data without error");
        return res.status(200).send({ status: true, message: "Data upload success and no error found ." });

    } else {
        logger.info("Error in registring distributor");
        return res.status(400).send({ status: false, message: "Data upload unsuccessful due to error found in excel", data: error_data });

    }





});

module.exports = router;
