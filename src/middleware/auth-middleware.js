const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("Authentication middleware");

    const headers = req.headers.authorization;

    if (!headers) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    const token = headers.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
 ;
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

module.exports = authMiddleware;