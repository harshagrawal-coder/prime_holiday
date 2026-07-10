import app from "./src/app.js";
// import Tour from "./src/model.js/tourSchema.js"
import { connectDB } from "./src/config/database.js";
import redisClient from "./src/services/redis.js";
const startServer = async () => {
  try {
    await connectDB();
    
    await redisClient.connect();
    app.listen(8080, () => {
      console.log(`Server is running on port`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
