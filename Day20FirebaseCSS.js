var database = firebase.database();
var dataMain;
var datamessage;
var message;
var messageHTML;
console.log(dataMain)
$('#player1rps').hide();
$('#player2rps').hide();
var messanger = database.ref('/messanger');
var gameinHTML = {

  player1: {
    name: 'NA',
    rps: 'NA',
    winns: 0,
    looses: 0,
    ties: 0
  },

  player2: {
    name: 'NA',
    rps: 'NA',
    winns: 0,
    looses: 0,
    ties: 0
  },

}



function setDefault() {

  database.ref().set({

    player1: {
      name: 'NA',
      rps: 'NA',
      winns: 0,
      looses: 0,
      ties: 0

    },

    player2: {
      name: 'NA',
      rps: 'NA',
      winns: 0,
      looses: 0,
      ties: 0
    },

  })

}



function nameFunction() {
    document.getElementById('remember').play()
  $('.login').hide()
  console.log(dataMain.player1.name == "NA")
  if (dataMain.player1.name == "NA") {

    dataMain.player1.name = $('#name-input').val();
    gameinHTML.player1.name = $('#name-input').val();

    $('.player1nametag').html(gameinHTML.player1.name)

    database.ref().update({
      //update first player in FireBase
      player1: {
        name: gameinHTML.player1.name,
        rps: gameinHTML.player1.rps,
        winns: 0,
        looses: 0,
        ties: 0
      }
    })
    openChat()
    $('#player1rps').show()
  } else if (dataMain.player1.name !== "NA") {
    $('.player1nametag').html(dataMain.player1.name);

    dataMain.player2.name = $('#name-input').val();
    gameinHTML.player2.name = $('#name-input').val();
    $('.player2nametag').html(dataMain.player2.name);
    database.ref().update({
      //update second player in FireBase
      player2: {
        name: gameinHTML.player2.name,
        rps: gameinHTML.player1.rps,
        winns: 0,
        looses: 0,
        ties: 0


      }

    })
    openChat()
    $('.login').hide()

  }

  // now we got two players! 

  return false
}

function AddNickOnBothScreens() {

  if (dataMain.player1.name !== 'NA' && dataMain.player1.name !== 'NA') {


    $('.player1nametag').html(dataMain.player1.name);
    $('.player2nametag').html(dataMain.player2.name);
  } else {
    return false

  }

}

function openChat() {

  if (dataMain.player1.name !== 'NA' || dataMain.player2.name !== 'NA') {

    console.log("Activate the chat!")
    $('.chatExchange').html("Chat Open")
    $('.chatWindow').html(` 
                  <div class="form-group messangerUser" >
                  <div class = "messanger" ></div>
                 <div class="form-group">
                <input class="form-control" id="chatinput" type="text">
              </div>
              <button class="btn btn-default message" id="message" type="submit">Message</button>
              </div>
              </div>
          `)

  };

  $('#message').on('click', function(event) {

    if (gameinHTML.player1.name == 'NA') {
      event.preventDefault();
      // console.log($('#chatinput').val())
      message = $('#chatinput').val()
      var name = gameinHTML.player2.name
      messanger.push({
        name,
        message
      })
      message = '';

    } else {

      // console.log($('#chatinput').val())
      message = $('#chatinput').val()
      var name = gameinHTML.player1.name
      messanger.push({
        name,
        message
      })
      message = '';

    }


  });
}


setInterval(function() {
  AddNickOnBothScreens()
}, 1000)

$('.char1 , .char2').on('mouseover', function(event) {
  event.preventDefault();
  $(this).addClass('shake');
});

$('.char1, .char2').on('mouseout', function(event) {
  event.preventDefault();
  $(this).removeClass('shake')
});



$('.char1').click(function() {

  console.log($(this).data("char"));

  dataMain.player1.rps = $(this).data("char");
  gameinHTML.player1.rps = $(this).data("char");
  $('#player1rps').hide()


  database.ref().update({
    //update first player in FireBase
    player1: {
      name: gameinHTML.player1.name,
      rps: gameinHTML.player1.rps,
      winns: dataMain.player1.winns,
      looses: gameinHTML.player1.looses,
      ties: gameinHTML.player1.ties,

    }
  })
  gameTime();
  return false
});



