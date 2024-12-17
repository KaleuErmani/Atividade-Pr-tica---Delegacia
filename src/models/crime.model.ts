import { randomUUID } from "crypto";

export class Crime {
  private _id: string;

  constructor(
    private _crime: string,
    private _dataDoCrime: string,
    private _criminosoId: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get crime(): string {
    return this._crime;
  }

  get dataDoCrime(): string {
    return this._dataDoCrime;
  }

  get criminosoId(): string {
    return this._criminosoId;
  }
}
