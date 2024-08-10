/**
 * 서버사이드 prefetch 시 예시 입니다.
 * @example
 *  import { queryOptions } from "@tanstack/react-query";
 * 
 * export const pokemonOptions = queryOptions({
 * queryKey: ['pokemon'],
 * queryFn: async () => {
 *   const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')

 *  return response.json()
  },
})
 */
let guide;
