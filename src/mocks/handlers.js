import { rest } from 'msw';

export const handler = rest.get('/api/products', (req, res, ctx) => {
    return res(
        ctx.json({
            data: [
                {
                  name: "Bananas",
                  country: "Colombia",
                  cost: 1,
                  instock: 4,
                  id: 10,
                },
              ],
        })
    )
})