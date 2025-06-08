import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';


const Home = () => {
  return (
    <div className='flex  min-h-screen'>
        <Sidebar />
        <h1 className='font-bold text-4xl p-10 w-full'>Bem vindo ao Sistema de Gestão Escolar!</h1>
    </div>
  )
}

export default Home