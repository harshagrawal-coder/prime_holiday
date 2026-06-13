import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
const startServer = async () => {
  try {
    await connectDB();

    app.listen(8080, () => {
      console.log(`Server is running on port`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
