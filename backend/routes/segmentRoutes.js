const express = require('express');
const router = express.Router();
const {
  createSegment,
  previewSegment,
  getSegments,
  updateSegment,
  deleteSegment
} = require('../controllers/segmentController');
const ensureAuth = require('../middleware/ensureAuth');

router.post('/', ensureAuth, createSegment);

router.post('/preview', ensureAuth, previewSegment);

router.get('/', ensureAuth, getSegments);

router.put('/:id', ensureAuth, updateSegment);

router.delete('/:id', ensureAuth, deleteSegment);

module.exports = router;
