import express, { Express } from "express";

const application: Express = express();

application.listen(3000, () => console.log('Server is running on port 3000...'));
