// Initialize Firebase
var config = {
    apiKey: "AIzaSyC24JVbFxBGtc_PorQNnDOhCE0gbM9-uZE",
    authDomain: "fir-101-9c773.firebaseapp.com",
    databaseURL: "https://fir-101-9c773.firebaseio.com",
    projectId: "fir-101-9c773",
    storageBucket: "fir-101-9c773.appspot.com",
    messagingSenderId: "425582144595"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  


  $(".submit").on("click", function() {
         database.ref().on("value", function(snapshot) {           
            console.log(snapshot.val());
        });

    var name = $("[name='name']").val().trim();
    var destination = $("[name='destination']").val().trim();
    var firstTime = $("[name='firstTime']").val().trim();
    var frequency = $("[name='frequency']").val().trim();

    database.ref().push({
            _name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency        
        });
    
    database.ref().on("child_added", function (data){
        console.log(data.key.child("destination"));
    });
    

    });
  





