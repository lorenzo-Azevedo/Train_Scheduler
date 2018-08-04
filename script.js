var config = {
    apiKey: "AIzaSyClphYhJ8tcNUNxVRdgb9EGMoAALoKQRlg",
    authDomain: "train-homework-9a055.firebaseapp.com",
    databaseURL: "https://train-homework-9a055.firebaseio.com",
    projectId: "train-homework-9a055",
    storageBucket: "train-homework-9a055.appspot.com",
    messagingSenderId: "352789624259"
  };

  firebase.initializeApp(config);

  var trainData = firebase.database();

$('#addNew').on('click', function() {
	var trainName = $('#trainNameInput').val();
	var destination = $('#destinationInput').val();
	var firstTrainTime = $('#trainTimeInput').val();
	var frequency = $('#frequencyInput').val();

	var newTrain = {
		train: trainName,
		destination: destination,
		trainTime: firstTrainTime,
		frequency: frequency
	}

	trainData.push(newTrain);

	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#trainTimeInput').val("");
	$('#frequencyInput').val("");

});

trainData.on("child_added", function(childSnapshot) {

	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().trainTime;
	var frequency = childSnapshot.val().frequency;
	var trainFrequency = frequency;
	var firstTime = firstTrainTime;
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "y");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var minutesTillTrain = trainFrequency - tRemainder;
	var nextTrain = moment().add(minutesTillTrain, "minutes");
	var arrival = moment(nextTrain).format("hh:mm a");
    $('#trainTable > tbody').append(trainName +
    + destination + 
    + frequency + 
    + arrival + 
    + minutesTillTrain;
});