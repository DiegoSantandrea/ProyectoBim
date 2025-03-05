import { config } from "dotenv";
import { initServer } from "./configs/server.js"
import { crearAdmin } from "./configs/administrador.js";
import { crearCategoriaDefault } from "./configs/categoria.js";

config()
initServer()
crearAdmin()
crearCategoriaDefault()