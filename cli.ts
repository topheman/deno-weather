import { parse } from "https://deno.land/std@0.92.0/flags/mod.ts";

import { DEFAULT_ENDPOINT, makeApi } from "./libs/api.ts";

const allowedFlags = ["lang", "u", "m"];

const helpMessage = `
deno-weather

Usage: deno-weather [options]

Options:
    -h, --help              Show this page
        --lang <language>   Specify language code
    -u                      Uscs units
    -m                      Metric units
`;

export async function runCli(denoArgs: string[]) {
  const { _: args, ...options } = parse(denoArgs);
  console.log(args, options);

  if (options.h || options.help) {
    console.log(helpMessage);
    Deno.exit(0);
  }

  const disallowedFlags = Object.keys(options).reduce<string[]>(
    (acc, currentFlag) => {
      if (!allowedFlags.includes(currentFlag)) {
        acc.push(currentFlag);
      }
      return acc;
    },
    [],
  );

  if (disallowedFlags.length) {
    console.log(
      `You passed the following unsupported flag${
        disallowedFlags.length > 1 ? "s" : ""
      }: ${disallowedFlags.join(",")}`,
    );
    Deno.exit(22);
  }

  const hostAllowed = DEFAULT_ENDPOINT.replace(/^https?\:\/\//, "");

  const permissionAllowNetDescriptor = {
    name: "net",
    host: hostAllowed,
  } as const;

  let status = await Deno.permissions.query(permissionAllowNetDescriptor);

  // if no valid --allow-net flag or --allow-net=<host> was past, request permission
  if (status.state === "prompt") {
    status = await Deno.permissions.request(permissionAllowNetDescriptor);
  }

  if (status.state === "denied") {
    console.log(
      `
This program needs permission to make requests to ${DEFAULT_ENDPOINT}

Please pass --allow-net=${hostAllowed} flag, or grant the net permission you were asked for.`,
    );
    Deno.exit(1);
  }

  const preparedArgs = {
    ...options,
    location: args.join(" "),
  };

  const api = makeApi();
  const payload = await api(preparedArgs);
  console.log(JSON.stringify(payload, null, "  "));
}
