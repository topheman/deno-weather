import { makeApi } from "./libs/api.ts";

async function main() {
  const api = makeApi();
  const result = await api();
  console.log(result);
}

if (import.meta.main) {
  main();
}