$('.char2').click(function() {

  console.log($(this).data("char"));

  dataMain.player2.rps = $(this).data("char");
  gameinHTML.player2.rps = $(this).data("char");
  $('#player2rps').hide()
  database.ref().update({
    //update first player in FireBase
    player2: {
      name: gameinHTML.player2.name,
      rps: gameinHTML.player2.rps,
      winns: gameinHTML.player2.winns,
      looses: gameinHTML.player2.looses,
      ties: gameinHTML.player2.ties,
    }
  })
  gameTime();
  return false

})

function gameTime() {
  if (dataMain.player1.rps !== 'NA' && dataMain.player2.rps !== 'NA') {

    console.log('GAME ON');
    console.log(parseInt(dataMain.player1.rps));
    console.log(parseInt(dataMain.player2.rps));
    // console.log((2*dataMain.player1.rps + dataMain.player2.rps) % 3) 
    var result = (2 * dataMain.player1.rps + dataMain.player2.rps) % 3;
    console.log(result);

    switch (result) {
      case 0:
        console.log("TIE")
        gameinHTML.player1.ties++
          gameinHTML.player2.ties++
          message = `You tie!`
        name = 'Chuck Norris'
        messanger.push({
          name,
          message
        })
        message = '';
        name = '';
        database.ref().update({
          //update first player in FireBase
          player1: {
            name: dataMain.player1.name,
            ties: gameinHTML.player1.ties,
            looses: gameinHTML.player1.looses,
            winns: gameinHTML.player1.winns,
            rps: 'NA'
          },
          player2: {
            name: dataMain.player2.name,
            ties: gameinHTML.player2.ties,
            winns: gameinHTML.player2.winns,
            looses: gameinHTML.player2.looses,
            rps: 'NA'
          },
        })
        break;
      case 1:
        console.log("Player 2 wins")
        gameinHTML.player1.looses++
          gameinHTML.player2.winns++
          message = `${dataMain.player2.name} winns!`
        name = 'Chuck Norris'
        messanger.push({
          name,
          message
        })
        message = '';
        name = '';
        database.ref().update({
          //update first player in FireBase
          player1: {
            name: dataMain.player1.name,
            ties: gameinHTML.player1.ties,
            looses: gameinHTML.player1.looses,
            winns: gameinHTML.player1.winns,
            rps: 'NA'
          },
          player2: {
            name: dataMain.player2.name,
            ties: gameinHTML.player2.ties,
            winns: gameinHTML.player2.winns,
            looses: gameinHTML.player2.looses,
            rps: 'NA'

          },
        })

        break;
      case 2:
        console.log("Player 1 wins")
        gameinHTML.player1.winns++
          gameinHTML.player2.looses++
          message = `${dataMain.player1.name} winns!`
        name = 'Chuck Norris'
        messanger.push({
          name,
          message
        })
        message = '';
        name = '';
        database.ref().update({
          //update first player in FireBase
          player1: {
            name: dataMain.player1.name,
            ties: gameinHTML.player1.ties,
            looses: gameinHTML.player1.looses,
            winns: gameinHTML.player1.winns,
            rps: 'NA'
          },
          player2: {
            name: dataMain.player2.name,
            ties: gameinHTML.player2.ties,
            winns: gameinHTML.player2.winns,
            looses: gameinHTML.player2.looses,
            rps: 'NA'
          },
        })
        break;
      default:
        'Olol'
        console.log("SMTH WRONG")
        break;
    } // end switch here!//Thats big one hahah!

  } else {
    console.log("Waiting!")
  }



  return false
}

$(document).ready(function() {
  //shake to approved stamp every 10sec!
  setInterval(function(event) {
    $('.h1main').addClass('flash');
    setTimeout(function() {
      $('.h1main').removeClass('flash')
    }, 3000)
  }, 5000)

  //random animation with different classes in CSS
  setInterval(function(event) {
    var classes = ['swing', 'wobble', 'jello', 'hinge'];
    var randomClass = Math.floor(Math.random() * classes.length);
    console.log(classes[randomClass])
    $('.allrps').addClass(`animated ${classes[randomClass]}`);
    setTimeout(function() {
      $('.allrps').removeClass(`animated ${classes[randomClass]}`);
    }, 3000)
  }, 8000)

  $('.inputforLogin').click(function() {

    document.getElementById('nameSon').play()
  });

  $('.loginform , .char1 , .char2 , .player1Title, player2Title').on('mouseover', function(event) {
    $(this).addClass('targetCoursor');
    $('.textdown').html('Chuck is watching you!');
  });
  $('.loginform , .char1 , .char2 , .player1Title, player2Title').on('mouseout', function(event) {
    $(this).removeClass('targetCoursor')
    $('.textdown').html('Chuck is waiting when you Login!');
  });

  $('.char1, .char2').click(function(event) {
    $(this).addClass('bounce')
    document.getElementById('gunGame').play()
  })

  $('.jumbotron').click(function(event) {
    document.getElementById('gunJumbo').play()
    $('<div />').addClass('bullet-hole').css({
      top: event.offsetY,
      left: event.offsetX
    }).appendTo('.jumbotron');
    setTimeout(removeBulletHole, 5000);
    event.preventDefault
  });

  function removeBulletHole() {
    $('.jumbotron .bullet-hole:not(:animated):first').fadeOut(function() {
      $(this).remove();
    });
  }


  database.ref().on('value', function(snapshot) {
    dataMain = snapshot.val();
    console.log(dataMain)

    $('.Score2').html(`Winns:  ${dataMain.player2.winns} Ties:  ${dataMain.player2.ties} Looses:  ${dataMain.player2.looses}                                            `)
    $('.Score1').html(`Winns:  ${dataMain.player1.winns} Ties:  ${dataMain.player1.ties} Looses:  ${dataMain.player1.looses}                                            `)

    if (gameinHTML.player2.name !== 'NA' && dataMain.player1.rps !== 'NA') {
      $('#player2rps').show()



      console.log("Iworked!")

    } else if (dataMain.player2.name !== 'NA' && dataMain.player1.rps !== 'NA') {


      $('#player1rps').hide()
    } else if (gameinHTML.player1.name !== 'NA' && dataMain.player1.name !== 'NA') {
      $('#player1rps').show()
      $('.player2nametag').html(dataMain.player2.name);
    } else if (gameinHTML.player2.rps !== 'NA') {

      $('#player2rps').hide()
    } else {
      console.log('Waiting on Player one pick value!')
    }
  });

  messanger.on("child_added", function(sn) {

    console.log(sn.val().message)
    messageHTML = sn.val().message;
    name = sn.val().name;
    if (name == 'Chuck Norris') {

      $('.messanger').prepend(` <p class = "chuck" style="color:red;" > ${name} : ${messageHTML} </p>`);


    } else if (messageHTML === "Chuck") {



      $('.messanger').prepend(` <p class = "playermesage"> ${name} : ${messageHTML} </p>`);

      url = 'https://api.icndb.com/jokes/random'
      $.ajax({
          url: url,
        })
        .done(function(data) {
          console.log(data.value.joke);
          $('.messanger').prepend(` <p class = "chuckRandom "  style="color:blue;" > Chuck Norris : ${data.value.joke} </p>`);
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });



    } else {

      $('.messanger').prepend(` <p class = "playermesage "> ${name} : ${messageHTML} </p>`);
    }


  });

  // var connectedRef = firebase.database().ref(".info/connected");
  // console.log(connectedRef)
  // connectedRef.on("value", function(snap) {
  //   console.log(snap)
  //   console.log(snap.val())
  //   if (snap.val() === true) {

  //     $('.h1main').html('You are connected to RPS game!')

  //   } else {
  //     $('.h1main').html('You are not connected to RPS game!')
  //   }
  // });



  database.ref('player2').onDisconnect().set({
    name: 'NA',
    rps: 'NA',
    winns: 0,
    looses: 0,
    ties: 0
  });

  database.ref('player1').onDisconnect().set({
    name: 'NA',
    rps: 'NA',
    winns: 0,
    looses: 0,
    ties: 0
  });

  setDefault();
      $('#add-user').keypress(function(event) {
    if(e.which == 13) {
        nameFunction()
    }
});

  $('#add-user').click(nameFunction);

  $('.message').on('click', function(event) {
    event.preventDefault()
    console.log("YAYAAYYA")
  });

  return false
});