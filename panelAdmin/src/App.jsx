import {AuthProvider} from './context/AuthProvider';
import { AdministradorProvider } from './context/AdministradorProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./page/Login";
import OlvidePassword from "./page/OlvidePassword";
import NuevoPassword from "./page/NuevoPassword";
import ConfirmarCuenta from "./page/ConfirmarCuenta";
import RutaProtegida from './layouts/RutaProtegida';
import Administrador from './page/Administrador';
import ListaUsuarios from './page/ListaUsuarios';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import ListaRoles from './page/ListaRoles';
import ListaCategorias from './page/ListaCategorias';
import ListaSubCategorias from './page/ListaSubCategorias';

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
                <Route path="lista-roles" element={<ListaRoles/>}/>
                <Route path="lista-roles/:id" element={<ListaRoles/>}/>
                <Route path="lista-categorias" element={<ListaCategorias/>}/>
                <Route path="lista-categorias/:id" element={<ListaCategorias/>}/>
                <Route path="lista-subcategorias" element={<ListaSubCategorias/>}/>
                <Route path="lista-subcategorias/:id" element={<ListaSubCategorias/>}/>
              </Route>
            </Routes>
          </AdministradorProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
