
export default class User {
  public detail: unknown

  constructor(
    public email : string,
    public token : string
  ) {}

  public setDetail(detail: unknown) {
    this.detail = detail
  }
}
