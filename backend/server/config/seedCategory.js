const Category = require("../modules/categoryModel");

// ===== 20 CATEGORIES SEED DATA =====
const categoriesData = [
  {
    categoryName: "Artificial Intelligence",
    description: "Explore the latest in AI, from generative models to prompt engineering and ethical AI.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776706973/download_2_pj9fx8.jpg",
    status: true
  },
  {
    categoryName: "Frontend Development",
    description: "Everything about building beautiful, responsive user interfaces with modern frameworks.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707132/untitlsssssed_cfvdpf.png",
    status: true
  },
  {
    categoryName: "Backend Engineering",
    description: "Deep dives into server-side architecture, APIs, and scalable infrastructure.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707199/1_sHCJ7Pk_gKEdwi_iFk918w_ubbwp0.png",
    status: true
  },
  {
    categoryName: "Cloud Computing & DevOps",
    description: "Mastering deployment, CI/CD pipelines, and managing infrastructure in the cloud.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707382/download_3_qrpwsv.jpg",
    status: true
  },
  {
    categoryName: "Machine Learning",
    description: "Practical guides and mathematical foundations of Machine Learning algorithms.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707538/1_xsir-fypCq_LrbK5jjyN9w_oyz9tr.jpg",
    status: true
  },
  {
    categoryName: "Cybersecurity",
    description: "Protecting systems, networks, and data from digital attacks and vulnerabilities.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707589/download_4_j6iwa4.jpg",
    status: true
  },
  {
    categoryName: "Database Management",
    description: "SQL, NoSQL, graph databases, and strategies for optimal data storage.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707643/download_5_ahulpn.jpg",
    status: true
  },
  {
    categoryName: "Mobile App Development",
    description: "Building cross-platform and native mobile applications for iOS and Android.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707721/mobile-app-development-lifecycle-steps_cbplpi.jpg",
    status: true
  },
  {
    categoryName: "Software Architecture",
    description: "Design patterns, system design, microservices, and maintainable software.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707785/1_XjTCoBcq_xi1Ad60WabLog_kcotfi.png",
    status: true
  },
  {
    categoryName: "Data Science & Analytics",
    description: "Extracting meaningful insights and visualizing complex data sets.",
    categoryImage: "https://res.cloudinary.com/djf0p1qll/image/upload/v1776707834/images_jnqpat.jpg",
    status: true
  },
];

const seedCategories = async () => {
  try {
    // Check if categories already exist
    const existingCount = await Category.countDocuments();
    
    if (existingCount > 0) {
      console.log(`ℹ️  Categories already seeded (${existingCount} found). Skipping...`);
      return;
    }

    // Insert the 20 categories into the database
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Successfully seeded ${insertedCategories.length} categories!`);
  } catch (error) {
    console.error("❌ Error seeding categories:", error.message);
  }
};

module.exports = seedCategories;