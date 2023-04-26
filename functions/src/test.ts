import {faker} from "@faker-js/faker";
import * as admin from "firebase-admin";
import moment from "moment";
/** */
export async function testCreatQuiz() {
  (await admin.firestore().collection("users").add({
    "type": "student",
    "courses": ["comp103", "phy111"],
    "name": faker.name.fullName(),
    "fcmtoken": "cyurfPLkTv66hh1uNWXe4I:"+
    "APA91bHUYLcxsPe2l9xftulEgi9JVwFSi3edUix4qLKK3jcQoS0gn_"+
    "ixUIkqz6VedklqukUvreKsuPnd3ak2RFhdZtLg"+
    "FO4DHqbENZix5CgFOYDehxXqF2Dz-9Qm6Z_knd_42yE_OBM-",
  }));


  const quizID = faker.datatype.uuid();
  (await admin.firestore().collection("Quizzes").add({
    creatorID: faker.datatype.uuid(),
    quizID: quizID,
    quizName: "Test quiz 1",
    creatorName: "Dan Lami",
    allQuestions: [
      {question: "how are you doing?",
        correctAnswers: [true, true, false, false],
        options: ["hello", "world", "where", "are we"],
      },
      {question: "how are you doing today ?",
        correctAnswers: [true, true, false, false],
        options: ["hello", "world", "where", "are we"],
      },
      {question: "how are you doing in three days?",
        correctAnswers: [true, true, false, false],
        options: ["hello", "world", "where", "are we"],
      },
    ],
    createdDate: moment().valueOf(),
    duration: faker.datatype.number({min: 1, max: 3}),
    startDate: moment().valueOf(),
    startTime: {"hour": moment().hour()+1, "min": moment().minute()+3},
    courses: ["comp103", "phy111", "comp143"],
  }));
}
