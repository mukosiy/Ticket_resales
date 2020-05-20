import formidable from "formidable";
import sqlite from "sqlite";
import cookie from "cookie";
import fs from "fs";
import path from "path";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  
  let title, descr, artist, place, fileName;

  const cookies = req.headers.cookie;
  const parsed = JSON.parse(cookie.parse(cookies).auth);
  const ownerId = parsed.userId;

  console.log(cookies);

  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads/";
  form.keepExtensions = true;

  form.on("fileBegin", function (name, file) {
    let time = new Date();
    time = time.getTime();
    form.path = time + "__" + file.name;
  });
  form.on("file", function (field, file) {
    fileName = file.name;
    fs.rename(file.path, path.join(form.uploadDir, fileName), function (err) {
      if (!err) {
        console.log("OK!");
      }
    });
    console.log(fileName);
  });

  form.parse(req, (err, fields, files) => {
    console.log(fields);
    title = fields.title;
    descr = fields.descr;
    artist = fields.artist;
    place = fields.place;
  });

  form.on("end", async function () {
    const db = await sqlite.open("./mydb.sqlite");
    const statement = await db.prepare(
      "INSERT INTO ticket(title,place, artist, descr, ownerId,pathToFile)  values(?,?,?,?,?,?)"
    );
    const result = await statement.run(
      title,
      place,
      artist,
      descr,
      ownerId,
      fileName
    );
    result.finalize();
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  });
}
