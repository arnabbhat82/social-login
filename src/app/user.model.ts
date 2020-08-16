export class User {
    name: string;
    // tslint:disable-next-line: variable-name
    constructor(public id: string, public message: string, private _token: string, private tokenExpirationDate: Date) { }
    get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
            return null;
        }
        return this._token;
    }
}
