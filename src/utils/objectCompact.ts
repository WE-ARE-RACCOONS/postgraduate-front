type CompactObjectType = {
  [name: string]: string | number | boolean | null | undefined;
};

type CompactObjectReturnType = {
  [name: string]: string | number | boolean;
};

/**
 * 객체의 null, undefined를 제거한다.
 */
export const objectCompact = <T extends CompactObjectType>(object: T) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  ) as CompactObjectReturnType;
