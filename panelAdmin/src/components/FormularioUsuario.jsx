import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdministrador from '../hooks/useAdministradores';
import ComboBoxRol from './ComboBoxRol';
import Alerta from './Alerta'


function FormularioUsuario() {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [rol, setRol] = useState('');

    const [ocultarInput, setOcultarInput] = useState(false);

    let params = useParams();
    const navigate = useNavigate();
    const {mostrarAlerta, alerta, submitUsuario,roles, usuario,handleClickDesplegar} = useAdministrador();

    useEffect( () => {
      if(params.id){
        setId(usuario._id)
        setNombre(usuario.nombre)
        setEmail(usuario.email)
        setOcultarInput(true);
      }
    }, [params])

    const handleSubmitRol = (e) =>{
      setRol(e.value)
    }

    const handleSubmit = async e => {
      e.preventDefault();

      if([nombre,email,password,repetirPassword].includes('') && id == null){
        mostrarAlerta({
          msg: 'Todos los campos son requeridos',
          error: true
        })
        return 
      }
      if([rol].includes('')){
        mostrarAlerta({
          msg: 'Seleccionar un rol para el usuario',
          error: true
        })
        return 
      }
      if(password !== repetirPassword && id == null){
        mostrarAlerta({
          msg: 'Las contraseñas no son iguales',
          error: true
        })
        return 
      }

      if(password.length < 10 && id == null){
        mostrarAlerta({
          msg: 'La contraseña es muy corta, agrega minimo 10 caracteres',
          error: true
        })
        return 
      }
      //console.log({id,nombre, email, password, rol})
      await submitUsuario({id,nombre, email, password, rol});
      limpiarInput();
        
    }

    const handledCancelar = e => {
      e.preventDefault();
      handleClickDesplegar('');
      setOcultarInput(false);
      limpiarInput();
      navigate('/admin/lista-usuarios')
    }

    const limpiarInput = () =>{
      setId(null)
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    }

    const {msg} = alerta;

  return (
    <form className='bg-white py-5 px-5 md:w-1/2 rounded-lg'
          onSubmit={handleSubmit}>
          {msg && <Alerta alerta = {alerta}/>} 
        <div>           
            <div className="my-2">
               <input
                  id="nombre" 
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className="my-2">
              <input
                  id="email" 
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2">
              <input
                  id="password" 
                  type={ocultarInput ? "hidden" :"password"}
                  placeholder="Ingrese su contraseña"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-2">
              <input
                  id="repetir-password" 
                  type={ocultarInput ? "hidden" :"password"}
                  placeholder="Repetir su contraseña"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
            <div className="my-2">
              <ComboBoxRol roles={roles} handleSubmitRol={handleSubmitRol}/>
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

export default FormularioUsuario
