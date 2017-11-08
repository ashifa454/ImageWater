sharp=require('sharp');
const fs=require('fs');
resizeImageWithMid=()=>{
    fs.readdir('./Source',(err,files)=>{
        if(err)
            console.log(err);
        else if(files.length>1){
            files.forEach(file=>{
                sharp('./Source/'+file)
                .resize(1280,720)
                .overlayWith('./assets/logoMid.png',{gravity:sharp.gravity.center})
                .toFile('./MIDWAY/'+file,(err,info)=>{
                    if(err){
                        console.log(file+" "+err);
                    }else{
                        console.log(file+" RESIZED "+file);
                    }
                })
            })
        }
    })
}
generateFinalWithWaterMark=()=>{
    fs.readdir('./MIDWAY',(err,files)=>{
        if(err)
            console.log(err);
        else{
            files.forEach(file=>{
                sharp('./MIDWAY/'+file)
                .overlayWith('./assets/logoBottom.png',{gravity:sharp.gravity.southeast})                
                .toFile('./OUTPUT/'+file,(err,info)=>{
                    if(err){
                        console.log(file+" "+err);
                    }else{
                        console.log(file+" GENERATED "+file);
                    }
                })
            })
        }
    })
}
args=process.argv.splice(2);
    switch(args[0]){
        case 'MID':
            resizeImageWithMid();
        break;
        case 'OUT':
            generateFinalWithWaterMark();
        break;
        default:
        console.log(val);
        break;
    }
