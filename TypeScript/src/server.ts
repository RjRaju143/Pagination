import app from "./app";
import config from "./utils/index";

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
