let mysql=require('mysql2')
let connection=mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1402', //change password
        database: 'FTP'
    });

    connection.connect(function(err){
        if(err) throw err
        console.log('Connected to Mysql')
    })

module.exports=connection;
