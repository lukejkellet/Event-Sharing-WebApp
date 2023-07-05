const moment = require('moment');
const database = require('./Database');

function CreateEvent(req, res) {
  const { title, category, host, date, startTime, cost } = req.body;
  const dateAdded = moment().format("YYYY/MM/DD");
  const filePath = "/assets/images/" + req.file.filename;

  // Add new event to database
  const newEvent = {
    title: title,
    category: category,
    thumbnail: filePath,
    host: host,
    date: date,
    startTime: startTime,
    cost: cost,
    dateAdded: dateAdded
  };

  database.query('INSERT INTO events SET ?', newEvent, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error creating event");
    }
    return res.status(200).send("Event created successfully");
  });
}

module.exports = CreateEvent;