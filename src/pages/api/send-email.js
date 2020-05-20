import nodemailer from "nodemailer";
import sqlite from "sqlite";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default async (req, res) => {
  if (req.method === "POST") {
    const db = await sqlite.open("./mydb.sqlite");
    const { name, email, ticketId } = req.body;
    const fileName = await db.get(
      "select pathToFile from ticket where id = ?",
      ticketId
    );
    console.log(fileName);
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      text: `Hello ${name}, thank you for purashing!`,
      attachments: [
        {
          fileName: fileName.pathToFile,
          path: `./uploads/${fileName.pathToFile}`,
        },
      ],
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error: ", err);
        return res.status(404).json({
          error: {
            code: "not_found",
            messgae:
              "The requested endpoint was not found or doesn't support this method.",
          },
        });
      } else {
        console.log("Message sent!");
        return res.status(200).end();
      }
    });
  }
};
