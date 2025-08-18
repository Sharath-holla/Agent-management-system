📊 Admin Dashboard for Agent & List Management
📖 Description

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to streamline the process of managing agents and distributing work efficiently.

The dashboard empowers administrators with tools for:

Authentication

Agent management

File uploads

Automatic task distribution

Real-time data visualization

🎥 Video Demonstration

🔗 Link to a working video demonstration of the application

🚀 Key Features
🔐 Secure Admin Authentication

JSON Web Tokens (JWT) ensure only verified admins can access the dashboard.

Passwords are securely hashed with Bcrypt.js before storage.

👥 Agent Management

Admins can create and manage agents with details like name, email, mobile number, and password.

📂 File Upload with Validation

Supports .csv, .xlsx, and .xls uploads.

Uses Multer for file handling and xlsx for parsing spreadsheet data.

Built-in validation ensures data integrity.

⚡ Automatic Task Distribution

Business logic automatically distributes uploaded list items among the first 5 available agents.

Handles remainders by assigning sequentially.

📊 Dynamic Data Display

Lists are fetched in real-time and displayed by agent.

Data is visually grouped using agent-specific cards.

🎨 Modern & Responsive UI

Built with Material-UI (MUI) for consistency and accessibility.

Features a dark theme and responsive layout for all devices.

✨ User Feedback & Animations

React Toastify provides non-intrusive notifications.

Framer Motion adds smooth transitions and animations.

🛠️ Tech Stack
Backend

Node.js & Express.js – Server and REST API

MongoDB & Mongoose – NoSQL database with schema modeling

JWT – Secure authentication

Bcrypt.js – Password hashing

Multer & xlsx – File upload and spreadsheet parsing

Frontend

React.js – UI library

Material-UI (MUI) – Component library for styling

Framer Motion – Animations

Axios – API requests

React Dropzone – File upload UI

React Toastify – Notifications

/
├── client/               # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       ├── services/     # Axios API logic
│       ├── App.js        # Main app with routes
│       └── index.js      # React entry point
│
└── server/               # Backend (Node.js & Express)
    ├── config/           # Database connection
    ├── controllers/      # Business logic for APIs
    ├── middlewares/      # Middleware (e.g., auth)
    ├── models/           # Database schemas
    ├── routes/           # API route definitions
    └── server.js         # Express server entry

⚙️ Getting Started
✅ Prerequisites

Node.js (v14 or later)

npm

MongoDB (local or MongoDB Atlas connection)

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://your-repository-url-here.git
cd your-project-directory

2️⃣ Setup Backend (/server)
cd server
npm install
# Create the .env file (see below)
npm start   # Runs backend at http://localhost:5001

3️⃣ Setup Frontend (/client)
# Open a new terminal
cd client
npm install
# Create the .env file (see below)
npm start   # Runs frontend at http://localhost:3000

🔑 Environment Variables
Backend (/server/.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_and_secret_key
PORT=5001

Frontend (/client/.env)
REACT_APP_API_URL=http://localhost:5001/api

👨‍💻 Author

Sharath NS