import Categoria from './categoria.model.js';

export const addCategory = async (req, res) => {
    try{
        const {nombre} = req.body;
        const categoria = await Categoria.create({nombre});

        const guardarCategoria = await categoria.save();
        return res.status(200).json({
            message: "Category added successfully",
            categoria: guardarCategoria.nombre
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error adding category",
            error: err.message
        })
    }
}

export const listCategories = async (req, res) => {
    try{
        const categorias = await Categoria.find({status: true});
        return res.status(200).json({
            success: true,
            categorias,
            message: "Categories retrieved successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error retrieving categories",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try{
        const {cid} = req.params;
        const data = req.body;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(cid, {$set: data}, {new: true});

        if(!categoriaActualizada){
            return res.status(403).json({
                success: false,
                message: "Category does not exist"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            categoriaActualizada
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating category",
            error: err.message
        })
    }
}

export const removeCategory = async (req, res) => {
    try{
        const {cid} = req.params;

        /*const categoriaDefault = await Categoria.findOne({ nombre: "default" });
        if (!categoriaDefault) {
            return res.status(500).json({
                success: false,
                message: "The 'default' category does not exist"
            });
        }
        await Publicacion.updateMany(
            { categoria: caid }, 
            { categoria: categoriaDefault._id } 
        );*/

        await Categoria.findByIdAndUpdate(cid, {status: false}, {new: true});
        return res.status(200).json({
            success: true,
            message: "Category removed successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error removing category",
            error: err.message
        })
    }
}