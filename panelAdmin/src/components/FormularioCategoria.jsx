import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdministrador from '../hooks/useAdministradores';
import Alerta from './Alerta'


function FormularioCategoria() {

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [ocultarInput, setOcultarInput] = useState(false);

    let params = useParams();
    const navigate = useNavigate();
    const {mostrarAlerta, alerta, submitCategoria,categoria,handleClickDesplegar} = useAdministrador();

    useEffect(() => {
      if (params.id && categoria && categoria._id === params.id) {
        setId(categoria._id);
        setName(categoria.name || '');
        setImagePreview(categoria.image || '');
        setOcultarInput(true);
      }
    }, [params, categoria]);

   const handleImageChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview('');
      }
    };
    
    const handleSubmit = async e => {
      e.preventDefault();
      if (!name || (!imageFile && !imagePreview)) {
            mostrarAlerta({
              msg: 'Todos los campos son requeridos',
              error: true
            });
            return;
    }
      await submitCategoria({id,name, 'image':imageFile});
      limpiarInput();
        
    }

    const handledCancelar = e => {
      e.preventDefault();
      handleClickDesplegar('');
      setOcultarInput(false);
      limpiarInput();
      navigate('/admin/lista-categorias')
    }

    const limpiarInput = () =>{
      setId(null)
      setName('')      
      setImageFile(null);
      setImagePreview('');
    }

    const {msg} = alerta;

  return (
    <form className='bg-white py-5 px-5 md:w-1/2 rounded-lg'
          onSubmit={handleSubmit}>
          {msg && <Alerta alerta = {alerta}/>} 
        <div>           
            <div className="my-2">
               <input
                  id="name" 
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={name || ''}
                  onChange={e => setName(e.target.value)}
              />
            </div>     
            <div className="my-2">
               <input
                  id="image" 
                   type="file"
                  accept="image/*"
                  placeholder="Ingrese la imagen"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  onChange={handleImageChange}
              />
            </div>  
            {imagePreview && (
                <div className="my-2">
                  <img src={imagePreview} alt="Vista previa" className="w-full h-48 object-contain rounded-md border" />
                </div>
              )}     
            <div className='flex justify-center'>
            <input
              type='submit'
              value={ocultarInput ? "Actualizar" : "Registrar"}
              className='bg-orange-600 w-full mr-3 mb-2 mt-2 py-2 text-white text-sm uppercase font-bold rounded-md
              hover:cursor-pointer hover:bg-orange-800 transition-colors'
            />
            <input
              type='button'
              value="Cancelar"
              className='bg-red-600 w-full ml-3 mb-2 mt-2 py-2 text-white text-sm uppercase font-bold rounded-md
              hover:cursor-pointer hover:bg-red-800 transition-colors'
              onClick={handledCancelar}
            />
            </div>
        </div>
    </form>
  )
}

export default FormularioCategoria
