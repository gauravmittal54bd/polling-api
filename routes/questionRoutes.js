const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const Option = require('../models/Option'); 


// Create a question
/**
 * @swagger
 * /questions/create:
 *   post:
 *     summary: Api to create a question
 *     description: Create a new question.
 *     tags:
 *       - Question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: "Who is your favorite actor?"
 *     responses:
 *       200:
 *         description: Question created successfully.
 *       400:
 *         description: Question already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/create', questionController.createQuestion);

// Add options to a question
/**
 * @swagger
 * /questions/{id}/options/create:
 *   post:
 *     summary: Api to add options to a question
 *     description: Add options to a specific question.
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question to which you want to add options.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: "SRK : Shah Rukh Khan"
 *     responses:
 *       200:
 *         description: Option added to the question successfully.
 *       400:
 *         description: An option with the same text already exists for this question.
 *       404:
 *         description: Question not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/:id/options/create', questionController.addOptions);

// Delete a question
/**
 * @swagger
 * /questions/{id}/delete:
 *   delete:
 *     summary: Api to delete an existing question
 *     description: Delete a specific question by ID.
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question you want to delete.
 *     responses:
 *       200:
 *         description: Question and associated options deleted successfully.
 *       404:
 *         description: Question not found.
 *       500:
 *         description: Internal server error.
 */

router.delete('/:id/delete', questionController.deleteQuestion);

// View a question and its options
/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Api to View a specific question and its options
 *     description: Get a specific resource by ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question to retrieve.
 *     responses:
 *       200:
 *         description: Resource retrieved successfully.
 *       404:
 *         description: Resource not found.
 *       500:
 *         description: Internal server error.
 */

router.get('/:id', questionController.viewQuestion);


module.exports = router;
