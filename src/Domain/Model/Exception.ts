
export default class Exception {

  public static create(message: string, context?: object): Exception {
    return new Exception(message, context)
  }

  private constructor(
    public message: string,
    public context?: object
  ) {
  }
}
