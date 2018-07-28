$(document).ready(function () {
  
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
  var database = firebase.database();

  //Submitt Button Event
  $(".submit-btn").on("click", function () {
    event.preventDefault()


    //Holds the values of the forms.
    trainObj = {
      trainName: $("#trainName").val().trim(),
      trainDest: $("#trainDestination").val().trim(),
      firstTrain: $("#firstTrainTime").val().trim(),
      freq: $("#trainFrequency").val().trim()
    };


    //Grabs the input value entered, and stores it inside moment()
    firstTrainTime = moment(trainObj.firstTrain, "hh:mm A");
    //Finds the difference in current time and firstTrain in minutes
    timeDiff = moment().diff(moment(firstTrainTime), "minutes");
    //Modulus frequency to give remainder time in minutes
    timeTillNext = timeDiff % trainObj.freq;
    //Subtracts frequency from remainder to give minutes until next train arrival
    minUntilTrain = trainObj.freq - timeTillNext;
    //Add mins until next train to current time, and format to display hh:mm 
    nextTrain = moment().add(minUntilTrain, "minutes").format("h:mm A");

    //Push to Firebase
    database.ref().push({
      trainObject: trainObj,
      nextTrain: nextTrain,
      minUntilTrain: minUntilTrain,
      timeStamp: firebase.database.ServerValue.TIMESTAMP
    });

  });

  //Data Persistence
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    $(".tableInput").append(`
    <tr>
    <td>${childSnapshot.val().trainObject.trainName}</td>
    <td>${childSnapshot.val().trainObject.trainDest}</td>
    <td>${childSnapshot.val().trainObject.freq}</td>
    <td>${childSnapshot.val().nextTrain}</td> //Next Arrival - calculates from the current time, when next train will arrive
    <td>${childSnapshot.val().minUntilTrain}</td> // Minutes away -  from the current time, when will the next train arrive.
    </tr>`);

  });

}); /* End of Doc Rdy */
