import './Loader.css';

export function Loader() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-[100vh] grid place-content-center bg-black bg-opacity-[.3] z-50'>
      <span className="loader"></span>
    </div>
  )
}