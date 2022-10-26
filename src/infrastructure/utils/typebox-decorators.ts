import { ObjectOptions, TSchema, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';

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
    Reflect.deleteMetadata(TYPEBOX_METADATA_STORAGE, target);
    Reflect.defineMetadata(
        TYPEBOX_METADATA_SCHEMA,
        Type.Object(schemaDef, options),
        target
    );
    return target;
};

export const Prop =
    <K extends TSchema>(type: K) =>
    (target: any, propertyKey: string) => {
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

export const getSchema = <T>(type: ClassType<T>): unknown => {
    const schema = Reflect.getMetadata(TYPEBOX_METADATA_SCHEMA, type);
    if (!schema) throw new Error(`${type.constructor.name} not DTO provided`);
    return schema;
};

export const getArraySchema = <T>(type: ClassType<T>): unknown => {
    const schema = Reflect.getMetadata(TYPEBOX_METADATA_SCHEMA, type);
    if (!schema) throw new Error(`${type.constructor.name} not DTO provided`);
    return Type.Array(schema);
};