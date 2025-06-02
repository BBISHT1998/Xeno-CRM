const Campaign = require('../models/Campaign');
const Segment = require('../models/Segment');
const Customer = require('../models/Customer');

const launchCampaign = async (req, res) => {
  try {
    const { segmentId, message } = req.body;

    const segment = await Segment.findOne({
      _id: segmentId,
      userId: req.user._id, // ✅ check access
    });

    if (!segment) {
      return res.status(404).json({ error: 'Segment not found or not yours' });
    }

    const allCustomers = await Customer.find({ userId: req.user._id });
    const applyRules = (customer) => {
      return segment.rules.map((rule) => {
        const value =
          rule.field === 'spend' ? customer.totalSpend :
          rule.field === 'visits' ? customer.visits :
          rule.field === 'inactiveDays'
            ? (Date.now() - new Date(customer.lastActive)) / (1000 * 60 * 60 * 24)
            : null;

        switch (rule.operator) {
          case '>': return value > rule.value;
          case '<': return value < rule.value;
          case '>=': return value >= rule.value;
          case '<=': return value <= rule.value;
          case '=': return value == rule.value;
          case '!=': return value != rule.value;
          default: return false;
        }
      });
    };

    const targeted = allCustomers.filter(c => {
      const rulesResult = applyRules(c);
      return segment.logic === 'AND' ? rulesResult.every(Boolean) : rulesResult.some(Boolean);
    });

    const campaign = await Campaign.create({
      segmentId,
      message,
      userId: req.user._id, // ✅ associate campaign with user
      sentTo: targeted.map(c => c._id)
    });

    res.status(201).json({ message: 'Campaign launched', campaign });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const getCampaignHistory = async (req, res) => {
  try {
    const history = await Campaign.find({ userId: req.user._id }) // ✅ filter by user
      .populate('segmentId')
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaign history' });
  }
};

module.exports = { launchCampaign, getCampaignHistory };
