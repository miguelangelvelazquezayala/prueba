const getPool = require('./../database/database') ;
const prueba_model = require ('./../models/pruebaModel')

const handleError = (res, error) => {
   console.error(error);
    res.status(500).json({ status:500, message: error.message });
 };
 const pool = getPool();

const GetPruebas = async (req, res) => {   let connection;
   try{
      connection = await pool.getConnection();
      const pruebas = await prueba_model.getAll(connection);
      res.status(200).json(pruebas);
   } catch(error){
       res.status(500).json({ status:500,message:error.message})
   } finally{
      if(connection){
         connection.release();
      }
   }
 };

const GetPrueba = async (req, res) => {
   let connection;
   const { id } = req.params;
   try{
      connection = await pool.getConnection();
      const prueba = await prueba_model.getById(connection,id );
      res.status(200).json(prueba);
   } catch(error){
       res.status(500).json({ status:500,message:error.message})
   } finally{
      if(connection){
         connection.release();
      }
   }
};

const AddPrueba = async (req, res) => {
   let connection;
   try {
      const {  prueba } = req.body;
      //console.log(req.body);
      if ( prueba === undefined) {
          res.status(400).json({ status:400, message: "Bad request(Mala peticion desde el cliente por favor llene todos los campos)" });
      }
      const Prueba = {
         id:null, nombrePrueba
      };
      
      connection = await pool.getConnection();
      await connection.beginTransaction();
      const [rows, fields] = await connection.query("INSERT INTO prueba SET ?", Prueba);
      //await connection.query("INSERT INTO empresa_matriz SET ?", empresa_matriz);
      await connection.commit();
      res.status(200).json({ status:200, message: "Prueba añadida" });

   } catch (error) {
      if (connection) {
         await connection.rollback();
       }
       handleError(res, error);
   }finally {
      if (connection) {
         
        connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
};

const DeletePrueba = async (req, res) => {
   let connection;

   try {
      const { id } = req.body;
      if (id === undefined) {
          res.status(400).json({ status:400, message: "Bad request(Mala peticion desde el cliente por favor llene todos los campos)" });
      }
      
      connection = await pool.getConnection();
      await connection.beginTransaction();
      //await connection.query("DELETE FROM empresa_matriz WHERE empresa_matriz.id_empresa_matriz= ?", id_empresa_matriz);
      const [rows, fields] = await connection.query("DELETE FROM prueba WHERE prueba.id= ?", id);
      await connection.commit();
      res.status(200).json({ status:200, message: "prueba eliminada" });

   } catch (error) {
      if (connection) {
         await connection.rollback();
       }
       handleError(res, error);
   }finally {
      if (connection) {
         connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
};

const UpdatePrueba = async (req, res) => {
   let connection;

   try {
      const { id, nombre } = req.body;
      //console.log(req.body);
      if (id === undefined || nombre === undefined) {
          res.status(400).json({ status:400, message: "Bad request(Mala peticion desde el cliente por favor llene todos los campos)" });
      }
      const Prueba = {
         id, nombre
      };
      
      connection = await pool.getConnection();
      await connection.beginTransaction();
      const [rows, fields] = await connection.query("UPDATE  prueba SET  ? WHERE  prueba.id= ?", [Prueb, id]);
      //await connection.query("UPDATE  empresa_matriz SET  ? WHERE  empresa_matriz.id_empresa_matriz= ?", [empresa_matriz, id_empresa_matriz]);
      await connection.commit();
      res.status(200).json({ status:200, message: "prueba actualizado" });

   } catch (error) {
      if (connection) {
         await connection.rollback();
       }
     handleError(res, error);
   }finally {
      if (connection) {
         connection.release(); // Liberar la conexión de vuelta al pool
      }
    }
};

module.exports = {
   GetPrueba:GetPrueba,
   GetPruebas:GetPruebas,
   AddPrueba:AddPrueba,
   DeletePrueba:DeletePrueba,
   UpdatePrueba:UpdatePrueba
};