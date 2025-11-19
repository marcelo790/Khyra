import { ButtonsAcciones } from './ButtonsAcciones';

export default function TablaRoles({handleClickDesplegar, roles}) { 

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
                      <th scope="col" className="px-6 py-4">Rol</th>
                      <th scope="col" className="px-6 py-4">Descripcion</th>
                      <th scope="col" className="px-6 py-4">Permisos</th>
                      <th scope="col" className="px-6 py-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.length ? (
                        roles.map((rol) => 
                            <tr className="border-b border-slate-400 font-bold transition duration-300 ease-in-out hover:bg-white dark:border-black 
                            dark:hover:bg-neutral-600" key={rol._id}>
                                <td className="whitespace-nowrap px-6 py-4">{contador++}</td>
                                <td className="whitespace-nowrap px-6 py-4">{rol.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{rol.description}</td>
                                <td className="whitespace-nowrap px-6 py-4">  
                                  {Array.isArray(rol.permission) && rol.permission.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm">
                                      {rol.permission.map((permiso, index) => (
                                        <li key={index}>{permiso?.name || "Sin nombre"} </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span>No tiene permisos</span>
                                  )}                              
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                <ButtonsAcciones handleClickDesplegar={handleClickDesplegar} id={rol._id} type='Rol' />
                                </td>
                            </tr>
                        )
                    )
                    : (
                        <tr className='text-center text-xl font-bold uppercase'>
                            <td colSpan="6" className='pt-2'>No hay lista de roles</td>
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
