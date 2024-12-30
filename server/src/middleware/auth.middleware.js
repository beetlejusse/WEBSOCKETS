export const protectedRouteMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized Access - No Token Provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message: "Unauthorized Access - Invalid Token"});

        const user = await User.findbyId(decoded.userId).select("-password");

        if(!user) return res.status(404).json({message: "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route middleware: ", error);
        res.status(500).json({message: "Internal Server Error(at protectedRouteMiddleware)"});
    }
}