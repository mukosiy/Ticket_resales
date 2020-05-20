import sqlite from "sqlite";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export default async function login(req, res) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "POST") {
    const person = await db.get(`select * from person where email = ?`, [
      req.body.email,
    ]);
    console.log(req.body.password);

    compare(req.body.password, person.password, function (err, result) {
      if (!err && result) {
        const claims = {
          sub: person.id,
          email: person.email,
          name: person.name,
        };
        const jwt = sign(claims, process.env.GUID, { expiresIn: "1h" });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize(
            "auth",
            `{"jwt":"${jwt}", "userId":"${claims.sub}", "userName":"${claims.name}", "userEmail":"${claims.email}"}`,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            }
          )
        );
        res.status(201).json({
          message: `Welcome back ${person.name}👋🏻!`,
          userId: person.id,
        });
      } else {
        res.json({ message: "Ups, something went wrong" });
      }
    });
  } else {
    res.status(405).json({ message: "Only POST request" });
  }
}
