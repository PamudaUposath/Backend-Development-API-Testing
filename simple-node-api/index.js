const express=require('express');
const app=express();
const PORT=3000;

app.use(express.json());

let users=[{id:1,name:'Pamuda'},{id:2,name:'Nisal'},];


// Get all users
app.get('/api/users',(req,res)=>{
    res.json(users);
});

// Get a user by ID
app.get('/api/users/:id',(req,res)=>{
    const user=users.find(u=>u.id===parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    res.json(user);
});

// Create a new user
app.post('/api/users',(req,res)=>{
    const newUser = {
        id:users.length+1,
        name:req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/api/users/:id',(req,res)=>{
    const user=users.find(u=>u.id===parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    user.name=req.body.name;
    res.json(user);
});

// Delete a user
app.delete('/api/users/:id',(req,res)=>{
    users=users.filter(u=>u.id!==parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

