import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import cors from "cors";
import hamsters from "./routes/hamsters.js";
import winners from "./routes/winners.js";
import losers from "./routes/losers.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const PORT = process.env.PORT || 1515;
const distPath = path.join(__dirname, "/../dist/");
console.log("distpath:", distPath);

//Middleware
app.use("/img", express.static(path.join(__dirname, "/hamsterImages/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(distPath));
// debuging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next();
});

// Endpoints
// api for hamsters
app.use("/hamsters/cutest", winners);
app.use("/hamsters/losers", losers);
app.use("/hamsters", hamsters);
// app.use("/matches", matches);
// app.use("/matchWinners", matchWinners);

// Övriga endpoints, för att fungera med React Router i frontend
app.all("*", (req, res) => {
  res.sendFile(distPath + "index.html");
});

//Starting server
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
