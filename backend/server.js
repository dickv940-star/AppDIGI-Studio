const express = require("express");

const app = express();

app.get("/",(req,res)=>{
res.send("AppDIGI API aktif");
});


app.listen(3000);
