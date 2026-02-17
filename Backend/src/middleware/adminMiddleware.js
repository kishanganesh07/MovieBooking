export const adminOnly = (req, res, next) => {
  console.log("Admin check user:", req.user);
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
