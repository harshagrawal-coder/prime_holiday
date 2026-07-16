import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "./src/config/config.js";
import User from "./src/model.js/userSchema.js";

async function adminSeeder() {
  try {
    await mongoose.connect(config.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullname: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword, // Use plain password if you have a pre-save hook
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
}

adminSeeder();