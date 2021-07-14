const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey =
  'BFPC-ONgq2f3tlt2RowSXfkD5nOjQvnlWGVnxDDPFOKqF0eIArt_1nO8pC5FFRKpeavQ0zPEKIOwi92uS2b6B_I';
const privateVapidKey = '951NeMNX4wOKmXuSOz-tZFt_IA29e_r7_MFMpF06NYQ';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push notifications - Test' });

  // Pass object into sendNotification
  webPush.sendNotification(subscription, payload).catch((err) => console.error(err));
});

const port = 1234;

app.listen(port, () => console.log(`Server started on port ${port}`));
