import express from 'express';

import { showHomePage } from './controllers/index.js';import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showEditOrganizationForm, processEditOrganizationForm, processNewOrganizationForm, showNewOrganizationForm, organizationValidation } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showEditProjectForm , processEditProjectForm, showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { testErrorPage } from './controllers/errors.js';




const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/edit-projects/:id', showEditProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.get('/new-category', showNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);

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

router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-projects/:id', projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

export default router;