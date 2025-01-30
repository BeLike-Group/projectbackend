require("dotenv").config();

const port = process.env.PORT;

authentication.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
