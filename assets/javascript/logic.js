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
    var instanceKey = Object.keys(snapshot.val());

    for (var i = 0; i < snapshot.numChildren(); i++) {
      var tFrequency = snapshot.val()[instanceKey[i]]["frequency"];

      var firstTime = snapshot.val()[instanceKey[i]]["firstTime"];

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

      var currentTime = moment();

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % tFrequency;

      var tMinutesTillTrain = tFrequency - tRemainder;

      var nextTrain = moment().add(tMinutesTillTrain, "minutes");

      $(".trainble").append(
        "<tr>",
        "<th>" + snapshot.val()[instanceKey[i]]["_trainName"] + "</th>",
        "<th>" + snapshot.val()[instanceKey[i]]["destination"] + "</th>",
        "<th>" + snapshot.val()[instanceKey[i]]["frequency"] + "</th>",
        "<th>" + moment(nextTrain).format("hh:mm") + "</th>",
        "<th>" + tMinutesTillTrain + "</th>",
        "</tr>"
      );
    } //for loop close
  }); //database.ref on"value" closer

  $(".submit").on("click", function() {
    database.ref().once("value", function(snapshot) {
      var instanceKey = Object.keys(snapshot.val());

      for (var i = 0; i < snapshot.numChildren(); i++) {
        var tFrequency = snapshot.val()[instanceKey[i]]["frequency"];

        var firstTime = snapshot.val()[instanceKey[i]]["firstTime"];
      }

      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

      var currentTime = moment();

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % tFrequency;

      var tMinutesTillTrain = tFrequency - tRemainder;

      var nextTrain = moment().add(tMinutesTillTrain, "minutes");

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
        "<th>" + moment(nextTrain).format("hh:mm") + "</th>",
        "<th>" + tMinutesTillTrain + "</th>",
        "</tr>"
      );

      $("input").val("");
    });
  }); //submit.on("click") close
}); //doc.on("ready") close
