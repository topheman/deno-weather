import { makeHttpClient, prepareQuery } from "./httpClient.ts";

const DEFAULT_ENDPOINT = "https://wttr.in";

export const makeApi = (
  {
    endpoint = DEFAULT_ENDPOINT,
    raw = true, // todo set to false when formatter done
    httpClientFactory = makeHttpClient,
    queryFactory = prepareQuery,
  } = {},
) =>
  (args = {}) => {
    const httpClient = makeHttpClient({ endpoint });
    return httpClient(prepareQuery(args));
    // todo manage logic/formatting
  };
