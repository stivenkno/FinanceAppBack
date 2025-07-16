import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. Token no proporcionado" });
  }

  try {
    const tokenValue = token?.split(" ")[1];
    console.log(tokenValue);
    if (!tokenValue) {
      res.status(401).json({ message: "Token inválido o mal formado." });
    }

    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET || "");
    console.log(decodedToken, "decodedToken");
    req.user = decodedToken;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. Token inválido" });
  }
};

export default authMiddleware;
