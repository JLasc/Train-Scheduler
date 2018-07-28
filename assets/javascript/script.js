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
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
    });

  });


  //Data Persistence
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    
    
    snapObj = {
      name: childSnapshot.val().trainObject.trainName,
      dest: childSnapshot.val().trainObject.trainDest,
      freq: childSnapshot.val().trainObject.freq,
      nxtTrn: childSnapshot.val().nextTrain,
      minTrn: childSnapshot.val().minUntilTrain,
      test: childSnapshot.key
    }
    
    a = childSnapshot.key

    $(".tableInput").append(`
    <tr>
    <td>${snapObj.name}</td>
    <td>${snapObj.dest}</td>
    <td>${snapObj.freq}</td>
    <td>${snapObj.nxtTrn}</td> //Next Arrival - calculates from the current time, when next train will arrive
    <td>${snapObj.minTrn}</td> // Minutes away -  from the current time, when will the next train arrive.
    <td><i id="delete-btn" class="fas fa-times-circle"></i></td>
    <td><i id="edit-btn" class="fas fa-user-edit"></i></td>
    </tr>`);

  });

  $(document).on("click", "#delete-btn", function(){
    $( "tr" ).click(function() {
      $( this ).remove();
    });
    
  })



}); /* End of Doc Rdy */
