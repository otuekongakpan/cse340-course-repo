import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project_id, title, project_description, project_location, project_date, projects.organization_id, organization.name as organization_name
      FROM public.projects JOIN public.organization ON projects.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}


const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            project_description AS description,
            project_location AS location,
            project_date AS date
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.project_date AS date,
            projects.project_location AS location
        FROM public.projects
        JOIN public.project_categories
            ON projects.project_id = project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY projects.project_date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      projects.project_id,
      projects.title,
      projects.project_description AS description,
      projects.project_date AS date,
      projects.project_location AS location,
      projects.organization_id,
      organization.name AS organization_name
    FROM public.projects
    JOIN public.organization
      ON projects.organization_id = organization.organization_id
    WHERE projects.project_date >= CURRENT_DATE
    ORDER BY projects.project_date ASC
    LIMIT $1;
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.project_description AS description,
            projects.project_date AS date,
            projects.project_location AS location,
            projects.organization_id,
            organization.name AS organization_name
        FROM public.projects
        JOIN public.organization
            ON projects.organization_id = organization.organization_id
        WHERE projects.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};


const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, project_description, project_location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, organizationId, project_description, project_location, project_date, title) => {
  const query = `
    UPDATE projects
    SET title = $1, project_description = $2, project_location = $3, project_date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [title, project_description, project_location, project_date, organizationId, projectId];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
}


export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId, createProject, updateProject };