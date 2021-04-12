import { runCli } from "./cli.ts";

// todo export public APIs

if (import.meta.main) {
  // would be better to dynamically import `runCli`, though, it neads a flag 😥
  runCli(Deno.args);
}
