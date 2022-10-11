export class NotFoundException extends Error {
    constructor() {
        super('La entidad a la que intentas acceder no existe');
    }
}
