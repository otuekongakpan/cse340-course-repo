import db from './db.js';

const getAllCategories = async () => {
    const query = 'SELECT * FROM categories ORDER BY name;';
    const result = await db.query(query);
    
    return result.rows; 
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT categories.category_id, categories.name
        FROM categories
        JOIN project_categories
            ON categories.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.name;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId };



