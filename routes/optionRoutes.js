const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const Option = require('../models/Option'); 

// Add a vote to an option
/**
 * @swagger
 * /options/{id}/add_vote:
 *   post:
 *     summary: Api to add a vote to an option
 *     description: Add a vote to a specific option.
 *     tags:
 *       - Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the option to add a vote to.
 *     responses:
 *       200:
 *         description: Vote added to the option successfully.
 *       404:
 *         description: Option not found.
 *       500:
 *         description: Internal server error.
 */

router.post('/:id/add_vote', optionController.addVote);

// Delete an option
/**
 * @swagger
 * /options/{id}/delete:
 *   delete:
 *     summary: Api to delete an option
 *     description: Delete a specific option by ID.
 *     tags:
 *       - Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the option you want to delete.
 *     responses:
 *       200:
 *         description: Option deleted successfully.
 *       404:
 *         description: Option not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id/delete', optionController.deleteOption);

module.exports = router;
