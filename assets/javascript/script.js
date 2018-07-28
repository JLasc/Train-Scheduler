$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB7nHRA8mThsS7JoZOJ_mKIcKTeMaDo7Ls",
    authDomain: "train-scheduler-8c05a.firebaseapp.com",
    databaseURL: "https://train-scheduler-8c05a.firebaseio.com",
    projectId: "train-scheduler-8c05a",
    storageBucket: "train-scheduler-8c05a.appspot.com",
    messagingSenderId: "962906673522"
  };
  firebase.initializeApp(config);

  var databse = firebase.database();


  $(".submit-btn").on("click", function() {
    event.preventDefault();

    
  trainObj = {
    trainName: $("#trainName").val().trim(),
    trainDest: $("#trainDestination").val().trim(),
    firstTrain: $("#firstTrainTime").val().trim(),
    freq: $("#trainFrequency").val().trim()
  };


    $(".tableInput").append(`
      <tr>
      <td>${trainObj.trainName}</td>
      </tr>`
  )

    
  });

  
});