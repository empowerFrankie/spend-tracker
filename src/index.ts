import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {
  accounts,
  categories,
  SpendingTrackers,
  transactions,
} from "./mockData";
import { cors } from "hono/cors";
import { SpendingTracker } from "./types";
import { z } from "zod";
import { randomUUID } from "node:crypto";

const app = new Hono();

// allow all requests regardless of origin (probably not something we'd do in
// production, dependant on product/service)
app.use(cors());

// cutting edge database technology
let spendingTrackersDatabase: SpendingTracker[] = SpendingTrackers;

app
  .get("/accounts", (c) => {
    return c.json(accounts);
  })
  .get("/categories", (c) => {
    return c.json(categories);
  })
  .get("/transactions", (c) => {
    return c.json(transactions);
  })
  .get("/trackers", (c) => {
    return c.json(spendingTrackersDatabase);
  })
  .post("/spending-trackers/create", async (c) => {
    try {
      const body = await c.req.json();
      // parse the request body for expected params
      const parseResult = z
        .object({
          spendLimit: z.number(),
          categoryId: z.string(),
          interval: z.enum(["week", "month"]),
        })
        .safeParse(body);

      if (parseResult.success === false) {
        return c.json(
          {
            error: "bad syntax",
          },
          400
        );
      }

      const newSpendingTracker: SpendingTracker = {
        id: randomUUID(),
        category_id: parseResult.data.categoryId,
        spend_limit: parseResult.data.spendLimit,
        interval: parseResult.data.interval,
      };

      spendingTrackersDatabase.push(newSpendingTracker);

      return c.json(newSpendingTracker);
    } catch (error) {
      return c.json(
        {
          error: "failed to parse body",
        },
        400
      );
    }
  })
  .post("/spending-trackers/update", async (c) => {
    try {
      const body = await c.req.json();
      // parse the request body for expected params
      const parseResult = z
        .object({
          id: z.string(),
          spendLimit: z.number(),
          categoryId: z.string(),
          interval: z.enum(["week", "month"]),
        })
        .safeParse(body);

      if (parseResult.success === false) {
        return c.json(
          {
            error: "bad syntax",
          },
          400
        );
      }

      // filter out the existing record
      spendingTrackersDatabase = spendingTrackersDatabase.filter(
        (sP) => sP.id !== parseResult.data.id
      );
      const updatedSpendingTracker = {
        id: parseResult.data.id,
        spend_limit: parseResult.data.spendLimit,
        category_id: parseResult.data.categoryId,
        interval: parseResult.data.interval,
      };
      // add the "updated" record
      spendingTrackersDatabase.push(updatedSpendingTracker);
      return c.json(updatedSpendingTracker);
    } catch (error) {
      return c.json(
        {
          error: "failed to parse body",
        },
        400
      );
    }
  })
  .post("/spending-trackers/delete", async (c) => {
    try {
      const body = await c.req.json();
      // parse the request body for expected params
      const parseResult = z
        .object({
          spendingTrackerId: z.string(),
        })
        .safeParse(body);

      if (parseResult.success === false) {
        return c.json(
          {
            error: "bad syntax",
          },
          400
        );
      }

      spendingTrackersDatabase = spendingTrackersDatabase.filter(
        (sP) => sP.id !== parseResult.data.spendingTrackerId
      );

      return c.json(null);
    } catch (error) {
      return c.json(
        {
          error: "failed to parse body",
        },
        400
      );
    }
  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
