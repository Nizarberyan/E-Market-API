import express from 'express';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { swaggerUi, swaggerDocument } from './swagger.js';

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
