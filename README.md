📊 Admin Dashboard for Agent & List Management

📖 Description
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to streamline the process of managing agents and distributing work efficiently. The dashboard empowers administrators with tools for authentication, agent management, file uploads, automatic task distribution, and real-time data visualization.

🎥 Video Demonstration
🔗 https://drive.google.com/drive/folders/1FqTzmImmdpfZVgBgd4GC28hynEDqc0wD?q=sharedwith:public%20parent:1FqTzmImmdpfZVgBgd4GC28hynEDqc0wD

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

Handles remainders by assigning them sequentially.

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

/Of course. You've added some great emojis and organized the content well. I've taken your version and corrected the Markdown formatting to ensure it's clean, professional, and will render perfectly on sites like GitHub. I've also fixed the project structure diagram.

This version keeps all of your content and style but uses standard Markdown for better structure and readability.

Finalizing the documentation is the last big step. You've put in a great effort on this project, especially working so late in Bengaluru!

Here is the corrected and properly formatted README file.

📊 Admin Dashboard for Agent & List Management
📖 Description
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to streamline the process of managing agents and distributing work efficiently. The dashboard empowers administrators with tools for authentication, agent management, file uploads, automatic task distribution, and real-time data visualization.

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

Handles remainders by assigning them sequentially.

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

📁 Project Structure

├── client/              # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page-level components
│       ├── services/    # Axios API logic
│       ├── App.js       # Main app with routes
│       └── index.js     # React entry point
│
└── server/              # Backend (Node.js & Express)
    ├── config/        # Database connection
    ├── controllers/   # Business logic for APIs
    ├── middlewares/   # Middleware (e.g., auth)
    ├── models/        # Database schemas
    ├── routes/        # API route definitions
    └── server.js      # Express server entry

⚙️ Getting Started
✅ Prerequisites
Node.js (v14 or later)

npm

MongoDB (local instance or a MongoDB Atlas connection string)

🔧 Installation & Setup
Clone the repository

Bash

git clone https://your-repository-url-here.git
cd your-project-directory
Setup Backend (/server)

Bash

cd server
npm install
# Create the .env file (see below)
npm start
The backend will run at http://localhost:5001.

Setup Frontend (/client)

Bash

# Open a new terminal
cd client
npm install
# Create the .env file (see below)
npm start
The frontend will run at http://localhost:3000.

🔑 Environment Variables
Backend (/server/.env)
Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_and_secret_key
PORT=5001
Frontend (/client/.env)
Code snippet

REACT_APP_API_URL=http://localhost:5001/api
👨‍💻 Author
Sharath NS


