# deno-weather

Cli/Wrapper in deno based on the API behind https://wttr.in/.

The goal of this project is to discover deno.

You can launch the cli simply with:

```sh
deno run https://raw.githubusercontent.com/topheman/deno-weather/master/mod.ts

# to show help :
deno run https://raw.githubusercontent.com/topheman/deno-weather/master/mod.ts --help

# to specify a loacation :
deno run https://raw.githubusercontent.com/topheman/deno-weather/master/mod.ts Paris, France

# you can specify a language
deno run https://raw.githubusercontent.com/topheman/deno-weather/master/mod.ts Paris, France --lang fr
```

You can use the api that way:

```js
import { makeApi } from 'https://raw.githubusercontent.com/topheman/deno-weather/master/mod.ts'

const api = makeApi()

const payload = await api({
  params: {
    lang: 'fr'
  },
  location: 'Paris, France'
})
console.log(JSON.stringify(payload, null, "  "));
```

TODO : point to a specific tag instead of `master`
