
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { Customers } from "./entity/entities/Customers";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customers API",
      version: "1.0.0",
      description: "API для управління клієнтами",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      schemas: {
        Customers: {
          type: "object",
          properties: {
            customerId: {
              type: "string",
              example: "ALFKI",
            },
            companyName: {
              type: "string",
              example: "Alfreds Futterkiste",
            },
            contactName: {
              type: "string",
              example: "Maria Anders",
            },
            contactTitle: {
              type: "string",
              example: "Sales Representative",
            },
            address: {
              type: "string",
              example: "Obere Str. 57",
            },
            city: {
              type: "string",
              example: "Berlin",
            },
            region: {
              type: "string",
              example: "NULL",
            },
            postalCode: {
              type: "string",
              example: "12209",
            },
            country: {
              type: "string",
              example: "Germany",
            },
            phone: {
              type: "string",
              example: "030-0074321",
            },
            fax: {
              type: "string",
              example: "030-0076545",
            },
          },
          required: ["customerId", "companyName"],
        },
      },
    },
  },
  apis: ["./src/index.ts"], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    const customerRepository = AppDataSource.getRepository(Customers);

    /**
     * @swagger
     * /customers:
     *   get:
     *     summary: Отримати всіх клієнтів
     *     tags: [Customers]
     *     responses:
     *       200:
     *         description: Список клієнтів
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Customers'
     *       500:
     *         description: Внутрішня помилка сервера
     */
    app.get("/customers", async (req, res) => {
      try {
        const customers = await customerRepository.find();
        res.json(customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    /**
     * @swagger
     * /customers/{id}:
     *   get:
     *     summary: Отримати клієнта за ID
     *     tags: [Customers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID клієнта
     *     responses:
     *       200:
     *         description: Інформація про клієнта
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Customers'
     *       404:
     *         description: Клієнт не знайдений
     *       500:
     *         description: Внутрішня помилка сервера
     */
    app.get("/customers/:id", async (req, res) => {
      try {
        const customer = await customerRepository.findOneBy({ customerId: req.params.id });
        if (customer) {
          res.json(customer);
        } else {
          res.status(404).send("Customer not found");
        }
      } catch (error) {
        console.error("Error fetching customer by ID:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    /**
     * @swagger
     * /customers:
     *   post:
     *     summary: Створити нового клієнта
     *     tags: [Customers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Customers'
     *     responses:
     *       201:
     *         description: Клієнт створений
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Customers'
     *       400:
     *         description: Невірний запит
     *       500:
     *         description: Внутрішня помилка сервера
     */
    app.post("/customers", async (req, res) => {
      try {
        const customer = customerRepository.create(req.body);
        const result = await customerRepository.save(customer);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error creating customer:", error);
        res.status(400).send("Bad Request");
      }
    });

    /**
     * @swagger
     * /customers/{id}:
     *   put:
     *     summary: Оновити клієнта
     *     tags: [Customers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID клієнта
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Customers'
     *     responses:
     *       200:
     *         description: Клієнт оновлений
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Customers'
     *       404:
     *         description: Клієнт не знайдений
     *       400:
     *         description: Невірний запит
     *       500:
     *         description: Внутрішня помилка сервера
     */
    app.put("/customers/:id", async (req, res) => {
      try {
        const customer = await customerRepository.findOneBy({ customerId: req.params.id });
        if (customer) {
          customerRepository.merge(customer, req.body);
          const result = await customerRepository.save(customer);
          res.json(result);
        } else {
          res.status(404).send("Customer not found");
        }
      } catch (error) {
        console.error("Error updating customer:", error);
        res.status(400).send("Bad Request");
      }
    });

    /**
     * @swagger
     * /customers/{id}:
     *   delete:
     *     summary: Видалити клієнта
     *     tags: [Customers]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID клієнта
     *     responses:
     *       204:
     *         description: Клієнт видалений
     *       404:
     *         description: Клієнт не знайдений
     *       500:
     *         description: Внутрішня помилка сервера
     */
    app.delete("/customers/:id", async (req, res) => {
      try {
        const result = await customerRepository.delete(req.params.id);
        if (result.affected) {
          res.status(204).send();
        } else {
          res.status(404).send("Customer not found");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));
