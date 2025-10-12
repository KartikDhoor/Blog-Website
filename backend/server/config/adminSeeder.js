// server/config/adminSeeder.js
const bcrypt = require("bcrypt");
const User = require("../modules/userModel");

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPhone = process.env.ADMIN_PHONE;

    // check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail, userType: 1 });
    if (existingAdmin) {
      console.log("✅ Admin already exists:", adminEmail);
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // create admin user
    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      userType: 1,
      phone: adminPhone,
      emailVerified: true,
      introduction: "This is the Admin of this website so it has all the rights",
      verified: true, // skip OTP for admin
    });

    await admin.save();
    console.log("🎉 Admin user created successfully:", adminEmail);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  }
};

module.exports = seedAdmin;
