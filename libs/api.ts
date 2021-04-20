import {
  IHttpClientFactory,
  IQueryFactory,
  PrepareQueryParamsType,
} from "./httpClient.ts";
import { makeHttpClient, prepareQuery } from "./httpClient.ts";
export { HTTP_ENDPOINT } from "./httpClient.ts";
import { WttrInPayload } from "./types.ts";

export type IApiFactory = (
  { httpClientFactory, queryFactory }: {
    httpClientFactory: IHttpClientFactory;
    queryFactory: IQueryFactory;
  },
) => (
  args: PrepareQueryParamsType,
) => Promise<WttrInPayload>;

const apiFactory: IApiFactory = (
  {
    httpClientFactory,
    queryFactory,
  },
) =>
  (args) => {
    const httpClient = httpClientFactory();
    return httpClient(queryFactory(args));
    // todo manage logic/formatting
  };

export const makeApi = ({
  httpClientFactory = makeHttpClient,
  queryFactory = prepareQuery,
} = {}) =>
  apiFactory({
    httpClientFactory,
    queryFactory,
  });
