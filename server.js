const app = require("./src/app");
const { PORT } = require("./utils/index");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

