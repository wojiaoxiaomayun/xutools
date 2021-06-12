interface Options {
    ignoreCase:boolean,
    startTag:string,
    endTag:string
}

const HighLight = (obj:object,particiles:Array<string> = [],options:Options | undefined) => {
    if(obj === undefined){
        return obj;
    }
    let dOptions:Options = {
        ignoreCase:options?.ignoreCase || true,
        startTag:options?.startTag || '<em>',
        endTag:options?.endTag || '</em>'
    }
    let regStr = `/(${particiles.sort((a,b) => (b?.length ?? 0) - (a?.length ?? 0)).join('|')})/${dOptions.ignoreCase?'i':''}g`
    if(typeof obj == 'string' || typeof obj == 'number'){
        obj = obj + '';
        obj = obj.replace(eval(regStr),`${dOptions.startTag}$1${dOptions.endTag}`);
        return obj;
    }
    
    return new Proxy(obj,{
        get(target, key){
            let value = target[key];
            if(value === undefined){
                return value;
            }
            if(target instanceof Array){
                let tempKey = parseInt(key as string)
                if(isNaN(tempKey)){
                    return value
                }
            }
            const type = typeof value;
            if(type == 'string' || type == 'number'){
                value += '';
                value = value.replace(eval(regStr),`${dOptions.startTag}$1${dOptions.endTag}`);
                return value;
            }else{
                target[key] = HighLight(target[key],particiles,options);
                return target[key];
            }
        }
    })
}
export default HighLight;