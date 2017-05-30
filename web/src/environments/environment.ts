// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {EnvironmentInterface} from "./environment.interface";

export const environment:EnvironmentInterface = {
  production: false,
  baseUrl: "http://xzor.dev:8080",
  xzorApiUrl: "http://xzor.dev:8080/api",
  googleAuthClientId: "81469404550-v8l3va7tmh4ughsjg15hhe115ntbgt6s.apps.googleusercontent.com"
};
