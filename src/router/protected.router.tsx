import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoutes() {
  const auth = localStorage.getItem("AUTH_TOKEN_APPOINTMED");
  const data = auth !== null && JSON.parse(auth) 

  if (!data) return <Navigate to='/' replace />

  return (
    <Outlet />
  )
}
