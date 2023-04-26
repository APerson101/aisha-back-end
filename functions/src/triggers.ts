/* eslint-disable valid-jsdoc */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import moment from "moment";
/**
 * This function would be triggerred whenever new quiz is added
 *
 */
export const newQuiz=
  functions.firestore.document("Quizzes/{quizId}").
      onCreate(async (snap, )=>{
        const quiz=snap.data();
        console.log("newly created quiz starting"+
        `:${quiz.startDate} `+
        `and would start at time: ${quiz.startTime}`);

        // get all affected students
        const snapshot=(await admin.firestore().collection("users")
            .where("courses", "array-contains-any", quiz.courses)
            .get());
        const tokens:string[]=[];
        const usersArray=snapshot.docs;
        for (let index = 0; index < usersArray.length; index++) {
          const element = usersArray[index];
          tokens.push(element.get("fcmtoken"));
        }
        const date=quiz.startDate;
        const convertedDate=moment(date).format("DD MM YY");
        const hr=quiz.startTime.hour;
        const min=quiz.startTime.min;
        const duration=quiz.duration;
        const message = {
          notification: {
            title: "new quiz added",
            body:
              "Your quiz awaits "+
              `on ${convertedDate}, `+
              `by ${hr}:${min} for ${duration} mins`,
          },
          tokens: tokens,
          data: JSON.parse(JSON.stringify({
            type: "new-quiz-added",
            quizId: quiz.quizID,
          })),
        };
        await sendMessage(message);
      });
/**
 * message: This parameter contains all necessary informaton
 * returns a boolean
 */
async function sendMessage( message:any):Promise<boolean> {
  return (await admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + " messages were sent successfully");
        return true;
      }).catch((error) => {
        console.log(error); return false;
      }));
}
