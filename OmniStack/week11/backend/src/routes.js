const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfleController');

const routes = express.Router();

// Sessions
routes.post('/sessions', SessionController.create );

// ONGs
routes.post('/ongs', OngController.create );
routes.get('/ongs', OngController.index );

// Profile
routes.get('/profile', ProfileController.index );

// Incidents
routes.post('/incidents', IncidentController.create );
routes.get('/incidents', IncidentController.index );
routes.delete('/incidents/:id', IncidentController.delete );

module.exports = routes;
