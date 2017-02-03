
var windowWidth = $(window).width();
  if(windowWidth < 768){
    $('.carousel-caption').addClass('pre-scrollable')
    console.log('worked')
}
if ((windowWidth > 768) && ($('.carousel-caption').hasClass('pre-scrollable'))) {
      console.log("worked as well")
  $('.carousel-caption').removeClass('pre-scrollable')
}
else {

  console.log('good')
}



$(function() {
var config = {
  apiKey: "AIzaSyDis8TTOcaDju9g8zqWrlNIei5g5hQiyNc",
  authDomain: "authlearning-31116.firebaseapp.com",
  databaseURL: "https://authlearning-31116.firebaseio.com",
  storageBucket: "authlearning-31116.appspot.com",
  messagingSenderId: "927237143466"
};




firebase.initializeApp(config);
var database = firebase.database();
var user = database.ref('/user');
var newUser = database.ref('/newuser');
var email;
var pass;
var movies;









database.ref().on('value', function(snap) {


  // console.log((snap.val().user))
  // console.log(snap.val())


  $('.search').val(localStorage.zip)
  $('#txtEmail').val(localStorage.email)
  $('#txtPassword').val(localStorage.password)

})

user.on('value', function(snap) {
  email = snap.val().email
  pass = snap.val().pass

  // console.log(email)
  // console.log(snap.val())

});


//gET elEMENTS
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
//add login




btnLogin.addEventListener('click', e => {
  //Get emeil and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

localStorage.setItem("email", email)
localStorage.setItem("password" , pass )


  var newUser = {
      email: email,
      pass: pass,
      uid: '',
      zip: ''
    }
    // Sign in
  user.push(newUser)

  const promise = auth.signInWithEmailAndPassword(email, pass);

  promise.catch(e => console.log(e.message));
  $('#btnSignUp').hide()
  console.log('loggedin')
  return false

});
// sign up 

btnSignUp.addEventListener('click', e => {

  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign up
  $('.info').show()
  newUser.push({
    email: email,
    pass: pass,
    status: 'loggedin',
    zpi: '',
    uid: ''
  });
  $('#weathers').empty();

  const promise = auth.createUserWithEmailAndPassword(email, pass);

  promise.catch(e => console.log(e.message));
    return false
});

btnLogout.addEventListener('click', e => {
  newUser.update({
    status: 'loggedOUT'
  });

  user.update({
    status: 'loggedOUT'
  });

  firebase.auth().signOut();
})


//add real time listener

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    $('.info').show()
    console.log(firebaseUser);
    // console.log(firebaseUser.uid);


    btnLogout.classList.remove('hide');
  } else {

    $('.info').hide()
    console.log("not logged in");
    btnLogout.classList.add('hide');
  }

});
var pos;
var weatherReport;
var lowtemp;
var eventsNames = [];
$('.info').hide()
$('#lookInfo').on('click', function() {
      // console.log("I was clicked")
  zip = $('.search').val().trim()

  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(`${zip}`);
  if (isValidZip === true) {

    user.update({
      zip: zip
    })

    $('#weathers').empty()
    localStorage.setItem("zip", zip)
    findLocation(zip)
  } else {

    console.log('bad zip')
  }


})

