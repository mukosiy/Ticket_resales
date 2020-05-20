import sqlite from "sqlite";

export default async function getPersonById(req, res) {
  const db = await sqlite.open("./mydb.sqlite");

  

  const person = await db.get(`select * from person where id = ?`, [
    req.query.id,
  ]);
  res.json(person);
}
