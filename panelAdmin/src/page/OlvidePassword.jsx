import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      });
      return
    }
    try {
      const {data} = await clienteAxios.post(`/user/forget-password`, {
        email});
        setAlerta({
          msg: data.msg,
          error: false
        })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  return (
    <>    
    <div className="flex justify-center items-center">
        <h1 className="text-orange-600 font-black text-4xl capitalize mt-40">Recupera tu acceso</h1>         
    </div>
    {msg && <Alerta alerta={alerta}/>}
    <form className="bg-white shadow rounded-lg p-5 mt-5"
          onSubmit={handleSubmit}
    >    
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
      <input 
        type="submit"
        value="Enviar Instrucciones"
        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl
        hover:cursor-pointer hover:bg-orange-800 transition-colors"
      />
    </form>  
    <nav className='lg:flex lg:justify-center'>
      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm font-bold'
        to="/"
      >
        Iniciar Sesión
      </Link>
    </nav>  
    </>
  )
}

export default OlvidePassword