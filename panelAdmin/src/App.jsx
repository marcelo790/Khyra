import {AuthProvider} from './context/AuthProvider';
import { AdministradorProvider } from './context/AdministradorProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./page/Login";
import RegistrarUsuario from "./page/RegistrarUsuario";
import OlvidePassword from "./page/OlvidePassword";
import NuevoPassword from "./page/NuevoPassword";
import ConfirmarCuenta from "./page/ConfirmarCuenta";
import RutaProtegida from './layouts/RutaProtegida';
import Administrador from './page/Administrador';
import ListaUsuarios from './page/ListaUsuarios';
import "tw-elements-react/dist/css/tw-elements-react.min.css";

function App() {

  return (    
      <BrowserRouter>
        <AuthProvider>
          <AdministradorProvider>
            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="olvide-password" element={<OlvidePassword/>}/>
                <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>

              </Route>
              <Route path="/admin" element={<RutaProtegida/>}>
                <Route index element={<Administrador/>}/>                
                <Route path="lista-usuarios" element={<ListaUsuarios/>}/>
                <Route path="lista-usuarios/:id" element={<ListaUsuarios/>}/>
              </Route>
            </Routes>
          </AdministradorProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
