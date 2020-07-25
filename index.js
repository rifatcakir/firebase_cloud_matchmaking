const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


//https://firebase.google.com/docs/functions/database-events?authuser=0

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
/*exports.makeUppercase = functions.database.ref('/ActiveUsers/{mapID}/{userId}/inGame')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
  
	  console.log('ActiveUsersInMAP1 ',  original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });*/
	
exports.matchMakingMAPID_1 = functions.database.ref('/ActiveUsers_MAPID_1/MAPID_1/{userId}').onWrite(
	async (change) => {
      const collectionRef = change.after.ref.parent;
      const countRef = collectionRef.parent.child('user_count');
	  var url = require('url');
		var adr = ''+collectionRef;
		var q = url.parse(adr, true);
		var path=q.pathname+"/";
	  
		console.log('RIFAT collectionRef'+collectionRef);
		console.log('RIFAT path ---> '+path);
		let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

	  let getusers=0;
	  await countRef.transaction((current) => {
		  let sum=(current || 0)+increment;
		  // createGame(collectionRef);
		  getusers=sum;
		if(sum<0)
			sum=0;
        return sum;
      });
	  if(getusers>2){
			  getUsers(path);
		   
	  }
	 // console.log('RIFAT '+change);
	  return null;
	  });

	exports.matchMakingMAPID_2 = functions.database.ref('/ActiveUsers_MAPID_2/MAPID_2/{userId}').onWrite(
	async (change) => {
      const collectionRef = change.after.ref.parent;
      const countRef = collectionRef.parent.child('user_count');
	  var url = require('url');
		var adr = ''+collectionRef;
		var q = url.parse(adr, true);
		var path=q.pathname+"/";
	  
		console.log('RIFAT collectionRef'+collectionRef);
		console.log('RIFAT path ---> '+path);
		let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

	  let getusers=0;
	  await countRef.transaction((current) => {
		  let sum=(current || 0)+increment;
		  // createGame(collectionRef);
		  getusers=sum;
		if(sum<0)
			sum=0;
        return sum;
      });
	  if(getusers>2){
			  getUsers(path);
		   
	  }
	 // console.log('RIFAT '+change);
	  return null;
	  });


exports.matchMakingMAPID_3 = functions.database.ref('/ActiveUsers_MAPID_3/MAPID_3/{userId}').onWrite(
	async (change) => {
      const collectionRef = change.after.ref.parent;
      const countRef = collectionRef.parent.child('user_count');
	  var url = require('url');
		var adr = ''+collectionRef;
		var q = url.parse(adr, true);
		var path=q.pathname+"/";
	  
		console.log('RIFAT collectionRef'+collectionRef);
		console.log('RIFAT path ---> '+path);
		let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

	  let getusers=0;
	  await countRef.transaction((current) => {
		  let sum=(current || 0)+increment;
		  // createGame(collectionRef);
		  getusers=sum;
		if(sum<0)
			sum=0;
        return sum;
      });
	  if(getusers>2){
			  getUsers(path);
		   
	  }
	 // console.log('RIFAT '+change);
	  return null;
	  });




	 function getUsers(path){
		 console.log('TRYING TO GET USERS');
		var ref2= admin.database().ref(path);
		var gameID=Date.now();
		var mapID = path.match(/([^\/]*)\/*$/)[1];  /* eslint-disable-line */
		var activeGameRef = admin.database().ref("/ActiveGame/"+mapID).child(gameID.toString());
		return ref2.orderByChild("time").limitToFirst(10).once("value")
		  .then(snapshot => { 
			  const original = snapshot.val();
		  
			 // console.log('ActiveUsersInMAP1 ',  original);
			  
			  snapshot.forEach(function(childSnapshot) { 
			  
				var key = childSnapshot.key;//UserID
				var messageData = childSnapshot.val(); //Creating Time
				//AddingUsersToGameRoom
				//----------------
				activeGameRef.child(key).set({
					userID: key,
					time: admin.database.ServerValue.TIMESTAMP // this will write 'startedAt: 1537806936331`
				});
				//-------------------
				
				//UpdateUserGameID
				//-----------------
				var useradress="/Users/"+key+"/gameRoomID/";
				admin.database().ref(useradress).set(gameID.toString());
				//console.log('---gameID.toString() ',  gameID.toString());
				//-----------------
				
				//RemoveUserFromActiveUsers
				//------------------
				var ActiveUserAdress=path+key;
				admin.database().ref(ActiveUserAdress).remove();
				
				//console.log('---messageData ',  messageData);
					
			  })
			  return null;
		  });
	 }
	 
	 function CreateGame(){
	 }
	 
	 
	 
	 
	 	  //const snapshot = await admin.database().ref('/messages').push({original: original});
	/* function createGame() {
		var ref= admin.database().ref('/Users/444/userID');
		return ref.once("value")
		  .then(function(snapshot) {
			  const original = snapshot.val();
		  
			  console.log('USERID ',  original);
			  return null;
		  });
	 }
		*/
	  //admin.database().ServerValue.TIMESTAMP
	/*
			snapshot = admin.database().ref(mapRef).once('value')
		  .then(function(dataSnapshot) {
			        const original = dataSnapshot.val();
  
					console.log('SNAPSHOUT VALUE1 ',  original);
					dataSnapshot.forEach(function(childSnapshot) {
						var messageData = childSnapshot.val();
						console.log('Child '+ messageData);
						return null;
					});
	*/  
	
	
	/*
	var scoresRef = admin.database().ref("scores");
scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key + " score is " + data.val());
  });
});
	*/
