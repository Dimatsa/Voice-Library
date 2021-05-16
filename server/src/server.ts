import app from "./app";
import { port } from "./config";
import database from "./database";

database()
  .then((db) => {
    console.log('MongoDB connected to database "' + db.databaseName + '"');
  })
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
