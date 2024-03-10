import logo from '../../images/appointmed_logo.png'
import { MainButton } from '../MainButton'

export function Header () {
  return (
    <header className="flex justify-between items-center w-full max-w-[1200px] h-[80px] bg-slate-100 border-b border-slate-200 rounded-md px-8 mx-auto">
      <div>
        <img 
          src={logo} 
          alt="Appointmed" 
          className='h-[50px]'
        />
      </div>

    <div className='flex gap-4'>
      <MainButton text='Cambiar de Cuenta' className='h-[35px] text-[16px] bg-black hover:bg-gray-800' />
      <MainButton text='Cerrar Sesión' className='h-[35px] text-[16px] bg-red-600 hover:bg-red-700' />
    </div>

    </header>
  )
}
