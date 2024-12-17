import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Arma } from "../models/arma.model";

export class ArmaController {
  // index -> lista todos as armas de um criminoso
  public async index(request: Request, response: Response) {
    try {
      const { criminosoId } = request.params;

      const criminoso = await repository.criminosos.findUnique({
        where: { id: criminosoId },
        include: {
          arma: {
            select: {
              id: true,
              tipoDaArma: true,
              dataApreensao: true,
              crimeId: true,
              criminosoId: true,
            },
          },
        },
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
        message: "Armas listadas com sucesso.",
        data: criminoso.arma,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar armas. Tente novamente.",
      });
    }
  }

  // store -> cria uma arma
  public async store(request: Request, response: Response) {
    try {
      const { criminosoId } = request.params;
      const { crimeId, tipoDaArma, calibre } = request.body;

      if (!crimeId || !tipoDaArma) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Os campos 'crimeId' e 'tipoDaArma' são obrigatórios.",
        });
      }

      const criminoso = await repository.criminosos.findUnique({
        where: { id: criminosoId },
      });

      if (!criminoso) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "O criminoso não foi encontrado.",
        });
      }

      const createdArma = await repository.armas.create({
        data: {
          crimeId,
          tipoDaArma,
          calibre,
          criminosoId,
        },
      });

      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Arma cadastrada com sucesso.",
        data: createdArma,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao cadastrar arma. Tente novamente.",
      });
    }
  }

  // show -> lista uma arma de um criminoso
  public async show(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;

      const arma = await repository.armas.findFirst({
        where: {
          id,
          criminosoId,
        },
      });

      if (!arma) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Arma não encontrada.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Arma encontrada com sucesso.",
        data: arma,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao criar arma. Tente novamente.",
      });
    }
  }

  // update -> atualiza uma arma
  public async update(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;
      const { crimeId, tipoDaArma, calibre } = request.body;

      if (!crimeId || !tipoDaArma) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: 'Os campos "crimeId" e "tipoDaArma" são obrigatórios.',
        });
      }

      const arma = await repository.armas.findFirst({
        where: {
          id,
          criminosoId,
        },
      });

      if (!arma) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Arma não encontrada.",
        });
      }

      const updatedArma = await repository.armas.update({
        where: { id },
        data: {
          crimeId,
          tipoDaArma,
          calibre,
        },
        select: {
          id: true,
          tipoDaArma: true,
          calibre: true,
          criminosoId: true,
          crimeId: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Arma atualizada com sucesso.",
        data: updatedArma,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar arma. Tente novamente.",
      });
    }
  }

  // delete -> deleta uma arma
  public async delete(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;

      const arma = await repository.armas.findFirst({
        where: {
          id,
          criminosoId,
        },
      });

      if (!arma) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Arma não encontrada.",
        });
      }

      const deletedArma = await repository.armas.delete({
        where: { id },
        select: {
          id: true,
          tipoDaArma: true,
          criminosoId: true,
          crimeId: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Arma deletada com sucesso.",
        data: deletedArma,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao deletar arma. Tente novamente.",
      });
    }
  }
}
