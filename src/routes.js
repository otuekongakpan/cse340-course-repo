import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showEditOrganizationForm, processEditOrganizationForm, processNewOrganizationForm, showNewOrganizationForm, organizationValidation } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showEditProjectForm , processEditProjectForm, showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';




const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/edit-projects/:id', showEditProjectForm);


// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for project details page
router.get('/projects/:id', showProjectDetailsPage);

//Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);


// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm, organizationValidation);

router.post('/edit-organization/:id', processEditOrganizationForm, organizationValidation);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm, projectValidation);

router.post('/edit-projects/:id', processEditProjectForm, projectValidation);

export default router;