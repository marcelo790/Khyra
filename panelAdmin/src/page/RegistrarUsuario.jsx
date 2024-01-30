import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const RegistrarUsuario = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son requeridos',
        error: true
      })
      return 
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no son iguales',
        error: true
      })
      return 
    }

    if(password.length < 10){
      setAlerta({
        msg: 'La contraseña es muy corta, agrega minimo 10 caracteres',
        error: true
      })
      return 
    }

    setAlerta({});
    // Crear usuario en la api
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {
        nombre, email, password});
        setAlerta({
          msg: data.msg,
          error: false
        })
        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  };

  const {msg} = alerta;

  return (
    <>
    <div className="flex justify-center items-center">
        <h1 className="text-orange-600 font-black text-4xl capitalize mt-10">Registrar Usuario</h1>         
    </div> 
    {msg && <Alerta alerta = {alerta}/>} 
    <form className="bg-white shadow rounded-lg p-5 mt-5"
      onSubmit={handleSubmit}
    >
    
    <div className="my-2">
        <label 
          className="uppercase text-gray-600 block text-sm font-bold"
          htmlFor="nombre"  
        >Nombre Completo</label>
        <input
          id="nombre" 
          type="text"
          placeholder="Ingrese su nombre completo"
          className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label 
          className="uppercase text-gray-600 block text-sm font-bold"
          htmlFor="email"  
        >Correo Electrónico </label>
        <input
          id="email" 
          type="email"
          placeholder="Ingrese su correo electrónico"
          className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label 
          className="uppercase text-gray-600 block text-sm font-bold"
          htmlFor="password"  
        >Contraseña </label>
        <input
          id="password" 
          type="password"
          placeholder="Ingrese su contraseña"
          className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label 
          className="uppercase text-gray-600 block text-sm font-bold"
          htmlFor="repetir-password"  
        >Repetir Contraseña </label>
        <input
          id="repetir-password" 
          type="password"
          placeholder="Repetir tu contraseña"
          className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}
        />
      </div>
      <input 
        type="submit"
        value="Registrar Usuario"
        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl
        hover:cursor-pointer hover:bg-orange-800 transition-colors"
      />
    </form>    
    </>
  )
}

export default RegistrarUsuario
