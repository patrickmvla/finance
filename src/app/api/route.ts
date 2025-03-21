import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ message: "Internal Server Error" }, 500);
});

export default app;
