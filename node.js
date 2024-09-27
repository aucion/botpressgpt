const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hoetu', { useNewUrlParser: true, useUnifiedTopology: true });

// Message Schema
const messageSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/send-message', async (req, res) => {
    const newMessage = new Message({ text: req.body.message });
    await newMessage.save();
    res.status(201).send();
});

app.get('/messages', async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages.map(msg => msg.text));
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
