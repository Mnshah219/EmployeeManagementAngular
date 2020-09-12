export class User {
  constructor(
    public email: string,
    public role: string,
    private jwt: string,
    public expires: number
  ) {}
  get token() {
    if (!this.expires || new Date() > new Date(this.expires)) return null;
    return this.jwt;
  }
}
