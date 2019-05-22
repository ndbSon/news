var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'news',
        port: 3306
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
};