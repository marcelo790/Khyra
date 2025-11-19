import Subcategory from "../models/Subcategory.js";

const registrarSubcategory = async (req, res) => {
    try {
        const { name, image, category, object } = req.body;

        const nuevoSubcategory = new Subcategory({ name, image, category, object });
        await nuevoSubcategory.save();

        res.json(nuevoSubcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear Category" });
    }
    
};

const listadoSubcategories = async(req, res) => {
    const subcategoryes = await Subcategory.find();
    res.json(subcategoryes);
}

const listadoBySubcategory = async(req, res) => {
    const {id} = req.params;
    const subcategory = await Subcategory.findById(id).populate('category').populate('object');

    if(!subcategory){
        const error = new Error("SubCategory no encontrado")
        return res.status(404).json({msg: error.message});
    }
    res.json(subcategory);
}


const editarSubcategory = async(req, res) =>{
     const { id } = req.params;

    // Buscar Category
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
        return res.status(404).json({ msg: "Category no encontrado" });
    }

    const { name, image, category, object} = req.body;

    // Actualizar campos si se proporcionan
    subcategory.name = name || subcategory.name;
    subcategory.image = image || subcategory.image;
    subcategory.category = category || subcategory.category;
    subcategory.object = object || subcategory.object;

    
    try {
        // Guardar y luego poblar los permisos
        await subcategory.save();        
        res.json(subcategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la Subcategory" });
    }
}

const eliminarSubcategory = async(req, res) =>{
    const {id} = req.params;
    const subcategory = await Subcategory.findById(id);

    if(!subcategory){
        const error = new Error("Subcategory no encontrado")
        return res.status(404).json({msg: error.message});
    }

    try {
        await subcategory.deleteOne();
        res.json({msg: "Subcategory Eliminado"});
    } catch (error) {
        console.log(error);
    }
    
}

export {
    registrarSubcategory,
    listadoBySubcategory,
    editarSubcategory,
    eliminarSubcategory,
    listadoSubcategories
}