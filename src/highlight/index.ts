interface Options {
    ignoreCase?:boolean,
    startTag?:string,
    endTag?:string
}

const HighLight = (obj:object | string | number | undefined,particiles:Array<string> = [],options?:Options) => {
    if(obj === undefined){
        return obj;
    }
    let dOptions:Options = {
        ignoreCase:options?.ignoreCase || true,
        startTag:options?.startTag || '<em>',
        endTag:options?.endTag || '</em>'
    }
    let reg:RegExp = new RegExp(`(${particiles.sort((a,b) => (b?.length ?? 0) - (a?.length ?? 0)).join('|')})`,`${dOptions.ignoreCase?'i':''}g`) 

    if(typeof obj == 'string' || typeof obj == 'number'){
        return (<string>obj).replace(reg,`${dOptions.startTag}$1${dOptions.endTag}`);;
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
                return (<string>value).replace(reg,`${dOptions.startTag}$1${dOptions.endTag}`);
            }else{
                target[key] = HighLight(target[key],particiles,options);
                return target[key];
            }
        }
    })
}
export default HighLight;