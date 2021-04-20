import { WttrInPayload } from "./types.ts";

export const HTTP_ENDPOINT = "https://wttr.in";

// todo type prepareQuery input (tied with cli)

export type HttpClientParamsType = Record<string, string>;
export type PrepareQueryParamsType = {
  location: string;
  params: Record<string, unknown>;
};

export type IQueryFactory = (
  args: PrepareQueryParamsType,
) => ({ pathname: string; params: HttpClientParamsType });

export const prepareQuery: IQueryFactory = ({ location, params }) => {
  return {
    pathname: `/${location.replaceAll("/", " ")}`,
    params: {
      format: "j1",
      lang: String(params.lang),
    },
  };
};

export type IHttpClientFactory = () => (
  { pathname, params }: { pathname: string; params: HttpClientParamsType },
) => Promise<WttrInPayload>;

export const makeHttpClient: IHttpClientFactory = () =>
  async (
    { pathname, params },
  ) => {
    class HTTPError extends Error {}

    const queryString = new URLSearchParams(params).toString();
    const url = encodeURI(`${HTTP_ENDPOINT}${pathname}${queryString &&
      "?" + queryString}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new HTTPError(`Error fetching ${url} - ${response.statusText}`);
    }

    const parsed = await response.json();

    return parsed;
  };
