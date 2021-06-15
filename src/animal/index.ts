import 'animate.css/animate.min.css';
const AnimateCSS = (element:HTMLElement, animation:string) =>
// We create a Promise and return it
new Promise((resolve, reject) => {
    const animationName = `animate__${animation}`;
    element.classList.add(`animate__animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event:any) {
        event.stopPropagation();
        element.classList.remove(`animate__animated`, animationName);
        resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
});

export {AnimateCSS}