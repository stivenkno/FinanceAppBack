import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/config.js";
import "dotenv/config";

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, hashPassword]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario", error });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `
      SELECT * FROM users WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export { Login, Register };
