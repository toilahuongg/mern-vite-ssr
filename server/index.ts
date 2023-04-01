import createServer from './app';
import appConfig from './configs/app.config';

createServer().then((app) => {
  app.listen(appConfig.app.port, () => {
    console.log(`Server is started: http://localhost:${appConfig.app.port}`);
  });
});
