import {AuthProvider} from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./page/Login";
import RegistrarUsuario from "./page/RegistrarUsuario";
import OlvidePassword from "./page/OlvidePassword";
import NuevoPassword from "./page/NuevoPassword";
import ConfirmarCuenta from "./page/ConfirmarCuenta";
import RutaProtegida from './layouts/RutaProtegida';
import Administrador from './page/Administrador';

function App() {

  return (    
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<RegistrarUsuario/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>

            </Route>
            <Route path="/panel" element={<RutaProtegida/>}>
              <Route index element={<Administrador/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
