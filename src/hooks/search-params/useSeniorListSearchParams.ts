import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';

export const useSeniorListPageSearchParams = () => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  return {
    page,
    setPage,
  };
};
