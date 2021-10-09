/**
 * @swagger
 * /api/like/:postID:
 *   post:
 *     tags:
 *      - Like
 *     name: Add Data of Person Pressed Like
 *     summary: Add Data of Person Pressed Like
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
 *   delete:
 *     tags:
 *       - Like
 *     name: Delete Data of Person Canceled Like
 *     summary: Delete Data of Person Canceled Like
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
 */
