import { z } from "zod";
import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ message: "Unauthorized" }, 401),
      });
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return c.json({ data });
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ message: "Unauthorized" }, 401),
        });
      }
      if (!id) {
        return c.json({ error: "Invalid id" }, 400);
      }
      const [data] = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(and(eq(accounts.id, id), eq(accounts.userId, auth.userId)));

      if (!data) {
        return c.json({ error: "Not found" }, 400);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json(
            {
              message: "Unauthorized",
            },
            401
          ),
        });
      }
      const [data] = await db
        .insert(accounts)
        .values({ id: createId(), userId: auth.userId, ...values })
        .returning();
      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json(
            {
              message: "Unauthorized",
            },
            401
          ),
        });
      }
      const [data] = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth?.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });
      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json(
            {
              message: "Unauthorized",
            },
            401
          ),
        });
      }
      const values = c.req.valid("json");
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Invalid id" }, 400);
      }
      const [data] = await db
        .update(accounts)
        .set(values)
        .where(and(eq(accounts.id, id), eq(accounts.userId, auth.userId)))
        .returning();
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json(
            {
              message: "Unauthorized",
            },
            401
          ),
        });
      }
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Invalid id" }, 400);
      }
      const [data] = await db
        .delete(accounts)
        .where(and(eq(accounts.id, id), eq(accounts.userId, auth.userId)))
        .returning();
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;
