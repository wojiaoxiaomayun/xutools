let URLParse = (url?:string):URL => {
    url = url ?? window.location.href;
    return new URL(url);
}

export default URLParse;