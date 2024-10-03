const listeCom=[];
let nb=0;
const one =  {id:1,message : "youhou", auteur: "Me",nb};
const two =  {id:2,message : "yurk", auteur: "Also Me",nb};
listeCom.push(one, two);

module.exports.list = ()=>{ 
    return listeCom;
};

module.exports.add = (message,auteur) => { 
    const user= {id:listeCom.length+1,message,auteur,nb};
    return listeCom.push(user);
};

module.exports.like = (id) => { 
    for(el of listeCom){ 
        if(el.id==id){ 
            el.nb++;
        }
    }
};


