const mysql = require('mysql');

const connectMysql = async () => {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1402',
            database: 'FTP'
        });

        // Establish the connection
        await connection.connect();

        // Connection successful
        console.log('Connected to MySQL database.');

        return connection;
    } catch (error) {
        console.error('Error connecting to DB', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

module.exports = connectMysql;
