import mysql from "mysql2/promise";

//1:Connect mySql server to nodejs
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pixesvikas9372965318",
  database: "mysql_db",
});
console.log("MySQL Connected Succesfully");
//2)We need to create database
// await db.execute(`create database mysql_db`);
// console.log(await db.execute('show databases'));

//3)create a table
// await db.execute(
//     `CREATE TABLE users(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//     );
// `);

//4)CRUD operation
//i)create
//1)(Using inline values(Not recommended))
// await db.execute(`
//     insert into users(username,email) values("vikas","vikas@123");
//     `);
//2)Using prepared statements(best practices)
// await db.execute(`
//     insert into users(username,email) values(?,?)`,[
//         "ajay","ajay123@",
//     ]);
//3)Inserting multiple values
// const values=[
//     ["raj","raj@"],
//     ["JAY","JAY@"],
//     ["sam","sam@"],
// ];
// await db.query("insert into users(username,email) values ?",[values]);
//ii)read
// const rows = await db.execute(` //gives table and meta data as well
const [rows] = await db.execute(`select * from users`); //gives only table data
// const [rows] = await db.execute(`select * from users where username="vikas"`);
console.log(rows);

//iii)UPDATE
//1)Old way
// try {
//   const [rows] =await db.execute(
//     `update users set username="vikaspal" where email="vikas@123"`
//   );
//   console.log(rows);
// } catch (error) {
//   console.error(error);
// }
//2)Recommended
// try {
//   const [rows] =await db.execute(
//     `update users set username=? where email=?`,[
//         "jayshah","JAY@"
//     ]
//   );
//   console.log(rows);
// } catch (error) {
//   console.error(error);
// }
//iv)DELETE
// try {
//   const [rows] = await db.execute(`delete from users where email="raj@"`);
// } catch (error) {
//   console.error(error);
// }
