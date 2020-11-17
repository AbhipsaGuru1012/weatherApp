const router=require('express').Router();
const fetch=require('node-fetch');
require('dotenv').config();

router.get("/", (req,res)=>{
    res.render('index', {
        city:null,
        desc:null,
        temp:null,
        icon:null
    });
})

router.post("/", async (req,res)=>{
    const city=req.body.city;
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=${process.env.API_KEY}`
    try{
        await fetch(api_url)
        .then(res=>res.json()) 
        .then(data=>{
            if(data.message==='city not found'){
                res.render('index', {
                    city:data.message,
                    desc:null,
                    temp:null,
                    icon:null
                })
            }else{
                const city=data.name;
                const desc=data.weather[0].description;
                const temp=data.main.temp;
                const icon=data.weather[0].icon;

                res.render('index', {
                    city:city,
                    desc:desc,
                    temp:temp,
                    icon:icon
                })
            }
        });
    }

    catch(err){
        res.render('index', {
            city:'Something went wrong!',
            desc:null,
            temp:null,
            icon:null
        })
    }
    
    

})


module.exports=router;