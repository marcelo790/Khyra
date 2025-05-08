import logo from '../assets/logo.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }
    try {
      const {data} = await clienteAxios.post('/user/login',{
        email, password
      });
      setAlerta({})
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;
  return (
    <>
    <div className="flex justify-center items-center">
        <h1 className="text-orange-600 font-black text-4xl">Bienvenido a</h1>    
        <img className='mt-5'  src={logo}/>       
    </div>
    {msg && <Alerta alerta={alerta}/>}
    <form className="bg-white shadow rounded-lg p-5"
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
      <input 
        type="submit"
        value="Iniciar Sesión"
        className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl
        hover:cursor-pointer hover:bg-orange-800 transition-colors"
      />
    </form>
    <nav className='lg:flex lg:justify-center'>
      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm font-bold'
        to="/olvide-password"
      >
        Olvide Mi Contraseña
      </Link>
    </nav>
    </>
  )
}

export default Login