import { useNavigate } from 'react-router-dom'
import { MainButton } from '../MainButton'
import logo from '../../images/appointmed_logo.png'

export function Header () {
  const navigate = useNavigate()

  return (
    <header className="flex justify-between items-center w-full max-w-[1200px] h-[80px] bg-slate-100 border-b border-slate-200 rounded-md px-8 mx-auto">
      <div onClick={() => navigate('/dashboard')}>
        <img 
          src={logo} 
          alt="Appointmed" 
          className='h-[50px] cursor-pointer'
        />
      </div>

    <div className='flex gap-4'>
      <MainButton text='Cambiar de Cuenta' className='h-[35px] text-[16px] bg-sky-700 hover:bg-sky-800' />
      <MainButton text='Cerrar Sesión' className='h-[35px] text-[16px] bg-black hover:bg-gray-900' />
    </div>

    </header>
  )
}
