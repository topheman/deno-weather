// todo type prepareQuery input (tied with cli)

export const prepareQuery = (args: any) => {
  return {
    pathname: "/Paris",
    params: {
      format: "j1",
    },
  };
};

export const makeHttpClient = (
  { endpoint }: {
    endpoint: string;
  },
) =>
  async (
    { pathname, params }: { pathname: string; params: Record<string, string> },
  ) => {
    class HTTPError extends Error {}

    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}${pathname}${queryString && "?" + queryString}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new HTTPError(`Error fetching ${url} - ${response.statusText}`);
    }

    const parsed = await response.json();

    return parsed;
  };
