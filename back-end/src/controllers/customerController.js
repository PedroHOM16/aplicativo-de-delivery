const {
  validateBodySale,
  createSale,
  createSalesProducts,
  validateParamsId, 
  getSale, 
  getProducts,  
  getSalesByUserId } = require('../services/customerService');
const customerService = require('../services/customerService');
const loginService = require('../services/loginService');
const { getName } = require('../services/userService');
const userService = require('../services/userService');

const customerController = {
  async getAll(req, res) {
    const token = await loginService.validateToken(req.headers);
    await loginService.readToken(token);
    const products = await customerService.getAll();
    res.json(products);
  },
  async createSale(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    const user = await userService.getByEmailOrThrows(email);
    const data = await validateBodySale(req.body);
    const { products, ...sale } = data;
    const { id } = await createSale({ userId: user.id, ...sale });
    await createSalesProducts(id, products);
    res.status(201).json({ saleId: id });
  },
  async getOrderById(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    await userService.getByEmailOrThrows(email);
    const data = await validateParamsId(req.params);
    const { sellerId, totalPrice, status, saleDate, id } = await getSale(data);
    const sellerName = await getName(sellerId);
    const products = await getProducts(id);
    const objResponse = {
      id,
      sellerName,
      totalPrice,
      status,
      saleDate,
      products,    
    };
    res.json(objResponse);
  },
  async getOrdersByUserId(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    await userService.getByEmailOrThrows(email);
    const data = await validateParamsId(req.params);
    console.log('id param: ', data);
    const array = await getSalesByUserId(data);
    const response = array.map((each) => ({
      id: each.id,
      totalPrice: each.totalPrice,
      SaleData: each.saleDate,
      status: each.status,
    }));
    console.log(response);
    // const objResponse = { id, totalPrice, status, saleDate };
    res.send('objResponse');
  },
};

module.exports = customerController;
