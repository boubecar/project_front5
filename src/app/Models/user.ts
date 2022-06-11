export class User {
  public id: string = "";
  public fullName: string = "";
  public email: string = "";
  public userName: string = "";
  public filalelId: string = "";
  public roles: string[] = [];

  constructor(id: string, email: string, userName: string, filalelId: string, roles: string[], fullName: string) {
    this.id = id;

    this.email = email;
    this.userName = userName;
    this.roles = roles;
    this.filalelId = filalelId
    this.fullName = fullName;
  }
}
