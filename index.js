import './src/mongo/config.js';

import { PORT } from './src/utils/env.js';
import app from './src/app.js';

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
