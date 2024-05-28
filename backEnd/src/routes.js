const express = require('express');

const routes = express.Router();
const users = [{
    id: 1,
    name: 'Guilherme',
    email: 'contato@eclipze.com',
    password: '1234'
}]

routes.post ('/login', (req, res) => {
    const { email, password } = req.body;

    //valida o email e senha passado pelo usuario. 
    const user = users.find(user => user.email === email && user.password === password);
    if (user)
    {
        return res.status(200).json(user);
    }
    
    return res.status(401).json({ message: 'Invalid Credentials'});
});

module.exports = routes;