export class HttpException extends Error {
  private readonly _status: number;

  constructor(msg: string, status: number) {
    super(msg);
    this._status = status;
  }

  get message(): string {
    return this.message;
  }

  get status(): number {
    return this._status;
  }
}
