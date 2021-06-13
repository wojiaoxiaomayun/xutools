
export default class ScrollTool{
    private handleScroll:any;
    private dom:HTMLElement = document.body;
    constructor(dom:HTMLElement,callBack:Function){
        this.init(dom,callBack);
    }

    private init(dom:HTMLElement = document.body,callBack:Function = () => {}):void{
        this.dom = dom;
        this.handleScroll = (el:HTMLElement,ev:Event) => {
            callBack && callBack.apply(this.dom,[this.dom.scrollTop,(this.dom.scrollTop + this.dom.clientHeight) >= this.dom.scrollHeight])
        }
        this.dom.addEventListener('scroll',this.handleScroll);
    }

    public destroy():void{
        this.dom.removeEventListener('scroll',this.handleScroll);
    }
}