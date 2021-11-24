const pg = require('./dbconnection');



exports.getResultById = async (newUser) => await pg.query('SELECT * FROM student WHERE student_id  = $1', [newUser.student_id])
    .then(res => { if (res.rows.length <= 0) { throw new Error('No data') } return res; }).catch(err => { return err });


exports.addStudent = async (newUser) => pg.query('INSERT INTO student (student_id, name, age, marks1, marks2, marks3)VALUES ($1, $2, $3, $4, $5, $6)'
    , [newUser.student_id, newUser.name, newUser.age, newUser.mark1, newUser.mark2, newUser.mark3])
    .then(res => { return res; }).catch(err => { return err });

exports.getPassedResult = async (newUser) => await pg.query('SELECT * FROM student WHERE marks1>33 AND marks2>33 AND marks3>33')
    .then(res => { if (res.rows.length <= 0) { throw new Error('No data') } return res; }).catch(err => { return err });

exports.getFailedResult = async (newUser) => await pg.query('SELECT * FROM student WHERE marks1<33 OR marks2<33 OR marks3<33')
    .then(res => { if (res.rows.length <= 0) { throw new Error('No data') } return res; }).catch(err => { return err });