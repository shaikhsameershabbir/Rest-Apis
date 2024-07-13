import app from './app'

// configuring server to run on specific port 
const startServer = () => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is running  on  http://localhost:${port}`);
    })
}

startServer()