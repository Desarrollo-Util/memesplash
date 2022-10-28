import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ObjectOptions, Static, TSchema, Type } from '@sinclair/typebox';
import { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type ClassType<T> = {
    new (...args: any[]): T;
};

const TYPEBOX_METADATA_STORAGE = Symbol('TYPEBOX_METADATA_STORAGE');
const TYPEBOX_METADATA_SCHEMA = Symbol('TYPEBOX_METADATA_SCHEMA');

type PropDef = {
    key: string;
    def: TSchema;
};

export const Dto = (options?: ObjectOptions) => (target: ClassType<any>) => {
    const props: PropDef[] =
        Reflect.getMetadata(TYPEBOX_METADATA_STORAGE, target) || [];
    const schemaDef = props.reduce(
        (acum, current) => ({
            ...acum,
            [current.key]: current.def,
        }),
        {}
    );

    const withIdoptions: ObjectOptions = {
        $id: target.name,
        ...(options || {}),
    };
    let baseClass = Object.getPrototypeOf(target);
    const schemas = [];
    while (baseClass && baseClass !== Object && baseClass.name) {
        const schemaDef = Reflect.getMetadata(
            TYPEBOX_METADATA_SCHEMA,
            baseClass
        );
        if (!schemaDef) throw new Error('Not Dto class' + baseClass.name);
        schemas.unshift(schemaDef);
        baseClass = Object.getPrototypeOf(baseClass);
    }

    Reflect.deleteMetadata(TYPEBOX_METADATA_STORAGE, target);
    Reflect.defineMetadata(
        TYPEBOX_METADATA_SCHEMA,
        schemas.length > 0
            ? Type.Intersect(
                  [
                      ...schemas,
                      Type.Object(schemaDef, {
                          $id: withIdoptions.$id || target.name,
                      }),
                  ],
                  withIdoptions
              )
            : Type.Object(schemaDef, withIdoptions),
        target
    );
    return target;
};

export const Prop =
    <K extends TSchema>(type: K) =>
    <T extends Partial<Record<S, Static<K>>>, S extends string>(
        target: T,
        propertyKey: S
    ) => {
        const props: PropDef[] =
            Reflect.getMetadata(TYPEBOX_METADATA_STORAGE, target.constructor) ||
            [];

        const newProps: PropDef[] = [
            ...props,
            {
                key: propertyKey,
                def: type,
            },
        ];

        return Reflect.defineMetadata(
            TYPEBOX_METADATA_STORAGE,
            newProps,
            target.constructor
        );
    };

type SchemaFromClass<T> = {
    static: T;
} & TSchema;

export const getSchema = <T>(type: ClassType<T>): SchemaFromClass<T> =>
    Reflect.getMetadata(TYPEBOX_METADATA_SCHEMA, type);

export const getRef = <T>(type: ClassType<T>, refArray: boolean = false) => {
    const baseSchema = getSchema(type);
    if (!refArray) return Type.Ref(baseSchema);
    return Type.Array(Type.Ref(baseSchema));
};

export const registerSchemas = (
    app: FastifyInstance<
        Server<typeof IncomingMessage, typeof ServerResponse>,
        IncomingMessage,
        ServerResponse<IncomingMessage>,
        FastifyBaseLogger,
        TypeBoxTypeProvider
    >,
    ...schemas: TSchema[]
) => {
    schemas.forEach((s) => app.addSchema(s));
};
