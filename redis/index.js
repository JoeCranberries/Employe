// import redis from "redis";
// import Employee from "../models/EmployeeModel.js";

// const client = redis.createClient();

// export const getEmployees = async (req, res) => {
//   const redisKey = "employee";
//   return client.get(redisKey, (err, data) => {
//     if (data) {
//       // cek apakah ada di redis atau tidak
//       res.status(200).send({ isCached: true, data: JSON.parse(data) });
//     } else {
//       Employee.find({}, (err, fetchData) => {
//         client.set(redisKey, JSON.stringify(fetchData), "EX", 60); // simpan hasil query ke dalam redis dalam bentuk JSON yang sudah di jadikan string, kita setting expired selaman 60 (detik)
//         res.status(200).send({ data: fetchData });
//       }); // fetch data dari mongoDB
//     }
//   });
// };
