import Category from "../models/Category.js";

const registrarCategory = async (req, res) => {
    try {
        const { name, image } = req.body;

        const nuevoCategory = new Category({ name, image });
        await nuevoCategory.save();

        res.json(nuevoCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear Category" });
    }
    
};

const listadoCategories = async(req, res) => {
    const categoryes = await Category.find();
    res.json(categoryes);
}

const listadoByCategory = async(req, res) => {
    const {id} = req.params;
    const category = await Category.findById(id);

    if(!category){
        const error = new Error("Category no encontrado")
        return res.status(404).json({msg: error.message});
    }
    res.json(category);
}


const editarCategory = async(req, res) =>{
     const { id } = req.params;

    // Buscar Category
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({ msg: "Category no encontrado" });
    }

    const { name, image} = req.body;

    // Actualizar campos si se proporcionan
    category.name = name || category.name;
    category.image = image || category.image;

    
    try {
        // Guardar y luego poblar los permisos
        await category.save();        
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la Category" });
    }
}

const eliminarCategory = async(req, res) =>{
    const {id} = req.params;
    const category = await Category.findById(id);

    if(!category){
        const error = new Error("Category no encontrado")
        return res.status(404).json({msg: error.message});
    }

    try {
        await category.deleteOne();
        res.json({msg: "Category Eliminado"});
    } catch (error) {
        console.log(error);
    }
    
}

export {
    registrarCategory,
    listadoCategories,
    editarCategory,
    eliminarCategory,
    listadoByCategory
}