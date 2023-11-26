/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./server/auth/lucia.ts").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
