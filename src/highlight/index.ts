interface Options {
    ignoreCase:boolean,
    startTag:string,
    endTag:string
}

const HighLight = (obj:object,particiles:Array<string> = [],options:Options | undefined) => {
    let dOptions:Options = {
        ignoreCase:options?.ignoreCase || true,
        startTag:options?.startTag || '<em>',
        endTag:options?.endTag || '</em>'
    }
    let regStr = `/(${particiles.join('|')})/${dOptions.ignoreCase?'i':''}g`
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
            }else{
                target[key] = HighLight(target[key],particiles,options);
            }
            return value;
        }
    })
}
export default HighLight;