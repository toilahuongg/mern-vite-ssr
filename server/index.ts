import createServer from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
createServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is started: http://localhost:${PORT}`);
  });
});
