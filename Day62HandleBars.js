var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/dzmitry', function(req, res){

	res.render('dzmitry',people[0]);

})
app.get('/users', function(req, res){

	var data = {arr}

	res.render('users',data);
})

app.get('/everyone', function(req, res){
	var data = {people}

	res.render('everyone',data);

})
var arr = [1,2,3,4,5]
   var users =  [ { 
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa" 
    }, {
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        }, 
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        }, 
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    } ]


var people = [
	
		{

			name: "dzmitry",
			title: "Web Developer",
			age: 24,
			FavAnimal: '🐈',
			likesTo: '💩'
		},
				{

			name: "Lomik",
			title: "Theff",
			age: 45,
			FavAnimal: '🐈',
			likesTo: '💩'
		},
						{

			name: "Steph",
			title: "student",
			age: 20,
			FavAnimal: '🐈',
			likesTo: '💩'
		}



]
app.listen(3000);