function findLocation(zip) {
  $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyATHPPagioRnJR7xhCvEYBT2VVFUkE5ajY`,
    })
    .done(function(data) {
      console.log(data)


      lat = data.results[0].geometry.bounds.northeast.lat,
        lng = data.results[0].geometry.bounds.northeast.lng
      checkWeather(lat, lng)


      // console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
}

function checkWeather(lat, lng) {
  var url = `http://api.wunderground.com/api/3f4f6b8d728af2d4/forecast10day/q/${lat},${lng}.json`
  console.log(url);
  $.ajax({
      url: url, // here we get our weather from at and long from first api call

    })
    .done(function(data) {



      // console.log(data.forecast.simpleforecast.forecastday.length);

      var arrWeathers = data.forecast.simpleforecast.forecastday;
      var forecastDay = data.forecast.simpleforecast.forecastday;
                  
                  for (i = 0; i < 5; i++) {
                  var strDate = forecastDay[i].date.year + "-" + forecastDay[i].date.month + "-" + forecastDay[i].date.day;
                  //var strDateF = strDate.slice(15,31).trim();
                  // console.log(strDate);
                  var date = moment(strDate).format("YYYY-MM-DD").toString();
                  //console.log(date);

                      var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": `https://api.seatgeek.com/2/events?&geoip=true&datetime_local.gt=${date}&client_id=NjY5Nzc0MXwxNDg1MzkwMjgxLjEx`,
                        "method": "GET"
                      }

                      $.ajax(settings).done(function (data) {
                        for (j in data.events) {
                          // console.log(data.events[j].short_title);
                          // console.log(moment(data.events[j].datetime_local).format("YYYY-MM-DD"));
                          // console.log(data.events[j].url);
                        }
                         // console.log(data);  //CHECK THIS
                      });
                    }

      for (i in arrWeathers) {

        if (i <= 4) {
          date = `${arrWeathers[i].date.monthname_short } ${arrWeathers[i].date.day} ${arrWeathers[i].date.year}`
          console.log(date)
          var yearDateMonth=`${arrWeathers[i].date.year}-${arrWeathers[i].date.month}-${arrWeathers[i].date.day}`;

                            var weatherCondition = arrWeathers[i].conditions.toString().toLowerCase();
                            console.log(weatherCondition.toString().toLowerCase())
                            var imgsrc
                            if (weatherCondition === 'clear') {
                              imgsrc = `assets/images/medium/sun.png`
                            } else if (weatherCondition.includes('cloud')) {

                              imgsrc = `assets/images/medium/cloudiness.png`
                            } else if (weatherCondition.includes('snow') || weatherCondition.includes('ice')) {

                              imgsrc = `assets/images/medium/snow.png`
                            } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {

                              imgsrc = `assets/images/medium/rain.png`
                            } else if (weatherCondition.includes('storm') || weatherCondition.includes('thunder')) {

                              imgsrc = `assets/images/medium/thunderstorm.png`
                            } else if (weatherCondition.includes('fog') || weatherCondition.includes('smoke')) {

                              imgsrc = `assets/images/medium/fog.png`
                            } else {
                              imgsrc = `assets/images/medium/fog.png`
                            }




          $("#weathers").append(`<div  class="col-lg-2 col-md-2 col-sm-2 weathertag Day${i}" data-day = "${date}" ">
                                            <div  class=""> ${arrWeathers[i].date.monthname_short} ${arrWeathers[i].date.day}
                                  
                                    <p>Condition ${arrWeathers[i].conditions}</p>
                                    <p>Low temperature ${arrWeathers[i].low.fahrenheit}</p>
                                    <p>High temperature ${arrWeathers[i].high.fahrenheit}</p>                              
                                    <img class="imgWeather${i}"  src="${imgsrc}"
                                    
                                    </div>
                                    <div>
                                    <button href="#myCarousel" role="button" data-slide="next"  class="meetupBtn"  data-day = "${date}" > Meetup </button>
                                    <button data-target="#myCarousel" data-slide-to="2" class="third  movieBtn">Movies</button>
                                    <button href="#myCarousel" role="button"  data-slide="prev" class="ticketsBtn" data-time="${yearDateMonth}">Events</button>
                                    </div>
                                   
                                    </div> 
                                    `)
        }

      }



//Meetups API function begins
      $('.meetupBtn').on('click', function(event) {
        event.preventDefault();
        // console.log($(this).data().day)
$('#meetupsBtns').empty()
        theDay = $(this).data().day
        theDay = moment(theDay).format('x').toString()
        console.log(theDay)
        _this = $(this)
// moment().format('x')
        $.ajax({
              url: `https://api.meetup.com/2/open_events?&sign=true&photo-host=public&zip=${zip}&time=${theDay},&page=20&api&key=32426c2a3817684768446d4c5535244f`,
              key: "32426c2a3817684768446d4c5535244f",
              dataType: 'jsonp'
          })
          .done(function(data) {
              console.log(data)
            var events = data.results;
            arr = [] ; 
            while (arr.length < 5) {

            var eventIndex =  Math.floor(Math.random() * events.length) + 1

            if (arr.includes(eventIndex) ){} else{arr.push( eventIndex);}
              
           
}       
              for ( i in arr) {
                  index = arr[i]

               currentEvent = events[index]   
                        console.log(currentEvent)
               if (currentEvent.hasOwnProperty('venue')) { 

                  $('#meetupsBtns').append(`<div class=' col-md-2 meetupEvent'>
                                         
                                         <p>${ currentEvent.name}</p>
                                         <p>Adress: ${currentEvent.venue.address_1}</p>
                                         <p>Venue Name: ${currentEvent.venue.name} </p>
                                         <p><a href="${currentEvent.event_url}" target="_blank" > Link on Meetup </a></p>  
                             <div>`)
} else {

  console.log("no venue")
}

              }

          })

        console.log(eventsNames)


      });


    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {

    });
}
//Meetups API function ends



