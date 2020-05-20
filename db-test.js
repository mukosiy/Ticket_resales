const sqlite = require("sqlite");

async function setup() {
  const db = await sqlite.open("./mydb.sqlite");
  await db.migrate({ force: true });

  const people = await db.all(`SELECT * FROM Person`);
  console.log("All PEOPLE", JSON.stringify(people, null, 2));
  const tickets = await db.all(`SELECT * FROM ticket`);
  console.log("All tickets", JSON.stringify(tickets, null, 2));
}

setup();
