export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            JWT_PRIVATE_KEY?: string;
            MONGODB_HOSTNAME?: string;
            MONGODB_PORT?: string;
            MONGODB_USER?: string;
            MONGODB_PASSWORD?: string;
            MONGODB_DATABASE_NAME?: string;
            MONGODB_URI?: string;
        }
    }
}
