type PropType<T, K extends keyof T> = T[K];
type ArrayType<P extends Array> = P extends Array<infer T> ? T : unknown;
type ValueOf<T> = T[keyof T];
