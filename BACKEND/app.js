const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb+srv://vishnuprakash572:HjN3M3n6xwelC3BX@auxify.caita.mongodb.net/?retryWrites=true&w=majority&appName=AuxiFy";

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

//  Configure DB
mongoose.connect(mongoUrl).then(() => {
    console.log(`Database Connected: ✅ Successfully`);
}).catch((e) => {
    console.log(e);
});

// Import User model
require('./appUserDetails');
const User = mongoose.model("UserInfo");

// Basic health check route
app.get('/', (req, res) => {
    res.send({ status: "Started" });
});

// Login API
app.post("/login", async(req, res)=>{
    const {email,password} =req.body;

    const oldUser=await User.findOne({email:email});

    if (!oldUser){
        return res.send({data:"User doesn't exist"})
    }

    if (await bcrypt.compare(password,oldUser.password)){
        const token=jwt.sign({email:oldUser.email}, JWT_SECRET);

        if (res.status(201)){
            return res.send({status:"ok", data:token})
        } else {
            return res.send({error:"error"});
        }
    }
});


// Register API
app.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "User already exists" });
    }

    try {
        await User.create({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
        });
        res.send({ status: "Ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});



// User Data
app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
  
      User.findOne({ email: useremail }).then((data) => {
        return res.send({ status: "Ok", data: data });
      });
    } catch (error) {
      return res.send({ error: error });
    }
  });



app.listen(38345, () => {
    console.log('App is Running');
});