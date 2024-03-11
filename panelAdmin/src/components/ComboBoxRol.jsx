import React, { useEffect, useState } from 'react'
import { TESelect } from "tw-elements-react";

export default function ComboBoxRol({roles,handleSubmitRol}) {

  const [rol, setRol] = useState([]);
  let contador = 1;
  useEffect(() => {
    if(contador < 2){
      const data = roles.map(r => ({
        text: r.nombre, value: r._id    
    }));
    setRol(prevRol => [...prevRol, ...data]);
    }
    contador++;
    
  },[]);
  return (
    <div className="flex justify-center">
      <div className="relative mb-3 w-full pt-5">
        <TESelect data={rol} label='Seleccionar Rol' onValueChange={handleSubmitRol}/>
      </div>
    </div>
  )
}
