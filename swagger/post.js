/**
 * @swagger
 * /api/post/content:
 *   post:
 *     tags:
 *      - Post
 *     name: Add Post
 *     summary: Add Post
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
 * /api/post/content/:postID:
 *   delete:
 *     tags:
 *      - Post
 *     name: Delete Post
 *     summary: Delete Post
 *   put:
 *     tags:
 *      - Post
 *     name: Modify Post
 *     summary: Modify Post
 */
