import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Criminoso } from "../models/criminoso.model";

export class CriminosoController {
  // index -> lista todos os criminosos
  public async index(request: Request, response: Response) {
    try {
      const criminosos = await repository.criminosos.findMany();

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Criminosos listados com sucesso.",
        data: criminosos,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar criminosos.",
      });
    }
  }

  // store -> cria um novo registro
  public async store(request: Request, response: Response) {
    try {
      const { nome, sobrenome, idade, cpf } = request.body;

      if (!nome || !sobrenome || !idade || !cpf) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const newCriminoso = new Criminoso(nome, sobrenome, idade, cpf);

      const createdCriminoso = await repository.criminosos.create({
        data: {
          id: newCriminoso.id,
          nome: newCriminoso.nome,
          sobrenome: newCriminoso.sobrenome,
          idade: newCriminoso.idade,
          cpf: newCriminoso.cpf,
        },
      });

      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Criminoso cadastrado com sucesso.",
        data: createdCriminoso,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao cadastrar criminoso.",
        error,
      });
    }
  }

  // show -> detalhes de um unico registro
  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const criminoso = await repository.criminosos.findUnique({
        where: { id },
      });

      if (!criminoso) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Criminoso não encontrado.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "criminoso encontrado com sucesso.",
        data: criminoso,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao encontrar criminoso.",
      });
    }
  }
  // update -> atualziar um registro existente
  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, sobrenome, idade, cpf } = request.body;

      const updatedCriminoso = await repository.criminosos.update({
        where: { id },
        data: {
          nome,
          sobrenome,
          idade,
          cpf,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Criminoso atualizado com sucesso.",
        data: updatedCriminoso,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar criminoso.",
      });
    }
  }

  // delete ou destroy -> remover um registro existente
  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedCriminoso = await repository.criminosos.delete({
        where: { id },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Criminoso removido com sucesso.",
        data: deletedCriminoso,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: `Erro ao tentar remover criminoso. ${error}`,
      });
    }
  }
}
