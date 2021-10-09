/**
 * @swagger
 * /api/comment/:postID:
 *   post:
 *     tags:
 *      - Comment
 *     name: Create Comment
 *     summary: Create Comment
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
 * /api/comment/:postID/:commentID:
 *   put:
 *     tags:
 *      - Comment
 *     name: Modify Comment
 *     summary: Modify Comment
 *   delete:
 *     tags:
 *      - Comment
 *     name: Delete Comment
 *     summary: Delete Comment
 */
