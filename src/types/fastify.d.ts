export {};

declare module 'fastify' {
    interface FastifyRequest {
        // Auth middleware
        userId: string;
        // Multer middleware
        isMultipart: typeof isMultipart;
        file: File;
        files: FilesInRequest;
        title: string;
        slug: string;
    }
}
