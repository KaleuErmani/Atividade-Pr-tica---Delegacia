import { randomUUID } from "crypto";

export class Arma {
  private _id: string;

  constructor(
    private _tipoDaArma: string,
    private _calibre: string,
    private _dataApreensao: number,
    private _criminosoId: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get tipoDaArma(): string {
    return this._tipoDaArma;
  }

  get calibre(): string {
    return this._calibre;
  }

  get dataApreensao(): number {
    return this._dataApreensao;
  }

  get criminosoId(): string {
    return this._criminosoId;
  }
}
