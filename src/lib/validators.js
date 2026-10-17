export const validUrl=u=>{try{const x=new URL(u);return ['http:','https:'].includes(x.protocol)}catch{return false}};
