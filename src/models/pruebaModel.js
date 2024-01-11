const getById = async (connection, id) =>{
    try{
    const [prueba,_] = await connection.execute("SELECT * FROM prueba WHERE id = ?",[id]);
    if(prueba[0]==='undefined'){
        return [];
    }
    return prueba[0];
    } catch(error){
        return ({ message: error.message });
    }
}

const getAll = async (connection) =>{
    try{
    const [pruebas,_] = await connection.execute("SELECT * FROM prueba");
    return pruebas;
    } catch(error){
        return ({ message: error.message });
    }
}
module.exports = {
    getById,getAll
}
