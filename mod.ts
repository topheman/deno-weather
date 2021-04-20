import { runCli } from "./cli.ts";
export { runCli } from "./cli.ts";
export { makeApi } from "./libs/api.ts";

if (import.meta.main) {
  // would be better to dynamically import `runCli`, though, it neads a flag 😥
  runCli(Deno.args);
}
