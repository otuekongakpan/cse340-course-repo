import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';
import {authenticateUser} from '../models/users.js';
import { getAllUsers } from '../models/users.js'; 
import { getVolunteeredProjectsByUserId } from '../models/volunteers.js';   

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const userId = await createUser(name, email, passwordHash);
        res.redirect(`/login`);
    } catch (error) {
        console.error('Error processing user registration:', error);
        req.flash('error', 'There was an error processing your registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    req.flash('success', 'Logout successful!');
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const showDashboard = async (req, res) => {
    const user = req.session.user;
    const volunteeredProjects = await getVolunteeredProjectsByUserId(user.user_id);

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        volunteeredProjects
    });
};


const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role_name === role) {
            return next();
        }

        req.flash('error', 'You do not have permission to access that page.');
        res.redirect('/');
    };
};

const showUsersPage = async (req, res) => {
    const users = await getAllUsers();
    const title = 'Registered Users';

    res.render('users', { title, users });
};

const requireAdminForUsersPage = (req, res, next) => {
    if (req.session.user && req.session.user.role_name === 'admin') {
        return next();
    }

    req.flash('error', 'You do not have permission to view that page.');
    res.redirect('/dashboard');
};

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersPage, requireAdminForUsersPage };