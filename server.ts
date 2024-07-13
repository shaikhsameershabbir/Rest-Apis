import app from './app'
import { config } from './src/config/config';

// configuring server to run on specific port 
const startServer = () => {
    const port = config.port || 3000
    app.listen(port, () => {
        console.log(`Server is running  on  http://localhost:${port}`);
    })
}

startServer()