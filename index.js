//index.js
const express = require("express");
const app = express();
const port = 3000;

//index.js
const journalRouter = require("./routes/journal.js");
app.use(express.json());

app.use(journalRouter);

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});

