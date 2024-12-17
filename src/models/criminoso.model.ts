import { randomUUID } from "crypto";

export class Criminoso {
  private _id: string;

  constructor(
    private _nome: string,
    private _sobrenome: string,
    private _idade: number,
    private _cpf: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }
  get sobrenome(): string {
    return this._sobrenome;
  }

  get idade(): number {
    return this._idade;
  }

  get cpf(): string {
    return this._cpf;
  }
}
