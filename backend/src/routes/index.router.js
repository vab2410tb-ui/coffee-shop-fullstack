// src/routes/index.js
import shopRouter from '../routes/shop.router.js';
import siteRouter from './site.router.js';
import adminRouter from './admin/upload.route.js'
import productAdminRouter from './admin/product.route.js';


const route = (app) => {
   app.use('/api/v1/products', shopRouter)
   app.use('/api/v1/admin/uploads', adminRouter)
   app.use('/api/v1/admin/products', productAdminRouter);
   app.use('/', siteRouter)
};

export default route;
