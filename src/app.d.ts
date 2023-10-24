/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth.js").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
