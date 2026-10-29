import express, {
  response,
  Router,
  type Request,
  type Response,
} from "express";
import { clienteService } from "../services/cliente.service.js";
import { CriarCliente } from "../types/cliente.js";

export const clienteRouter = Router();

clienteRouter.get("/", async (_request: Request, response: Response) => {
  try {
    const res = await clienteService.getAll();
    return response.json(res);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Erro Interno",
    });
  }
});

clienteRouter.post(
  "/",
  async (request: Request<{}, {}, CriarCliente>, response: Response) => {
    try {
      const dados = request.body;
      const cliente = await clienteService.create(dados);
      return response.status(201).json(cliente);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro Interno",
      });
    }
  },
);

clienteRouter.get(
  "/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      const res = await clienteService.getById(id);
      if (!res) {
        return response.status(404).json({
          error: "Cliente não encontrado",
        });
      }
      return response.json(res);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);

clienteRouter.put(
  "/:id",
  async (
    request: Request<{ id: string }, {}, CriarCliente>,
    response: Response,
  ) => {
    const { id } = request.params;
    try {
      const dados = request.body;
      const clienteAtualizado = await clienteService.update(id, dados);

      if (!clienteAtualizado) {
        return response.status(404).json({
          error: "Cliente não encontrada para atualização",
        });
      }

      return response.json(clienteAtualizado);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);

clienteRouter.delete(
  "/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      const res = await clienteService.delete(id);
      return response.json(res);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: "Erro interno",
      });
    }
  },
);
