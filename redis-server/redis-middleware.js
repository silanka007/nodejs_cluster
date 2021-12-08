const redisMiddleware = (redisClient) => {
  return async (req, res, next) => {
    switch (req.url) {
      case "/users":
        try {
          console.log("checking redis...");
          const users = await redisClient.get("users");
          if (users) {
            console.log("from redis server...");
            return res.send(users);
          }
          next();
        } catch (error) {
          console.log(error.message);
        }
    }
  };
};

module.exports = redisMiddleware;
