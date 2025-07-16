export const query = `
   -- Tabla: users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    fecha DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR(255) CHECK (type IN ('Ingreso', 'Gasto')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS Goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    goal_name VARCHAR(255) NOT NULL,
    goal_amount INTEGER NOT NULL,
    goal_aporte INTEGER NOT NULL,
    fecha_limite DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`;
