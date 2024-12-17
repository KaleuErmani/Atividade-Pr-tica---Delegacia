import express from "express";
import cors from "cors";

import { CriminosoController } from "./controllers/criminoso.controller";
import { CrimeController } from "./controllers/crime.controller";
import { ArmaController } from "./controllers/arma.controller";

const app = express();

app.use(express.json());
app.use(cors());

const criminosoController = new CriminosoController();
const crimesController = new CrimeController();
const armasController = new ArmaController();

// Listar todos os criminosos
app.get("/criminosos", criminosoController.index);

// Cadastrar novo criminoso
app.post("/criminosos", criminosoController.store);

// Pesquisar um criminoso por ID
app.get("/criminosos/:id", criminosoController.show);

// Atualiza um criminoso
app.put("/criminosos/:id", criminosoController.update);

// Exclui um criminoso
app.delete("/criminosos/:id", criminosoController.delete);

//tabela de crimes

// Listar todos os crimes
app.get("/criminosos/crimes/:criminosoId", crimesController.index);

// Cadastrar novo crime
app.post("/criminosos/crimes/:criminosoId", crimesController.store);

// Pesquisar um crime por ID
app.get("/criminosos/crimes/:criminosoId/:id", crimesController.show);

// Atualiza um crime
app.put("/criminosos/crimes/:criminosoId/:id", crimesController.update);

// Exclui um crime
app.delete("/criminosos/crimes/:criminosoId/:id", crimesController.delete);

//tabela de armas

// Listar todas as armas de um criminoso
app.get("/criminosos/armas/:criminosoId", armasController.index);

// Cadastrar uma nova arma
app.post("/criminosos/armas/:criminosoId", armasController.store);

// Pesquisar uma arma por ID
app.get("/criminosos/armas/:criminosoId/:id", armasController.show);

// Atualiza uma arma
app.put("/criminosos/armas/:criminosoId/:id", armasController.update);

// Exclui um crime
app.delete("/criminosos/armas/:criminosoId/:id", armasController.delete);

app.listen(3000, () => {
  console.log("🚀 Server ready at: http://localhost:3000");
});
