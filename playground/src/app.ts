process
     .on("unhandledRejection", (reason, p) => {
          console.error(reason, "Unhandled Rejection at Promise", p);
     })
     .on("uncaughtException", (err) => {
          console.error(err, "\n Uncaught Exception thrown \n");
          console.log("LOL");
          process.exit(1);
     });
import 'reflect-metadata';
import express, { Request, Response } from 'express'
import { setupSwagger } from './swagger';

const app = express()


setupSwagger(app);

app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})
const PORT: number = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
     console.log("🌐 Server is running on:", process.env.NODE_ENV === "development" ? String(process.env.SITE_API_Local_URL) : String(process.env.SITE_API_URL))
})
