const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');

// 👇 Register Google strategy here
require('./auth/passport');

// Routes & Controllers
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const segmentRoutes = require('./routes/segmentRoutes');
const campaignControllers = require('./controllers/campaignControllers');
const vendorRoutes = require('./routes/vendorRoute');
const authRoutes = require('./routes/authRoutes');
const ensureAuth = require('./middleware/ensureAuth');
const aiController = require('./controllers/aiController');

const app = express();
//app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Setup session & passport
app.use(session({
    secret: 'xeno-secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/campaigns/history', ensureAuth, campaignControllers.getCampaignHistory);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/segments', ensureAuth, segmentRoutes);
app.post('/api/campaigns/launch', ensureAuth, campaignControllers.launchCampaign);
app.get('/api/campaigns/history', ensureAuth, campaignControllers.getCampaignHistory);
app.use('/api/vendor', vendorRoutes);
app.post('/api/ai/rules', aiController.convertToRules);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
