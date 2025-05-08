import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userState = Object.freeze({
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  BLOQUEADO: 'BLOQUEADO'
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    enum: Object.values(userState),
    default: userState.INACTIVO
  },
  state_session: {
    type: Boolean,
    required: true,
    default: false
  },
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  rol: {
    type: mongoose.Types.ObjectId,
    ref: 'Role'
  }
}, {
  timestamps: true
});

// hash de password
userSchema.pre('save', async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comprobarPassword = async function(passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;