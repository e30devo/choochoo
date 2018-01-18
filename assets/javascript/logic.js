$(document).ready(function() {
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

  database.ref().once("value", function(snapshot) {
    console.log(snapshot.val());
    console.log(Object.keys(snapshot.val()));
    console.log(snapshot.numChildren());
    var instanceKey = Object.keys(snapshot.val());

    // database.ref().once("child_added", function(data) {
    //   console.log(Object.keys(data.val()));
    //   console.log(data.val()._trainName);

    // $.each(snapshot, function( key, value ) {
    //   console.log( key + ": " + value );
    // });

    for (var i = 0; i < snapshot.numChildren(); i++) {
      console.log(snapshot.val()[instanceKey[i]]["_trainName"]);

      $(".trainble").append(
        "<tr>",
        "<th>" + snapshot.val()[instanceKey[i]]["_trainName"] + "</th>",
        "<th>" + snapshot.val()[instanceKey[i]]["destination"] + "</th>",
        "<th>" + snapshot.val()[instanceKey[i]]["frequency"] + "</th>",
        "</tr>"
      );
    } //for loop close
    // });
  }); //database.ref on"value" closer

  //this works, dont touch below here. #twss
  $(".submit").on("click", function() {
    var name = $("[name='name']")
      .val()
      .trim();
    var destination = $("[name='destination']")
      .val()
      .trim();
    var firstTime = $("[name='firstTime']")
      .val()
      .trim();
    var frequency = $("[name='frequency']")
      .val()
      .trim();

    database.ref().push({
      _trainName: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    });

    $(".trainble").append(
      "<tr>",
      "<th>" + name + "</th>",
      "<th>" + destination + "</th>",
      "<th>" + frequency + "</th>",
      "</tr>"
    );

    $("input").val("");
    // database.ref().once("child_added", function(data) {
    //   $(".trainble").append(
    //     "<tr>",
    //     "<th>" + data.val()._trainName + "</th>",
    //     "<th>" + data.val().destination + "</th>",
    //     "<th>" + data.val().frequency + "</th>",
    //     "</tr>"
    //   );
    // });
  }); //submit.on("click") close
}); //doc.on("ready") close
2;
