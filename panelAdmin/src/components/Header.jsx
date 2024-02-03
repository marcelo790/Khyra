import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import Reloj from './Reloj.jsx';

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-orange-600 font-black text-center'>
                Khyra
            </h2>
            <input
                type='search'
                placeholder='Buscador'
                className='rounded-lg lg:w-96 block p-2 border'
            />
            <div className='flex items-center gap-4'>
                <Reloj/>
                <button
                className='text-white text-sm bg-orange-600 p-3 rounded-md uppercase font-bold'
                type='button'>
                    Cerrar Sesion
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header