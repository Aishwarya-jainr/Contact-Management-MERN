const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Validation middleware
const validateContact = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Please enter a valid 10-digit phone number'),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters')
];

// POST /api/contacts - Create a new contact
router.post('/', validateContact, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }

        const { name, email, phone, message } = req.body;

        // Create new contact
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact saved successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save contact',
            error: error.message
        });
    }
});

// GET /api/contacts - Get all contacts
router.get('/', async (req, res) => {
    try {
        const { sort = '-createdAt' } = req.query;

        const contacts = await Contact.find()
            .sort(sort)
            .select('-__v');

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
});

// DELETE /api/contacts/:id - Delete a contact (bonus feature)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact',
            error: error.message
        });
    }
});

module.exports = router;
