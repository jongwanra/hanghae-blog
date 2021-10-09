/**
 * @swagger
 *  /write:
 *   get:
 *     tags:
 *       - Index
 *     name: Move to Writing Page
 *     summary: Move to Writing Page
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 *
 * /detail/:postID:
 *   get:
 *     tags:
 *       - Index
 *     name: Move to Detail Page
 *     summary: Move to Detail Page
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 * /modify/:postID:
 *   get:
 *     tags:
 *       - Index
 *     name: Move to Modify Page
 *     summary: Move to Modify Page
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 * /login:
 *   get:
 *     tags:
 *       - Index
 *     name: Move to Login Page
 *     summary: Move to Login Page
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 * /register:
 *   get:
 *     tags:
 *       - Index
 *     name: Move to Login Page
 *     summary: Move to Login Page
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 * /:
 *   get:
 *     tags:
 *      - Index
 *     name: Move to Main Page
 *     summary: Move to Main Page
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             type:
 *               type: string
 *             address:
 *               type: string
 *           example:
 *             name: schoolOne
 *             type: High
 *             address : gangnam
 *
 *     responses:
 *       '200':
 *         description: Register one School
 *       '404':
 *         fail
 */
