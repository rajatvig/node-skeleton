CRUD Swagger Docs
---

```json

  /**
   * @swagger
   * definition:
   *   ProductList:
   *     type: object
   *     properties:
   *       products:
   *         schema:
   *           type: array
   *           items:
   *             type: json
   *             schema:
   *               $ref: '#/definitions/Product'
   */

  /**
   * @swagger
   * definition:
   *   Product:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *       id:
   *         type: string
   *       url:
   *         type: string
   *       availableAt:
   *         type: date-time
   *       productType:
   *         type: string
   *       related:
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Product'
   */

  /**
   * @swagger
   * /products:
   *   get:
   *     description: get a list of products
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: all products
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Product'
   *       500:
   *         description: service is down
   */
  app.get('/products', productHandler.getAllProducts);

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     description: get a product
   *     parameters:
   *       - name: id
   *         description: the product id
   *         in: path
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: the product
   *         schema:
   *           $ref: '#/definitions/Product'
   *       404:
   *         description: product not found
   *       500:
   *         description: service is down
   */
  app.get('/products/:id', productHandler.getProduct);


  /**
   * @swagger
   * definition:
   *   ProductData:
   *     type: object
   *     required:
   *       - name
   *       - availableAt
   *       - productType
   *     properties:
   *       name:
   *         type: string
   *       availableAt:
   *         type: date-time
   *       productType:
   *         type: string
   */

  /**
   * @swagger
   * /products/{id}:
   *   post:
   *     description: create a product
   *     parameters:
   *       - name: id
   *         description: the product id
   *         in: path
   *         required: true
   *         type: string
   *       - name: data
   *         description: the product data
   *         in: body
   *         required: true
   *         type: json
   *         schema:
   *           $ref: '#/definitions/ProductData'
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: the product was created
   *       404:
   *         description: product not found
   *       500:
   *         description: service is down
   */
  app.post('/products', productHandler.createProduct);

  /**
   * @swagger
   * /products/{id}:
   *   patch:
   *     description: update a product
   *     parameters:
   *       - name: id
   *         description: the product id
   *         in: path
   *         required: true
   *         type: string
   *       - name: data
   *         description: the product data
   *         in: body
   *         required: true
   *         type: json
   *         schema:
   *           $ref: '#/definitions/ProductData'
   *     produces:
   *       - application/json
   *     responses:
   *       202:
   *         description: the product was updated
   *       404:
   *         description: product not found
   *       500:
   *         description: service is down
   */
  app.patch('/products/:id', productHandler.updateProduct);


  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     description: delete a product
   *     parameters:
   *       - name: id
   *         description: the product id
   *         in: path
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       202:
   *         description: the product was deleted
   *       404:
   *         description: product not found
   *       500:
   *         description: service is down
   */
  app.delete('/products/:id', productHandler.deleteProduct);

```
