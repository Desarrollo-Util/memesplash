export {};

declare module 'fastify' {
    interface FastifyRequest {
        // Multer middleware
        isMultipart: typeof isMultipart;
        file: File;
        files: FilesInRequest;
        title: string;
        slug: string;
    }
    interface FastifyReply {
        // Auth middleware
        userId: string;
    }
}
