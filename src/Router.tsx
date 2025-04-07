import { Route, Routes } from 'react-router'
import Login from './pages/Login/Login'
import Orders from './pages/Orders/OrdersPage'

function Router() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default Router
