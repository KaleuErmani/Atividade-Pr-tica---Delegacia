import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Crime } from "../models/crime.model";

export class CrimeController {
  // index -> lista todos os crimes de um criminoso
  public async index(request: Request, response: Response) {
    try {
      const { criminosoId } = request.params;

      const criminoso = await repository.criminosos.findUnique({
        where: { id: criminosoId },
        include: {
          crimes: {
            select: {
              id: true,
              crime: true,
              dataDoCrime: true,
              criminosoId: true,
              armas: true,
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
        message: "Crimes listados com sucesso.",
        data: criminoso.crimes,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar crimes. Tente novamente.",
      });
    }
  }

  // store -> cria um crime
  public async store(request: Request, response: Response) {
    try {
      const { criminosoId } = request.params;
      const { crime, dataDoCrime } = request.body;

      if (!crime || !dataDoCrime) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Os campos 'crime' e 'dataDoCrime são obrigatórios.",
        });
      }

      const criminoso = await repository.criminosos.findUnique({
        where: { id: criminosoId },
      });

      if (!criminoso) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "O criminoso não foi encontrado.",
        });
      }

      const newCrime = new Crime(crime, dataDoCrime, criminosoId);

      const createdCrime = await repository.crimes.create({
        data: {
          crime: newCrime.crime,
          dataDoCrime: newCrime.dataDoCrime,
          criminosoId: newCrime.criminosoId,
        },
      });

      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Crime criado com sucesso.",
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao criar crime.",
      });
    }
  }

  // show -> lista um crime de um criminoso
  public async show(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;

      const crime = await repository.crimes.findFirst({
        where: {
          id,
          criminosoId,
        },
        select: {
          id: true,
          crime: true,
          dataDoCrime: true,
          criminosoId: true,
          armas: true,
        },
      });

      if (!crime) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Crime não foi encontrado.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Crime encontrado com sucesso.",
        data: crime,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao buscar crime.",
      });
    }
  }

  // update -> atualiza um crime
  public async update(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;
      const { crime, dataDoCrime } = request.body;

      if (!crime || !dataDoCrime) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Os campos 'crime' e 'dataDoCrime' são obrigatórios.",
        });
      }

      const findCrime = await repository.crimes.findFirst({
        where: { id, criminosoId },
      });

      if (!findCrime) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Crime não encontrado.",
        });
      }

      const updatedCrime = await repository.crimes.update({
        where: { id },
        data: {
          crime,
          dataDoCrime,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Crime atualizado com sucesso.",
        data: updatedCrime,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar crime.",
      });
    }
  }

  // delete -> deleta um crime
  public async delete(request: Request, response: Response) {
    try {
      const { criminosoId, id } = request.params;

      const crime = await repository.crimes.findFirst({
        where: {
          criminosoId,
          id,
        },
        select: {
          id: true,
          crime: true,
          dataDoCrime: true,
          criminosoId: true,
          armas: true,
        },
      });

      if (!crime) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Crime não encontrado.",
        });
      }

      const deletedCrime = await repository.crimes.delete({
        where: {
          id,
          criminosoId,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Crime deletado com sucesso.",
        data: deletedCrime,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Ocorreu um erro ao tentar deletar crime.",
      });
    }
  }
}
