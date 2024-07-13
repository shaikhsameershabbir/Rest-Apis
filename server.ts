import app from './app'
import { config } from './src/config/config';
import { dbConnect } from './src/config/db';

// configuring server to run on specific port 
const startServer = async () => {
    // Connecting to database 
    await dbConnect()
    const port = config.port || 3000
    app.listen(port, () => {
        console.log(`Server is running  on  http://localhost:${port}`);
    })
}

startServer()