const fs = require('fs');
exports.stat = (path) =>{
    try {
        const stat = fs.stat(path,(err, stats)=>{
            console.log(stat);
        });

        return stat;
    }catch (e){
        return false;
    }
}
exports.mkdir = (path) => {
    try {
        fs.mkdir(path,(error)=>{
            if (error){
                // console.log("Create failed");
            }else {
                console.log("Created successful");
            }
        });
    }catch (e){
        console.log(e);
        return false;
    }
}
return module.exports;