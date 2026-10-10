import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result;
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result;
};

const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

const getVolunteeredProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            projects.project_id,
            projects.title,
            projects.project_date AS date,
            projects.project_location AS location
        FROM project_volunteers
        JOIN projects
            ON project_volunteers.project_id = projects.project_id
        WHERE project_volunteers.user_id = $1
        ORDER BY projects.project_date;
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { addVolunteer, removeVolunteer, isUserVolunteering, getVolunteeredProjectsByUserId };