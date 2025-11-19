import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdministrador from '../hooks/useAdministradores';
import Alerta from './Alerta'


function FormularioRol() {

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [permisosDisponibles, setPermisosDisponibles] = useState([]);
    const [permisosAsignados, setPermisosAsignados] = useState([]);
    const [seleccionDisponibles, setSeleccionDisponibles] = useState([]);
    const [seleccionAsignados, setSeleccionAsignados] = useState([]);

    const [ocultarInput, setOcultarInput] = useState(false);

    let params = useParams();
    const navigate = useNavigate();
    const {mostrarAlerta, alerta, submitRol,rol,permisos, handleClickDesplegar} = useAdministrador();

    useEffect(() => {
      if (params.id && rol && rol._id && permisos.length > 0) {
        const permisoIds = rol.permission.map(p => typeof p === 'string' ? p : p._id);

        const asignados = permisos.filter(p => permisoIds.includes(p._id));
        const disponibles = permisos.filter(p => !permisoIds.includes(p._id));

        setId(rol._id);
        setName(rol.name);
        setDescription(rol.description);
        setPermisosAsignados(asignados);
        setPermisosDisponibles(disponibles);
        setOcultarInput(true);
      }
      else if (!params.id && permisos.length > 0) {
        setPermisosDisponibles(permisos);
        setPermisosAsignados([]);
        setSeleccionAsignados([]);
        setSeleccionDisponibles([]);
      }
    }, [params, permisos, rol]);

   
    const moverADerecha = () => {
    const nuevosAsignados = [
      ...permisosAsignados,
      ...permisosDisponibles.filter((p) => seleccionDisponibles.includes(p._id)),
    ];
    const nuevosDisponibles = permisosDisponibles.filter(
      (p) => !seleccionDisponibles.includes(p._id)
    );
      setPermisosAsignados(nuevosAsignados);
      setPermisosDisponibles(nuevosDisponibles);
      setSeleccionDisponibles([]);
    };

    const moverAIzquierda = () => {
      const nuevosDisponibles = [
        ...permisosDisponibles,
        ...permisosAsignados.filter((p) => seleccionAsignados.includes(p._id)),
      ];
      const nuevosAsignados = permisosAsignados.filter(
        (p) => !seleccionAsignados.includes(p._id)
      );
      setPermisosDisponibles(nuevosDisponibles);
      setPermisosAsignados(nuevosAsignados);
      setSeleccionAsignados([]);
    };
    
    const handleSubmit = async e => {
      e.preventDefault();

      if(!name || !description){
        mostrarAlerta({
          msg: 'Todos los campos son requeridos',
          error: true
        })
        return 
      }
      if(permisosAsignados.length === 0){
        mostrarAlerta({
          msg: 'Seleccionar uno o mas permisos para el rol',
          error: true
        })
        return 
      } 
      const permisosIds = permisosAsignados.map((p) => p._id);
      //console.log({id,nombre, email, password, rol})
      await submitRol({id,name, description, 'permission': permisosIds});
      limpiarInput();
        
    }

    const handledCancelar = e => {
      e.preventDefault();
      handleClickDesplegar('');
      setOcultarInput(false);
      limpiarInput();
      navigate('/admin/lista-roles')
    }

    const limpiarInput = () =>{
      setId(null)
      setName('')
      setDescription('')
      setPermisosAsignados([]);
      setPermisosDisponibles([...permisos]);
      setSeleccionAsignados([]);
      setSeleccionDisponibles([]);
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
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
            </div>     
            <div className="my-2">
               <input
                  id="description" 
                  type="text"
                  placeholder="Ingrese la descripcion"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
              />
            </div>   
            <div className="flex gap-6 justify-center items-center mb-4">
              {/* Lista de permisos disponibles */}
              <select
                multiple
                className="w-64 h-40 border rounded p-2"
                value={seleccionDisponibles}
                onChange={(e) =>
                  setSeleccionDisponibles(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
              >
                {permisosDisponibles.map((perm) => (
                  <option key={perm._id} value={perm._id}>
                    {perm.name}
                  </option>
                ))}
              </select>

              {/* Flechas */}
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={moverADerecha}
                  className='bg-orange-600 text-white px-3 py-1 text-sm uppercase font-bold rounded-md
                            hover:cursor-pointer hover:bg-orange-800 transition-colors'
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={moverAIzquierda}
                  className='bg-orange-600 text-white px-3 py-1 text-sm uppercase font-bold rounded-md
                                hover:cursor-pointer hover:bg-orange-800 transition-colors'
                >
                  &lt;
                </button>
              </div>

              {/* Lista de permisos asignados */}
              <select
                multiple
                className="w-64 h-40 border rounded p-2"
                value={seleccionAsignados}
                onChange={(e) =>
                  setSeleccionAsignados(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
              >
                {permisosAsignados.map((perm) => (
                  <option key={perm._id} value={perm._id}>
                    {perm.name}
                  </option>
                ))}
              </select>
            </div>
     
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

export default FormularioRol
