import { useEffect, useRef } from "react";

export default function Reloj() {
  const h1 = useRef();
  let date = new Date();
  let options = {year: 'numeric', month: 'long', day: 'numeric' };
  const fecha = date.toLocaleDateString('es-ES', options)
  //const dateFormat = [date.getDate()+'/' + date.getMonth()+1 + '/'+ date.getFullYear() +' ']
  const ti = () => {
    const fechahora = new Date();
    const hora = fechahora.getHours();
    const minuto = fechahora.getMinutes();
    const segundo = fechahora.getSeconds();
    const tipo = (hora >= 12) ? 'pm' : 'am';
    return `${hora}:${minuto}:${segundo} ${tipo}`;
  };
  useEffect(() => {
    const cl = setInterval(() => {
      h1.current.innerHTML = `${ti()}`;
    }, 1000);
    return () => clearInterval(cl);
  }, []);
  return (
    <div className="text-black font-bold text-sm text-center">
        <p>{fecha}</p>
      <p ref={h1}>{ti()}</p>
    </div>
  );
}