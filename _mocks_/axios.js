const axios = {
  get: () => {
    return Promise.resolve({
      data: [
        {
          name: "Bananas",
          country: "Colombia",
          cost: 1,
          instock: 4,
          id: 10,
        },
      ],
    });
  },
};

module.exports = axios;
