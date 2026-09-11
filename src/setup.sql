-- ORGANIZATION TABLE

CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150),
	description TEXT NOT NULL,
	contact_email VARCHAR(255),
	logo_filename VARCHAR NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.','info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

-- PROJECT TABLE
CREATE TABLE projects (
	project_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	project_description TEXT NOT NULL,
	project_location VARCHAR(255) NOT NULL,
	project_date DATE NOT NULL,
	organization_id INT REFERENCES organization(organization_id)
);

INSERT INTO projects (title, project_description, project_location, project_date, organization_id) VALUES
('Community Center Expansion', 'Adding a new wing to host youth after-school programs and digital literacy labs.', 'Downtown Community Hub', '2026-04-15', 1),
('Affordable Housing Initiative', 'Constructing five eco-friendly modular homes for low-income families.', 'Westside District', '2026-06-01', 1),
('Public Library Renovation', 'Upgrading HVAC systems, roofing, and interior seating areas for better accessibility.', 'Central Municipal Library', '2026-07-20', 1),
('Urban Park Playground Build', 'Installing modern, inclusive playground equipment and rubber safety surfacing.', 'Oakridge Neighborhood Park', '2026-08-10', 1),
('Shelter Kitchen Remodel', 'Overhauling the commercial kitchen equipment and flooring to safely serve more meals.', 'Hope Haven Shelter', '2026-09-05', 1);

-- Insert 5 projects for GreenHarvest Growers (organization_id = 2)
INSERT INTO projects (title, project_description, project_location, project_date, organization_id) VALUES
('Urban Rooftop Greenhouse', 'Setting up a hydroponic greenhouse on top of the downtown commercial complex.', 'Metro Center Rooftop', '2026-04-10', 2),
('Community Orchard Planting', 'Planting 50 heritage apple, pear, and plum trees for public harvesting.', 'Eastside Greenbelt', '2026-05-02', 2),
('Soil Health Workshop Series', 'Hosting educational seminars and soil testing labs for local micro-farmers.', 'Agricultural Extension Office', '2026-06-15', 2),
('School Garden Expansion', 'Building raised garden beds and drip irrigation systems for middle school botany classes.', 'Lincoln Middle School', '2026-07-08', 2),
('Farmers Market Infrastructure', 'Providing weather-resistant vendor stalls and cold storage lockers for seasonal produce.', 'South Square Plaza', '2026-08-22', 2);

-- Insert 5 projects for UnityServe Volunteers (organization_id = 3)
INSERT INTO projects (title, project_description, project_location, project_date, organization_id) VALUES
('Annual River Cleanup', 'Mobilizing 200 volunteers to remove plastic waste and debris from the riverbanks.', 'Pine River Shoreline', '2026-04-22', 3),
('Senior Tech Literacy Drive', 'One-on-one coaching sessions to help elderly residents navigate smartphones and tablets.', 'Golden Age Senior Center', '2026-05-18', 3),
('Winter Coat & Blanket Drive', 'Collecting, sorting, and distributing winter essentials ahead of the cold season.', 'Community Fellowship Hall', '2026-10-12', 3),
('Food Bank Logistics Support', 'Sorting bulk donations, packing emergency boxes, and managing inventory dispatch.', 'Regional Food Bank Warehouse', '2026-06-11', 3),
('Neighborhood Tree Planting', 'Planting shade trees along major pedestrian corridors to combat urban heat islands.', 'North District Avenues', '2026-09-14', 3);

SELECT * FROM projects;

--CATEGORIES TABLE

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE project_categories (
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);


INSERT INTO categories (name) VALUES
('Community Development'),
('Environment & Sustainability'),
('Education & Outreach');


-- BrightFuture Builders Projects (IDs 1-5)
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1), (1, 3), -- Community Center Expansion
(2, 1),         -- Affordable Housing Initiative
(3, 1), (3, 3), -- Public Library Renovation
(4, 1),         -- Urban Park Playground Build
(5, 1);         -- Shelter Kitchen Remodel

-- GreenHarvest Growers Projects (IDs 6-10)
INSERT INTO project_categories (project_id, category_id) VALUES
(6, 2),         -- Urban Rooftop Greenhouse
(7, 2),         -- Community Orchard Planting
(8, 2), (8, 3), -- Soil Health Workshop Series
(9, 2), (9, 3), -- School Garden Expansion
(10, 1);        -- Farmers Market Infrastructure

-- UnityServe Volunteers Projects (IDs 11-15)
INSERT INTO project_categories (project_id, category_id) VALUES
(11, 2),        -- Annual River Cleanup
(12, 3),        -- Senior Tech Literacy Drive
(13, 1),        -- Winter Coat & Blanket Drive
(14, 1),        -- Food Bank Logistics Support
(15, 2);        -- Neighborhood Tree Planting

SELECT * FROM categories;
SELECT * FROM project_categories;


