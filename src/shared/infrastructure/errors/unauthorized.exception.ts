export class InfrastructureUnauthorizedException extends Error {
    constructor() {
        super('No tienes permiso para acceder a este recurso');
    }
}
