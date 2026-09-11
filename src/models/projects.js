import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project_id, title, project_description, project_location, project_date, projects.organization_id, organization.name as organization_name
      FROM public.projects JOIN public.organization ON projects.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects}  