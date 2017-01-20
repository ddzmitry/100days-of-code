
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDc404VmcsB_01HXYnM82BS1RFbxrd0cwM",
    authDomain: "employee-form-649f0.firebaseapp.com",
    databaseURL: "https://employee-form-649f0.firebaseio.com",
    storageBucket: "employee-form-649f0.appspot.com",
    messagingSenderId: "931884742573"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
  var database = firebase.database();


$('#button').on('click', function(event) {


var employee = $('#name').val().trim();
var role = $('#role').val().trim();
var startDate = $('#start-date').val().trim();
var monthlyRate = $('#monthly-rate').val().trim();


var ObjEmployee = {

    name: employee,
    role: role,
    startDate: startDate,
    monthlyRate : monthlyRate
}

    event.preventDefault();
 //adding the objEmployee to the dataBase   
database.ref().push(ObjEmployee);
});

database.ref().on('child_added',function(snapshot){

console.log(snapshot.val());

var monthsWorked = (moment(snapshot.val().startDate, "YYYYMMDD").fromNow().slice(0,2).trim() * 12);
console.log(monthsWorked);
var totalBilled = (monthsWorked * snapshot.val().monthlyRate);

$("#employeeForm").append(`<tr>
             <td> ${snapshot.val().name}</td>
             <td> ${snapshot.val().role}</td> 
             <td> ${snapshot.val().startDate}</td>
             <td> ${monthsWorked} </td>
             <td> ${snapshot.val().monthlyRate}</td>
             <td> ${totalBilled}</td>
                </tr>`);


})





// of database

             //    $('#employeeForm').append(`

