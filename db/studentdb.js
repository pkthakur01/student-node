const pg = require('./dbconnection');


exports.getAllDpd = async (newTemplate) => await pg.query('SELECT * FROM dpd_overdue')
    .then(res => { if (res.rows.length <= 0) { throw new Error(errorConfig.NODATA) } return res; }).catch(err => { return err });

exports.getAllFema = async (newTemplate) => await pg.query('SELECT * FROM fema')
    .then(res => { if (res.rows.length <= 0) { throw new Error(errorConfig.NODATA) } return res; }).catch(err => { return err });

exports.getFemaById = async (newUser) => await pg.query('SELECT * FROM fema WHERE ucic  = $1', [newUser.ucic])
    .then(res => { if (res.rows.length <= 0) { throw new Error(errorConfig.NODATA) } return res; }).catch(err => { return err });

exports.getDpdById = async (newUser) => await pg.query('SELECT * FROM dpd_overdue WHERE ucic  = $1', [newUser.ucic])
    .then(res => { if (res.rows.length <= 0) { throw new Error(errorConfig.NODATA) } return res; }).catch(err => { return err });

exports.searchRbiUsingName = async (newUser) => await pg.query('SELECT * FROM rbi_calculation where ie_name LIKE $1'
    , [newUser.name])
    .then(res => { if (res.rows.length <= 0) { throw new Error(errorConfig.NODATA) } return res; }).catch(err => { return err });


exports.addStudent = async (newUser) => pg.query('INSERT INTO students(student_id, name, age, mark1, mark2, mark3, created_at, updated_at)VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    , [newUser.student_id, newUser.name, newUser.age, newUser.mark1, newUser.mark2, newUser.mark3, newUser.createdAt, newUser.updatedAt])
    .then(res => { return res; }).catch(err => { return err });