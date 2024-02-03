import React from 'react'
import { Link } from 'react-router-dom';

function Menubar() {
  return (
    <>
        <aside id="default-sidebar" className=" top-0 left-0  w-full h-screen h-80 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full py-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    <Link to="lista-usuarios" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1c0-.6.4-1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Usuarios</span>
                    </Link>
                </li>
                <li>
                    <Link to="/olvide-password" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.4l1.4.7a7.7 7.7 0 0 0 .7.3 21 21 0 0 0 16.4-.3l1.5-.7V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.4 7.9.6-.3V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.4l.6.3a10 10 0 0 0 .7.3 23 23 0 0 0 18-.3h.1L21 13l.4.9ZM12 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Categorias</span>
                    </Link>
                </li>
                <li>
                    <Link to="/olvide-password" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.4 9.6a1 1 0 0 0-1.8 0l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .9-1.4l-2-4a1 1 0 0 0-1.7-.2l-.5.7-1.3-2.5ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Objetos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/olvide-password" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Historiales</span>
                    </Link>
                </li>
                <li>
                    <Link to="/olvide-password" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5c.6 0 1 .4 1 1v6a1 1 0 1 1-2 0v-6c0-.6.4-1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Reportes Graficos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/olvide-password" className="flex items-center p-2 text-black rounded-lg dark:text-black hover:bg-orange-600  dark:hover:bg-white group">
                        <svg className="w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h1.4a2.6 2.6 0 0 0 2.6-2.6v-1.8a2.6 2.6 0 0 0-2.6-2.6H11Zm1 5v-3h.4a.6.6 0 0 1 .6.6v1.8a.6.6 0 0 1-.6.6H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd"/>
                        </svg>
                        <span className="ms-3 group-hover:text-white dark:hover:bg-white group">Reportes PDF</span>
                    </Link>
                </li>
            </ul>
        </div>
        </aside>
    </>
  )
}

export default Menubar