//Moviedb.org API function begins
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=65df1022a70a9ad63fbfa028ad61d139",
  "method": "GET"
}

$('#weathers').on('click', '.movieBtn', function() {
  // $('.one, .first').removeClass('active');
  // $('.two, .second').removeClass('active');
  // $('.three, .third').addClass('active');
  // $('.four, .fourth').removeClass('active');
  
  $('#movie-space').empty();
  // var movieDiv = '<div class="movie-space" class="col-md-2">';
  // $(this).after(movieDiv);
  $.ajax(settings).done(function(response) {
    
    var arrayOfmovies = []
    while (arrayOfmovies.length < 5) {
      var randomMovie = Math.floor(Math.random() * response.results.length);


      if (arrayOfmovies.includes(randomMovie)) {} else {
        arrayOfmovies.push(randomMovie);

      }



      console.log(arrayOfmovies);
      console.log(response);
    }
    for (i in arrayOfmovies) {


      index = arrayOfmovies[i]

      console.log(response.results[index].original_title);
      console.log(response.results[index].overview);
      var movieTitle = response.results[index].original_title;
      var movieDesc = response.results[index].overview;
     
      $('#movie-space').append(`<div class="movie">
                              <p class="movie-title">${movieTitle}</p>
                              <p>${movieDesc}</p>                        
                              </div>`);
      }
    });
  });
//Moviedb.org API function ends





//Seatgeek API function begins
$('#weathers').on('click', '.ticketsBtn', function () {
  $('.one, .first').removeClass('active');
  $('.two, .second').removeClass('active');
  $('.three, .third').addClass('active');
  $('.four, .fourth').removeClass('active');

        $('#event-space').empty();
        // var eventDiv = '<div class="event-space" class="col-md-2">';
        // $(this).after(eventDiv);
          var strDate = $(this).data().time;
          //var strDate = str.slice(15,31).trim();
          console.log(strDate);
          var date = moment(strDate).format("YYYY-MM-DD").toString();
         console.log(strDate);
         console.log(date);

          var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api.seatgeek.com/2/events?&geoip=true&datetime_local.gte=${date}&client_id=NjY5Nzc0MXwxNDg1MzkwMjgxLjEx`,
            "method": "GET"
          }

          $.ajax(settings).done(function (response) {
            console.log(response);

            for (i = 0; i < 5; i++) {
              var eventTitle = response.events[i].short_title;
              var eventTime = moment(response.events[i].datetime_local).format("MM-DD-YYYY").toString();
              var eventUrl = response.events[i].url;

              console.log(eventTitle);
              console.log(eventTime);
              console.log(eventUrl);

              $('#event-space').append(`<div class="event">
                                      <p class="event-title"><a href="${eventUrl}">${eventTitle}</a></p>
                                      <p>${eventTime}</p>
                                      </div>`);
            }
          });
    });
//Seatgeek API function ends

return false
});