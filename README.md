# Blog Website 📝

A full-stack blog platform built with React, Node.js, and MongoDB. Features a modern admin dashboard, user authentication, analytics tracking, and content management system.

## 🌟 Features

### Frontend
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive UI
- **User Authentication**: Register, login, and OTP-based email verification
- **Blog Discovery**: Browse blogs with pagination and search functionality
- **Rich Reading Experience**: Dedicated blog pages with smooth scrolling and animations
- **Admin Dashboard**: Comprehensive dashboard for content management
  - Blog management (create, update, delete)
  - Category management
  - Comment moderation
  - User management
  - Analytics dashboard with charts and statistics
- **User Profiles**: Profile management and security settings
- **Interactive Features**: Likes, comments, and real-time interactions
- **Animations**: Framer Motion for smooth transitions and effects

### Backend
- **RESTful API**: Express.js server with clean route structure
- **Database**: MongoDB with Mongoose ORM for data persistence
- **Authentication**: JWT-based authentication with password hashing (bcrypt)
- **File Management**: 
  - Cloudinary integration for image uploads and optimization
  - Multer middleware for file handling
- **Email Services**: Nodemailer/Resend for email notifications
- **Analytics**: 
  - View tracking with geolocation data (geoip-lite)
  - Daily analytics aggregation
  - User agent detection
- **Admin Features**:
  - Automated admin seeding
  - Category seeding
  - Scheduled tasks with Agenda
- **CORS Support**: Configured for multiple origins (local dev, deployment)

### Content Management
- **Blog Posts**: Full-featured blog creation with:
  - Multi-section support with individual images
  - Reading time calculation
  - Author information
  - Status management (draft/published)
  - Slug-based URLs
  - View and like tracking
- **Categories**: Organize blogs into categories
- **Comments**: Nested comment system with moderation
- **Contact Form**: Customer contact submissions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js & Recharts** - Data visualization
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **JWT Decode** - Token parsing
- **React Toastify** - Notifications

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud image storage
- **Nodemailer/Resend** - Email service
- **Multer** - File upload middleware
- **Agenda** - Task scheduling
- **CORS** - Cross-origin resource sharing
- **GeoIP Lite** - Geolocation detection
- **UA Parser** - User agent detection

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account
- Email service (Nodemailer/Resend)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Blog-Website
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
FRONTEND_URL=http://localhost:5174
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5174`

## 📁 Project Structure

```
Blog-Website/
├── backend/
│   ├── server/
│   │   ├── config/          # Configuration files (DB, JWT, Multer, Email)
│   │   ├── controller/      # Route controllers (Blog, Category, Comment, etc.)
│   │   ├── modules/         # Mongoose schemas and models
│   │   └── routes/          # Express routes (customer, admin, analytics)
│   ├── public/
│   │   └── image/           # Uploaded images directory
│   ├── index.js             # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── component/
    │   │   ├── analytics/   # Analytics components
    │   │   ├── dashboard/   # Admin dashboard pages
    │   │   ├── layout/      # Layout components (Header, Footer)
    │   │   ├── pages/       # Public pages (Blog, Home, Contact, etc.)
    │   │   └── AuthContext.jsx
    │   ├── utils/           # Utility functions
    │   ├── App.jsx          # Main app component
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔌 API Endpoints

### Public Routes
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/otp` - OTP verification
- `POST /api/blogs` - Get all blogs with filters
- `POST /api/blogs/:slug` - Get blog by slug
- `POST /api/category` - Get all categories
- `POST /api/contact` - Submit contact form

### Protected Routes (User)
- `POST /api/like/blog` - Like a blog
- `POST /api/find/user` - Get user profile
- `POST /api/profile/update` - Update user profile

### Admin Routes
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create/blog` - Create new blog
- `POST /api/admin/update/blog` - Update blog
- `POST /api/admin/delete/blog` - Delete blog
- `POST /api/admin/create/category` - Create category
- `POST /api/admin/update/category` - Update category
- `POST /api/admin/delete/category` - Delete category

## 🔐 Authentication

- **User Registration**: Email verification with OTP
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Dashboard accessible only to authenticated admins
- **Password Hashing**: Bcrypt for secure password storage

## 📊 Analytics

- **View Tracking**: Track blog views with geolocation
- **User Agent Detection**: Identify browser and device information
- **Daily Analytics**: Aggregated analytics data
- **Dashboard Charts**: Visual representation of analytics data

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom CSS**: Additional custom styles in `App.css` and `index.css`
- **PostCSS**: CSS preprocessing with autoprefixer

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Node.js Server)
- Deploy to platforms like Heroku, Railway, or Render
- Update environment variables for production
- Configure CORS origins for deployed frontend URL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC License - Created by Kartik Dhoor

## 🔗 Links

- **Frontend Repository**: [Deployed](https://blog-website-to47.vercel.app)
- **Live Site**: https://neuradhoor.kartikdhoor.com

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Happy Blogging!** 🎉
