var express = require("express")
var router = express.Router()


const credentials = {
    email: "nasi@gmail.com",
    password: "1234"
}

//login router
router.post('/login', (req, res) => {
    if (req.body.email == credentials.email && req.body.password == credentials.password) {
        req.session.user = req.body.email
        res.cookie("password", req.body.password);
        res.redirect('/route/dashboard');
        // res.end("Sucess")
    } else {
        res.render('base',{logout : "Invalid Username or Password"})
    }
})


// dashboard router
router.get('/dashboard', (req,res)=>{
    if(req.session.user && req.cookies.password == credentials.password){

        res.render('dashboard',{user:req.session.user, title: "Dashboard"})
    } else {
        res.render('base',{logout : "Please login to continue"}) 
    }
})


// route for logout
router.get('/logout', (req,res)=>{
            req.session.destroy((err)=>{
                res.clearCookie('password');
                res.redirect('/')
            // if(err){
            //     console.error('Error destroying session:', err);
            //     res.send("Error")
            // } else {
                
            //     res.render('base',{logout : "Logout Successful"})
            // }
            
    })
})

module.exports = router;