
const mysql =require ("mysql2/promise");
// Crea un pool de conexiones
const pool = mysql.createPool({
      host: 'localhost',
    database:'prueba',
    user: 'user_prueba',
    password: 'password',
  });
  
  // Exporta el pool de conexiones
  module.exports = () => {
    return pool;
  };