export const auth = async (req, res, next) => {
    // console.log("HOLA MID:", req)
    // console.log("2 HOLA MID:", req.session.passport?.user)
    try {
        if (req.session.passport?.user) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const isLogged = async (req, res, next) => {
    try {
        if (req.session.passport?.user) {
            res.redirect('/profile');
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}