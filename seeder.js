const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Adjust the path according to your project structure
require("dotenv").config();

// Replace with your MongoDB connection string
const dbURI = process.env.mongoURI

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB...");

    // Create admin user data
    const adminData = {
      UserName: "adminUser",
      Password: "adminPassword123", // Plain password, will be hashed
      FirstName: "Admin",
      LastName: "User",
      HomeAddress: "123 Admin Street",
      CountryCode: "US",
      Email: "admin@example.com",
      TelephoneNumber: "123-456-7890",
      admin: true,
    };

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminData.Password, 10);
    adminData.Password = hashedPassword; // Replace plain password with hashed one

    // Create a new user with the hashed password
    const admin = new User(adminData);

    // Save the admin user to the database
    try {
      await admin.save();
      console.log("Admin user created successfully!");
    } catch (error) {
      console.error("Error creating admin user:", error.message);
    } finally {
      mongoose.connection.close(); // Close the connection after seeding
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
