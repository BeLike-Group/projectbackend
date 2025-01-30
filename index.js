const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./db.js");

const app = express();

// Configure CORS to allow specific origins
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"));  // Reject the request
    }
  },
};

app.use(cors(corsOptions));  // Apply the custom CORS options

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const flightRoutes = require("./routes/api/flights.js");
const userRoutes = require("./routes/api/users.js");
const reservationRoutes = require("./routes/api/reservations.js");
const paymentRoutes = require("./routes/api/payment.js");

connectDB();
app.use("/api/flight", flightRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
