import express from 'express';
import connectToDB from './config/db.js'
import cors from 'cors';
import sellerRoute from './routes/seller.route.js';
import clientRoute from './routes/client.route.js';
import saleRoutes from './routes/sale.route.js';

const app = express();
connectToDB();

app.use(cors());
app.use(express.json());
app.use('/api/sellers', sellerRoute);
app.use('/api/clients', clientRoute);
app.use('/api/sales', saleRoutes);

export default app;