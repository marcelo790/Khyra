import React, { useEffect, useState } from 'react'
import { TESelect } from "tw-elements-react";

export default function ComboBoxCategory({categorias,handleSubmitCategoria}) {

  const [categoria, setCategoria] = useState([]);
  let contador = 1;
  useEffect(() => {
    if(contador < 2){
      const data = categorias.map(r => ({
        text: r.name, value: r._id    
    }));
    setCategoria(prevRol => [...prevRol, ...data]);
    }
    contador++;
    
  },[]);
  return (
    <div className="flex justify-center">
      <div className="relative mb-3 w-full pt-5">
        <TESelect data={categoria} label='Seleccionar Categoria' onValueChange={handleSubmitCategoria}/>
      </div>
    </div>
  )
}
