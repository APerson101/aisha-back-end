// import * as admin from "firebase-admin";
// import moment from "moment";
// /** */
// export async function testCreatQuiz() {
//   // (await admin.firestore().collection("users").add({
//   //   "type": "student",
//   //   "courses": ["comp103", "phy111"],
//   //   "name": faker.name.fullName(),
//   //   "fcmtoken": "cyurfPLkTv66hh1uNWXe4I:"+
//   //   "APA91bHUYLcxsPe2l9xftulEgi9JVwFSi3edUix4qLKK3jcQoS0gn_"+
//   //   "ixUIkqz6VedklqukUvreKsuPnd3ak2RFhdZtLg"+
//   //   "FO4DHqbENZix5CgFOYDehxXqF2Dz-9Qm6Z_knd_42yE_OBM-",
//   // }));

//   // get all courses
//   const coursesDocs=(await admin.
// firestore().collection("courses").get()).docs;

//   // get all lecturers

//   const staff=((await admin.firestore().
//       collection("users").
//       where("userType", "==", "staff").get()).docs );
//   for (const person in staff) {
//     if (Object.prototype.hasOwnProperty.call(staff, person)) {
//       const element = staff[person].data();

//       const quizID = faker.datatype.uuid();
//       (await admin.firestore().collection("Quizzes").add({
//         creatorID: element.id,
//         quizID: quizID,
//         quizName: faker.company.name(),
//         creatorName: element.name,
//         allQuestions: [
//           {question: faker.random.words(15),
//             correctAnswers: [true, true, false, false],
//             options: faker.random.words(4).split(" "),
//           },
//           {
//             question: faker.random.words(15),
//             correctAnswers: [true, true, false, false],
//             options: faker.random.words(4).split(" "),
//           },
//           {
//             question: faker.random.words(15),
//             correctAnswers: [true, true, false, false],
//             options: faker.random.words(4).split(" "),
//           },
//         ],
//         createdDate: moment().valueOf(),
//         duration: faker.datatype.number({min: 1, max: 10}),
//         startDate: moment().valueOf(),
//         startTime: {"hour": moment().hour()+2,
// "min": moment().minute()+3},
//         courses: [
//           coursesDocs[Math.random() * (coursesDocs.length - 0) + 0]
//               .get("name")],
//       }));
//     }
//   }
// }
