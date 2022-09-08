/**
 * Generic application unauthorized exception
 */
export class ApplicationUnauthorizedException extends Error {
    constructor() {
        super('No tienes permiso para acceder a este recurso');
    }
}
