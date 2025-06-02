
# 🚀 Xeno CRM — AI-Powered Customer Relationship Manager

A full-stack CRM platform that empowers marketing teams to manage customers, build AI-driven segments, launch campaigns, and track performance — built with the MERN stack, Google OAuth, and Gemini AI.




## 📌 Table of Contents

### About the project 
Xeno CRM is a lightweight, multi-user CRM for marketing teams, enabling efficient customer base management, AI-driven behavioral segmentation, targeted campaign launches, and outcome tracking. It helps businesses understand customers and drive effective engagement.
### 🏗 Built With
  🔹 Frontend
• React — Component-based UI library
• Vite — Fast bundler and dev server
• Tailwind CSS — Utility-first CSS
• React Router — SPA routing
• Axios — HTTP client
• Recharts — Charting for dashboard analytics

 🔹 Backend
• Node.js — JavaScript runtime
• Express.js — Web framework
• MongoDB Atlas — NoSQL cloud database
• Mongoose — MongoDB object modeling
• Passport.js (Google OAuth2) — Authentication middleware

 🔹 AI & Deployment
• Gemini API (Google AI) — AI-powered segmentation
• Render — Backend deployment
• Vercel — Frontend deployment
### ✨ Features

🔐 Google Login (Session Support):
Secure authentication using Google accounts, with persistent login via session-based management.

👤 Multi-user Customer Management:
Supports multiple marketing team members managing distinct customer sets while maintaining data isolation.

🧠 AI Segment Builder (Gemini API):
Utilizes Google’s Gemini AI to convert descriptive prompts into intelligent customer segments automatically.

📬 Smart Segment Campaign Launch:
Enables launching targeted campaigns to customers in either AI-generated or manually created segments.

📊 Campaign History:
Maintains a comprehensive log of all previously launched campaigns for performance review and strategy refinement.

📈 Analytics Dashboard:
Visualizes CRM data and campaign performance through interactive charts powered by Recharts.

📁 Segment Management (Edit/Delete):
A dedicated interface to view, update, or delete existing segments for streamlined management.

👥 Customer Explorer & Manual Entry:
Allows exploration of customer data and manual addition of new customer records through a responsive UI.

🌐 Responsive, Production-Ready UI:
Built with Tailwind CSS to ensure seamless user experience across desktop and mobile devices.
## 🚀 Getting Started
### ✅ Prerequisites

Ensure you have the following tools and accounts installed and set up:

🔹Node.js v18+: JavaScript runtime for both frontend and backend.

🔹npm: Node Package Manager to handle dependencies.

🔹Git: Version control system for cloning and managing the repository.

🔹MongoDB Atlas Account: For hosting your NoSQL cloud database.

🔹Google Cloud Console Project: To generate GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET for OAuth2   authentication.

### 📦 Clone the Repository

```bash
git clone https://github.com/your-username/xeno-crm.git
cd xeno-crm
```

### 🛠️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

---

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`
## 🚘 Usage

To use **Xeno CRM**:

1. **Login** with your Google account.
2. **View** the Dashboard and Customer Explorer for insights and customer record management.
3. **Create Segments** using AI text prompts (e.g., "customers who spent over $100 in the last month").
4. **Preview Customers** in new segments to ensure accuracy, then save.
5. **Launch Campaigns** to selected segments with a crafted message.
6. **View Campaign History** to analyze previous marketing strategies.
## 🗂️ Project Structure

```
xeno-crm/                          # Root directory
├── backend/                       # Server-side code and API logic
│   ├── auth/                      # Authentication routes and Passport.js setup
│   ├── controllers/               # Handles requests, interacts with models, sends responses
│   ├── models/                    # MongoDB schemas (Mongoose)
│   ├── routes/                    # API endpoints
│   ├── middleware/                # Functions before/after route handlers
│   └── server.js                  # Main backend entry point
├── frontend/                      # Client-side React application code
│   ├── public/                    # Static assets
│   └── src/                       # React application source code
│       ├── pages/                 # Top-level page components
│       ├── components/            # Reusable UI components
│       └── App.jsx                # Main React component
├── README.md                      # This documentation file
└── .gitignore                     # Untracked files
```
## 🧩 Database Schema

### 🔹 Customers

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "totalSpend": "Number",
  "visits": "Number",
  "lastActive": "Date",
  "userId": "ObjectId"
}
```

### 🔹 Segments

```json
{
  "_id": "ObjectId",
  "name": "String",
  "rules": [{ "field": String, "operator": String, "value": Any }],
  "logic": "AND" | "OR",
  "userId": "ObjectId"
}
```

### 🔹 Campaigns

```json
{
  "_id": "ObjectId",
  "segmentId": "ObjectId",
  "message": "String",
  "sentTo": ["customerId"],
  "userId": "ObjectId",
  "createdAt": "Date"
}
```
## 🧭 Architecture Flow

```
[Google Login]
        ↓
[Create Customers / Orders]
        ↓
[Define Segment Rules via UI or AI]
        ↓
[Preview Customers in Segment]
        ↓
[Launch Campaign to Segment]
        ↓
[Message Sent via Dummy Vendor]
        ↓
[Vendor hits /delivery-receipt]
        ↓
[Update Communication Log & Analytics]
```
## 🧪 Testing

Tests are not yet implemented but are crucial for reliability. Recommended tools:

- **Backend**: Jest + Supertest
- **Frontend**: Vitest or React Testing Library
## ☁️ Deployment

| Part     | Platform | URL                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------ |
| Frontend | Vercel   | https://xeno-crm-bbishts-projects.vercel.app/app                                                     |
| Backend  | Render   | https://xeno-crm-backend.onrender.com                                          |
| Database | MongoDB  | MongoDB Atlas                                                                   |

> Vercel provides seamless deployment for React frontend. Render hosts the Node.js backend. MongoDB Atlas ensures secure and scalable data handling.
## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/yourFeature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Added your feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/yourFeature
   ```
5. Open a Pull Request
## 📌 Known Limitations & Assumptions

- No actual messaging service is integrated (e.g., Twilio or SMTP); delivery is simulated.
- AI segment builder relies on Gemini API prompt interpretation, which may vary.
- No role-based access control (RBAC); all authenticated users have the same privileges.
- Tests are not yet implemented for backend or frontend.
- User and customer data separation assumes unique Google accounts.
## 📄 License

Distributed under the **MIT License**. See the `LICENSE` file for more information.
## 📬 Contact

**Bhawna** — [bbhawna3016@gmail.com](mailto:bbhawna3016@gmail.com)  
GitHub: [@BBISHT1998](https://github.com/BBISHT1998)  
Project: [github.com/BBISHT1998/xeno-crm](https://github.com/BBISHT1998/xeno-crm)
## 🙏 Acknowledgements

- Gemini API by Google  
- Vercel  
- Render  
- MongoDB Atlas  
- Passport.js  
- React Icons  
- Recharts

🛠️ Created with ❤️ by **BBISHT1998**

🎉 Thank you for reviewing this project!