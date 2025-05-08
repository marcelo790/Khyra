import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Menubar from './Menubar';

        

const SideBar = () => {

  const {auth} = useAuth();
  return (
    <aside className='bg-white md:w-80 lg:w-30 px-2 py-5'>
        <p className='text-sw font-bold'
        >
            Hola: {auth.name}
        </p>
        <Menubar/>
    </aside>
  )
}

export default SideBar