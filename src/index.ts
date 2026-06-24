import express from 'express';

import { config } from "dotenv"
import healthRouter from './routes/health';
config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(healthRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});