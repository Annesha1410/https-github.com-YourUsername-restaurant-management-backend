const adminMiddleware = (req, res, next) => {

    console.log("Admin middleware");

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin only."
        });
    }

    next();

};

module.exports = adminMiddleware;