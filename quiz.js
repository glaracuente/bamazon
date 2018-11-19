var mysql = require("mysql");

var connection = mysql.createConnection({
    //host: "localhost",
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "top_songsDB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    queryAll();
});



function queryAll() {
    connection.query("SELECT * FROM Top5000 as s JOIN albums as a WHERE artist='beatles'", function (err, res) {
        console.log(res)
        /*for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist + " | " + res[i].title + " | " + res[i].year);
        }
        console.log("-----------------------------------");*/
    });

    connection.end();
};