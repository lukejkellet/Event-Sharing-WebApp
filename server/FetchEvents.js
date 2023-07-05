const database = require('./Database');

function getEvents(req, res) {
  const query = "SELECT * FROM events";
  database.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching events from database");
    }
    const events = results.map(result => ({
      title: result.title,
      category: result.category,
      thumbnail: result.thumbnail,
      host: result.host,
      date: result.date,
      startTime: result.startTime,
      cost: result.cost,
      dateAdded: result.dateAdded
    }));
    return res.status(200).json(events);
  });
}

module.exports = getEvents;
