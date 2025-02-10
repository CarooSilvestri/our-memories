import express from 'express';
import router from './router';

const app = express();
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
