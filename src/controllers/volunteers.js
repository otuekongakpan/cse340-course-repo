import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const processAddVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You have signed up to volunteer for this project!');
    res.redirect(`/projects/${projectId}`);
};

const processRemoveVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await removeVolunteer(userId, projectId);

    req.flash('success', 'You have been removed as a volunteer.');

    const redirectTo = req.body.redirectTo === 'dashboard' ? '/dashboard' : `/projects/${projectId}`;
    res.redirect(redirectTo);
};

export { processAddVolunteer, processRemoveVolunteer };