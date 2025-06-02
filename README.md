Xeno CRM — AI-Powered Customer Relationship Manager
A full-stack CRM application to manage customers, create AI-generated segments, launch targeted campaigns, and track campaign history — designed for personalization-driven marketing teams. Built using modern MERN stack with Google OAuth and Gemini AI integration.

📑 Table of Contents
About the Project
Built With
Features
Getting Started
Prerequisites
Installation
Usage
Project Structure
Database Schema
API Endpoints
Testing
Deployment
Contributing
License
Contact
Acknowledgements

📖 About the Project
Xeno CRM is a lightweight, multi-user CRM for marketing teams, enabling efficient customer base management, AI-driven behavioral segmentation, targeted campaign launches, and outcome tracking. It helps businesses understand customers and drive effective engagement.
🎥 Screenshots
(You can add screenshots here after deployment — like Dashboard, Segment Builder, Campaign Preview, etc.)

🏗 Built With
🔹 Frontend
React - For dynamic, interactive UIs with component-based architecture.
Vite - Fast development server and optimized build performance.
Tailwind CSS - Utility-first CSS for rapid UI development and responsive design.
React Router - Manages single-page application navigation.
Axios - Promise-based HTTP client for efficient API requests.
Recharts (for data visualization) - Composable charting library for dashboard analytics.

🔹 Backend
Node.js - JavaScript runtime for scalable, high-performance server-side applications.
Express.js - Fast, minimalist web framework for Node.js applications.
MongoDB Atlas - Fully managed, flexible, and scalable NoSQL cloud database.
Mongoose - MongoDB object modeling tool for Node.js, simplifying data interaction.
Passport.js (Google OAuth2) - Flexible authentication middleware for secure Google OAuth2 login.

🔹 AI & Deployment
Gemini API (Google AI) - Powers AI Segment Builder for intelligent customer segmentation.
Render - Unified cloud platform for backend hosting with automatic deploys.
Vercel - Frontend deployment platform with instant static deploys.

✨ Features

🔐 Google Login (session support): Secure Google account authentication with session support for quick access and persistent login.
👤 Multi-user customer management: Enables multiple marketing team members to manage distinct customer bases, ensuring data separation.
🧠 AI Segment Builder (Gemini API): Leverages Google's Gemini AI to generate intelligent customer segments from descriptive text prompts.
📬 Smart Segment Campaign Launch: Initiates targeted marketing campaigns directly to AI-generated or manual segments.
📊 Campaign History: Provides a detailed log of past campaigns for review and analysis.
📈 Analytics Dashboard: Offers a comprehensive overview of CRM metrics and campaign performance via charts.
📁 Segment Management (edit/delete): Dedicated page to view, modify, or delete created segments.
👥 Customer Explorer & Manual Entry: Centralized interface to browse existing customer data and manually add new records.
🌐 Responsive, Production-Ready UI: Designed with Tailwind CSS for flawless performance across all devices.

🚀 Getting Started

✅ Prerequisites
Ensure you have installed:
Node.js v18+: JavaScript runtime for frontend and backend.
npm: Node Package Manager.
Git: Version control for cloning repository.
MongoDB Atlas account: For database hosting and connection string.
Google Cloud Console project (for OAuth2): To obtain GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.

⚙️ Installation

1. Clone the Repository
   git clone https://github.com/your-username/xeno-crm.git
   cd xeno-crm

2. Backend Setup
   cd backend
   npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Start the backend:
npm run dev

Backend runs on http://localhost:5000. 3. Frontend Setup
cd ../frontend
npm install

Create a .env file:
VITE_BACKEND_URL=http://localhost:5000

Start the frontend:
npm run dev

Frontend runs on http://localhost:5173.

🚘 Usage
To use Xeno CRM:
Login with your Google account.
View Dashboard and Customer Explorer for insights and customer record management.
Create Segments with AI using text prompts (e.g., "customers who spent over $100 in the last month").
Preview customers in new segments for accuracy, then save.
Launch campaigns to selected segments by crafting a message.
View campaign history for insights into past strategies.

🗂 Project Structure
xeno-crm/
├── backend/ # Server-side code and API logic
│ ├── auth/ # Authentication routes and Passport.js setup
│ ├── controllers/ # Handles requests, interacts with models, sends responses
│ ├── models/ # MongoDB schemas (Mongoose)
│ ├── routes/ # API endpoints
│ ├── middleware/ # Functions before/after route handlers
│ └── server.js # Main backend entry point
├── frontend/ # Client-side React application code
│ ├── public/ # Static assets
│ ├── src/ # React application source code
│ │ ├── pages/ # Top-level page components
│ │ ├── components/ # Reusable UI components
│ │ └── App.jsx # Main React component
├── README.md # This documentation file
└── .gitignore # Untracked files

🧩 Database Schema
Xeno CRM uses MongoDB for customer, segment, and campaign data.
🔹 Customers
{
"\_id": "ObjectId", // Unique identifier
"name": "String", // Full name
"email": "String", // Email address (unique)
"totalSpend": "Number", // Total amount spent
"visits": "Number", // Number of visits
"lastActive": "Date", // Last activity timestamp
"userId": "ObjectId (ref → Google user)" // Owning Google user ID
}

🔹 Segments
{
"\_id": "ObjectId", // Unique identifier
"name": "String", // Descriptive segment name
"rules": "[{ field: String, operator: String, value: Any }]", // Array of conditions
"logic": "String (\"AND\" | \"OR\")", // Logical operator for rules
"userId": "ObjectId" // Creator's Google user ID
}

🔹 Campaigns
{
"\_id": "ObjectId", // Unique identifier
"segmentId": "ObjectId", // Targeted segment ID
"message": "String", // Campaign message content
"sentTo": "[customerId]", // Array of customer IDs who received campaign
"userId": "ObjectId", // Campaign launcher's Google user ID
"createdAt": "Date" // Launch timestamp
}

📡 API Endpoints
🔐 Auth
GET /auth/google – Google OAuth initiation
GET /auth/google/callback – OAuth redirect handler
GET /auth/logout – Logout user
GET /auth/current_user – Check logged-in user

👤 Customers
POST /api/customers – Add customer (auth required)
GET /api/customers – List customer (auth required)

🧠 Segments
POST /api/segments – Create new segment
GET /api/segments – Get all segments
POST /api/segments/preview – Get customers for rules
PUT /api/segments/:id – Update segment
DELETE /api/segments/:id – Delete segment

🚀 Campaigns
POST /api/campaigns/launch – Launch campaign
GET /api/campaigns/history – View campaign logs

🧪 Testing
Tests are not yet implemented but are crucial for reliability. Recommended tools:
Backend: Jest + Supertest
Frontend: Vitest or React Testing Library

☁️ Deployment
Part
Platform
URL
Frontend
Vercel
https://xeno-crm.vercel.app
Backend
Render
https://xeno-crm-backend.onrender.com
Database
MongoDB
MongoDB Atlas

Vercel provides seamless continuous deployment for the React frontend, while Render offers a robust environment for the Node.js backend. MongoDB Atlas handles the database, providing a managed, scalable, and secure data store.

🤝 Contributing
Fork the repo
Create a feature branch: git checkout -b feature/yourFeature
Commit your changes: git commit -m "Added your feature"
Push to the branch: git push origin feature/yourFeature
Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
Bhawna — bbhawna3016@gmail.com
GitHub: @BBISHT1998
Project: github.com/BBISHT1998/xeno-crm

🙏 Acknowledgements
Gemini API by Google
Vercel
Render
MongoDB Atlas
Passport.js
React Icons
Recharts

Created with ❤️ by BBISHT1998
