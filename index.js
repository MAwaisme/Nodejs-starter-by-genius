// const express = require('express');
// const users = require("./MOCK_DATA.json");
const http = require('http');

// const app = express();
// const PORT = 8000;

// app?.get('/api/users', (req, res) => {
//     return res?.json(users);
// })

// app?.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users?.find((user) => user?.id === id);
//     return res?.json(user);
// });

// app?.listen(PORT, () => console.log("Server started!"))


const server = http.createServer((req, res) => {
    console.log(req?.url, req.method);

    if (req?.url === '/home') {
        res?.write('Home page');
        return res?.end();
    } else if (req?.url === '/men') {
        res?.write('Men page');
        return res?.end();
    } else if (req?.url === '/women') {
        res?.write('Woman page');
        return res?.end();
    } else if (req?.url === '/cart') {
        res?.write('Cart page');
        return res?.end();
    }

    res.write(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=\, initial-scale=1.0">
            <title>Practice</title>
        </head>

        <body>
            <nav>
                <ul>
                    <li>
                        <a href="home">Home</a>
                    </li>
                    <li>
                        <a href="men">Men</a>
                    </li>
                    <li>
                        <a href="women">Women</a>
                    </li>
                    <li>
                        <a href="cart">Cart</a>
                    </li>
                </ul>
            </nav>
        </body>
        </html>
        `);
    res?.end();
});

server.listen(8000, () => {
    console.log('Server running on 8000.......');
});