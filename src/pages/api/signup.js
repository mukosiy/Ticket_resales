import sqlite from "sqlite";
import { hash } from "bcryptjs";
import cookie from "cookie";

export default async function signup(req, res) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "POST") {
    hash(req.body.password, 12, async function (err, hash) {
      const statement = await db.prepare(
        "INSERT OR IGNORE INTO person(name, email, password)  values(?,?,?)"
      );
      const result = await statement.run(req.body.name, req.body.email, hash);
      result.finalize();
      const person = await db.get(
        `select name, email, id from person where email = ?`,
        req.body.email
      );
      console.log(person);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(
          "auth",
          `{"userId":"${person.id}", "userName":"${req.body.name}", "userEmail":"${req.body.email}"}`,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          }
        )
      );

      res.status(201).json(person);
    });
  } else {
    res.status(405).json({ message: "Only POST request" });
  }
}
