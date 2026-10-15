import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdministrador from '../hooks/useAdministradores';
import ComboBoxRol from './ComboBoxRol';
import Alerta from './Alerta';

function FormularioUsuario({onClose }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [rol, setRol] = useState('');
  const [ocultarInput, setOcultarInput] = useState(false);

  const { mostrarAlerta, alerta, submitUsuario, roles, usuario } = useAdministrador();
  const navigate = useNavigate();
  const params = useParams();

  // Cuando hay un ID en params, prellenamos el formulario
  useEffect(() => {
  if (params.id && usuario) {
    // Modo edición
    setId(usuario._id);
    setName(usuario.name || '');
    setEmail(usuario.email || '');
    setRol(usuario.rol || '');
    setOcultarInput(true);
  } else {
    // Modo registro
    limpiarInput();
    setOcultarInput(false);
  }
}, [params.id, usuario]);

  const handleSubmitRol = (e) => setRol(e.value);

  const limpiarInput = () => {
    setId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRepetirPassword('');
    setRol('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if ([name, email, password, repetirPassword].includes('') && !id) {
      mostrarAlerta({ msg: 'Todos los campos son requeridos', error: true });
      return;
    }

    if (!rol) {
      mostrarAlerta({ msg: 'Seleccionar un rol para el usuario', error: true });
      return;
    }

    if (password !== repetirPassword && !id) {
      mostrarAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }

    if (password.length < 10 && !id) {
      mostrarAlerta({ msg: 'La contraseña es muy corta, agrega mínimo 10 caracteres', error: true });
      return;
    }

    await submitUsuario({ id, name, email, password, rol });

    limpiarInput();
    if (onClose) onClose();
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    limpiarInput();
    if (onClose) onClose();
    navigate('/admin/lista-usuarios');
  };

  return (
    <form
      className="bg-white py-5 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      {alerta.msg && <Alerta alerta={alerta} />}

      <div className="my-2">
        <input
          type="text"
          placeholder="Ingrese su nombre completo"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="my-2">
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-2">
        <input
          type={ocultarInput ? 'hidden' : 'password'}
          placeholder="Ingrese su contraseña"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="my-2">
        <input
          type={ocultarInput ? 'hidden' : 'password'}
          placeholder="Repetir su contraseña"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={repetirPassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
        />
      </div>

      <div className="my-2">
        <ComboBoxRol roles={roles} handleSubmitRol={handleSubmitRol} />
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <input
          type="submit"
          value={ocultarInput ? 'Actualizar' : 'Registrar'}
          className="bg-orange-600 w-full py-2 text-white text-sm uppercase font-bold rounded-md hover:bg-orange-800 transition-colors"
        />
        <input
          type="button"
          value="Cancelar"
          className="bg-red-600 w-full py-2 text-white text-sm uppercase font-bold rounded-md hover:bg-red-800 transition-colors"
          onClick={handleCancelar}
        />
      </div>
    </form>
  );
}

export default FormularioUsuario;
