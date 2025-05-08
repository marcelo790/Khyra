import { useState, useEffect } from "react";
import {Link, useParams} from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const [passwordModificado, setPasswordModificado] = useState(false);
  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({})
  const params = useParams();
  const {token} = params;


  useEffect(() => {
      const comprobarToken = async () => {
        try {
          await clienteAxios.get(`/user/forget-password/${token}`);
          setTokenValido(true);
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
      }
      comprobarToken();
  }, []);

  const handleSubmit = async e =>{
    e.preventDefault();
    if(password.length < 10){
      setAlerta({
        msg: 'La contraseña debe contener minimo 10 caracteres',
        error: true
      })
      return
    }
    try {
      const url = `/usuarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password});
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      setPassword('')
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
        <h1 className="text-orange-600 font-black text-4xl capitalize mt-40">Restablecer contraseña</h1>         
    </div>
    {msg && <Alerta alerta={alerta}/>}   
    {tokenValido && (
      <form className="bg-white shadow rounded-lg p-5 mt-5"
            onSubmit={handleSubmit}
      >    
        <div className="my-2">
          <label 
            className="uppercase text-gray-600 block text-sm font-bold"
            htmlFor="password"  
          >Nueva Contraseña </label>
          <input
            id="password" 
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="w-full mt-3 p-2 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>      
        <input 
          type="submit"
          value="Guardar"
          className="bg-orange-600 w-full mb-5 mt-5 py-2 text-white text-sm uppercase font-bold rounded-xl
          hover:cursor-pointer hover:bg-orange-800 transition-colors"
        />
      </form>  
    )} 
    {passwordModificado && (
          <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm font-bold'
          to="/"
            >
          Iniciar Sesión
          </Link>
        )} 
    </>
  )
}

export default NuevoPassword
