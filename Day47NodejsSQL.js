
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: '1000songs_db',
	port: 3306
	});



var singer = {

	id: 13 ,
	title: "Dzmitry Knows SQL + NODE.js now",
	artist: "Dzmitry Rules",
	label: "Columbia",
	released: "1992-05-13"
}

connection.query("REPLACE INTO album set ?" , singer , function(err,res){

		if (err) {

			console.log(err)
			return;
		}
	console.log(' The inserted'  + res.insertId );

} )



connection.query("SELECT * FROM album where label=?", ['Columbia'], 
	function(err,rows){

			if(err){
				console.log(err);
				return;
			}

			rows.forEach( function(result) {
				console.log(result.id)
				console.log(result.title)
				console.log(result.artist)

			});
	})

connection.end(function () {
   console.log('Connection Closed')
})