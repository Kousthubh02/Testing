let mysql=require('mysql')
let connection=mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1402',
        database: 'FTP'
    });

    connection.connect(function(err){
        if(err) throw err
        console.log('Connected to Mysql')
    })

module.exports=connection;