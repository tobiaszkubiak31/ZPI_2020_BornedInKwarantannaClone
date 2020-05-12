const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'password',
    user: 'user',
    database: 'tax_calculator',
    host: 'localhost',
    port: '3306'
});

let productsDb = {};

productsDb.all = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM products`, (err, results) => {

            if(err) {
                return reject(err);
            }

            return resolve(results);

        });

    });

};

module.exports = productsDb;