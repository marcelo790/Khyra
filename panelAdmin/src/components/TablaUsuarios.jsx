import { ButtonsUsuarios } from './ButtonsUsuarios';

export default function TablaUsuarios({handleClickDesplegar, usuarios}) { 

    let contador = 1;

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
                      <th scope="col" className="px-6 py-4">Correo</th>
                      <th scope="col" className="px-6 py-4">Estado</th>                      
                      <th scope="col" className="px-6 py-4">Rol</th>
                      <th scope="col" className="px-6 py-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.length ? (
                        usuarios.map((user) => 
                            <tr className="border-b border-slate-400 font-bold transition duration-300 ease-in-out hover:bg-white dark:border-black 
                            dark:hover:bg-neutral-600" key={user._id}>
                                <td className="whitespace-nowrap px-6 py-4">{contador++}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.state}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.rol.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                <ButtonsUsuarios handleClickDesplegar={handleClickDesplegar} id={user._id} />
                                </td>
                            </tr>
                        )
                    )
                    : (
                        <tr className='text-center text-xl font-bold uppercase'>
                            <td colSpan="6" className='pt-2'>No hay lista de usuarios</td>
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
