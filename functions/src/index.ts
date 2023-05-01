import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {newQuiz} from "./triggers";
exports.new=newQuiz;
admin.initializeApp({credential: admin.credential.applicationDefault()});


export const sendMessageToTokens=functions.https.onCall(async ()=>{
  const token = (await admin.firestore().
      collection("users").get()).docs[0].get("fcmtoken");
  console.log(`the fcm token is: ${token}`);
  const registrationTokens = [token]
  ;
  // const registrationTokens =data["tokens"];
  const message = {
    notification: {
      title: "new quiz added",
      body:
      "New Quiz added to COMP101 will be on Fri/14/Jan, 45:50 for 30 mins"},
    tokens: registrationTokens,
    data: {
      type: "start-quiz",
    },
  };


  return (await admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + " messages were sent successfully");
        return true;
      }).catch((error)=>{
        console.log(error); return false;
      }));
});

/**
 * get most recently created quiz, and
 * get the time for the quiz to start in milliseconds
 * subract 10 mins from it, and send notifications to students
 * and also to lecturer
*/
