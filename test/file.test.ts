import request from "supertest";
import { app } from "./temp";

describe("App Routes", () => {
     it("should respond 200 on base route", async () => {
          const res = await request(app).get("/");
          expect(res.status).toBe(200);
     });

     it("should return 404 for unknown route", async () => {
          const res = await request(app).get("/not-found-route");
          expect(res.status).toBe(404);
     });
});
