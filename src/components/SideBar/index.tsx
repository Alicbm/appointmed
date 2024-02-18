export function SideBar (){
  return (
    <div className="w-[250px] text-gray-800 bg-blue-100 rounded-md overflow-hidden">
      <div className="bg-blue-200 px-4 py-2">
        <p className="text-2xl font-bold tracking-wider">Username</p>
      </div>

      <ul className="grid gap-4 text-lg py-4">
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Inicio</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Medicina General</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Odontología</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Ginecología</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Psiquiatría</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Pediatría</li>
        <li className="hover:bg-blue-200 cursor-pointer px-4 py-2">Optometría</li>
      </ul>
    </div>
  )
}