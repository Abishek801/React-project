const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json'); // Path to your data file
const middlewares = jsonServer.defaults();

// Use default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Middleware to handle POST requests
server.use(jsonServer.bodyParser);

// Create a POST route to save applications
server.post('/applications', (req, res) => {
  const application = req.body;

  // Validate the application data if needed
  if (!application.name || !application.age || !application.bloodGroup) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Save the application to data.json
  router.db.get('applications').push(application).write();

  // Respond with the created application
  res.status(201).json(application);
});

// Use the router
server.use(router);

// Start the server
const PORT = 3001; // Choose your port
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
