const app = require("./app");
const connectDB = require("./config/connectDB");
const { PORT } = require("./secret");
//
// Start server ---***
app.listen(PORT, () => {
  console.log(`Server connected: http://localhost:${PORT}!`);
  connectDB();
});
