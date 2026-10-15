import { ButtonsAcciones } from './ButtonsAcciones';

export default function TablaSubCategorias({handleClickDesplegar, subcategorias}) { 

  let contador = 1

    return (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-sm font-light text-center">
                  <thead className="border-b font-medium text-white uppercase bg-orange-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                      <th scope="col" className="px-6 py-4">Imagen</th>
                      <th scope="col" className="px-6 py-4">Categoria</th>
                      <th scope="col" className="px-6 py-4">Objeto</th>
                      <th scope="col" className="px-6 py-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subcategorias.length ? (
                        subcategorias.map((subcategoria) => 
                            <tr className="border-b border-slate-400 font-bold transition duration-300 ease-in-out hover:bg-white dark:border-black 
                            dark:hover:bg-neutral-600" key={subcategoria._id}>
                                <td className="whitespace-nowrap px-6 py-4">{contador++}</td>
                                <td className="whitespace-nowrap px-6 py-4">{subcategoria.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{subcategoria.category}</td>
                                <td className="whitespace-nowrap px-6 py-4">{subcategoria.object}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <img src={categoria.image} alt={categoria.name} className="w-full h-28 object-contain rounded-md " />
                                </td>                                
                                <td className="whitespace-nowrap px-6 py-4">
                                <ButtonsAcciones handleClickDesplegar={handleClickDesplegar} id={categoria._id} type='Categoria' />
                                </td>
                            </tr>
                        )
                    )
                    : (
                        <tr className='text-center text-xl font-bold uppercase'>
                            <td colSpan="6" className='pt-2'>No hay lista de subcategoria</td>
                        </tr>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
}
