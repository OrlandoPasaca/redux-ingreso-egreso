export class Usuario {
    static fireStorUser({ email, nombre, uid }) {
        console.log(email, nombre, uid);
        return new Usuario(uid, nombre, email);
    }
    constructor(public uid: string, public nombre: string, public email: string) { }
}
