/** 1. criar repositório
 *  2. setup express app
 *  3. implementar rotas de CRUD:
 *  - Create = POST
 *  - Read = GET
 *  - Update = PUT
 *  - Delete = DELETE 
 */

const express = require("express");
const app = express();

app.use(express.json());

const stock = [
  {
    id: 1,
    product: "Acqua di Parma perfum",
    content: "Italian perfum with 30 mL from Italy",
  },
  {
    id: 2,
    product: "Hermés perfum",
    content: "French perfum with 50 mL from France",
  },
];

app.post("/stock", (req, res) => {
    stock.push(req.body);
    res.status(201).json(stock[stock.length - 1]);
});


app.get("/stock", (req, res) => {
  res.status(200).json(stock);
});

app.put("/stock/:id", (req, res) => {
    const { id } = req.params;
    const {product, content} = req.body;  

    // Find the product by ID and update it
    const productIndex = stock.findIndex(p => p.id === Number(id));
    if (productIndex !== -1) {
        stock[productIndex] = { id: Number(id), product, content };
        res.send({ success: true, data: stock });
    } else {
        res.status(404).send({ success: false, message: 'Product not found' });
    }
});

app.delete("/stock/:id", (req, res) => {
    const { id } = req.params;  

    // Find the product by ID and update it
    const productIndex = stock.findIndex(p => p.id === Number(id));
    if (productIndex !== -1) {
        stock.splice(productIndex, 1); 
        res.send({ success: true, data: stock });
    } else {
        res.status(404).send({ success: false, message: 'Product not found' });
    }
});

app.listen(3000, () => {
  console.log("server is running (express)");
});
