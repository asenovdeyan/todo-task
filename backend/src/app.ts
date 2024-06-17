
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app: Application = express();
const PORT = process.env.PORT || 9878;

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
