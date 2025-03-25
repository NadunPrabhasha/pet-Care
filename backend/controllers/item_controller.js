const Item = require('../models/item_model');

// Add item to store
const addItem = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        // Check if an item with the same name already exists
        const existingItem = await Item.findOne({ name });
        if (existingItem) {
            return res.status(400).json({ message: 'Item with the same name already exists' });
        }

        const newItem = new Item({ name, description, price, image });
        await newItem.save();
        console.log('success');
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one item
const getItem = async (req, res) => {
    try {
        const itemID = req.params.id;
        const item = await Item.findById(itemID);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update item in the store
const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { name, description, price } = req.body;

        // Check if an item with the same name already exists (and it's not the current item)
        const existingItem = await Item.findOne({ name, _id: { $ne: itemId } });
        if (existingItem) {
            return res.status(400).json({ message: 'Item with the same name already exists' });
        }

        const updatedItem = await Item.findByIdAndUpdate(itemId, { name, description, price }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete item from the store
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
}; 