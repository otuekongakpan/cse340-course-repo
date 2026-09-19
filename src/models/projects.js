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

const getProjectDetails = async (project_id) => {
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

    const queryParams = [project_id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};


export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };