const Customer = require('../models/Customer');
const Segment = require('../models/Segment');

const applyRules = (customers, rules, logic) => {
  return customers.filter((customer) => {
    const matches = rules.map((rule) => {
      const fieldValue =
        rule.field === 'spend' ? customer.totalSpend :
        rule.field === 'visits' ? customer.visits :
        rule.field === 'inactiveDays'
          ? (Date.now() - new Date(customer.lastActive)) / (1000 * 60 * 60 * 24)
          : null;

      switch (rule.operator) {
        case '>': return fieldValue > rule.value;
        case '<': return fieldValue < rule.value;
        case '>=': return fieldValue >= rule.value;
        case '<=': return fieldValue <= rule.value;
        case '=': return fieldValue == rule.value;
        case '!=': return fieldValue != rule.value;
        default: return false;
      }
    });

    return logic === 'AND' ? matches.every(Boolean) : matches.some(Boolean);
  });
};

const createSegment = async (req, res) => {
  try {
    const { name, rules, logic } = req.body;
    const segment = await Segment.create({
      name,
      rules,
      logic,
      userId: req.user._id, // ✅ associate segment with logged-in user
    });
    res.status(201).json({ message: 'Segment created', segment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const previewSegment = async (req, res) => {
  try {
    const { rules, logic } = req.body;
    const customers = await Customer.find({ userId: req.user._id }); // ✅ only current user's customers
    const filtered = applyRules(customers, rules, logic);
    res.status(200).json({ count: filtered.length, customers: filtered });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find({ userId: req.user._id }); // ✅ only current user's segments
    res.json(segments);
  } catch (err) {
    console.error("Error fetching segments:", err);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
};

// Update a segment
const updateSegment = async (req, res) => {
  try {
    const { id } = req.params;
    const segment = await Segment.findOneAndUpdate(
      { _id: id, userId: req.user._id },  // ✅ only allow owner to edit
      req.body,
      { new: true }
    );
    if (!segment) return res.status(404).json({ error: 'Segment not found or not yours' });
    res.json({ message: 'Segment updated', segment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a segment
const deleteSegment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Segment.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!result) return res.status(404).json({ error: 'Segment not found or not yours' });
    res.json({ message: 'Segment deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSegment,
  previewSegment,
  getSegments,
  updateSegment,
  deleteSegment
};

