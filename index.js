"use strict"
contact()
skiils()
document.documentElement.style.setProperty('--windowWidth',`${window.innerWidth+100}px`)

const EduHeight = document.querySelector('.schoolContent')
const scrollDiv = document.querySelector('.scrollableDiv')
console.log(EduHeight)
scrollDiv.style.setProperty('height', `${ EduHeight.clientHeight}px`)

function contact() {
    const el = document.querySelector('.padding')
    let str = ' padding'
    if (window.innerWidth < 700) {
        str +=  ' dis_C ' + ' full_allign '
    } else {
        str += ' column_equal ' + ' dis_R '
    }
    el.className = str
}

let observer1 = new ResizeObserver(() => {
    skiils()
    contact()
})
observer1.observe(document.querySelector('body'))

function skiils() {
    let sft = document.querySelector('.sft_skill');
    let str = ' sft_skill'
    let ch = [...sft.children]
    const [separe, dR, dC, ce, fl] = [' separe_equal', ' dis_R', ' dis_C', ' column_equal', ' full_allign'];
    if (window.innerWidth < 700) {
        str += dC + ce + fl
        ch[1].style.marginTop = '20px'
        ch[1].style.borderLeft = '0'
    } else {
        str += dR + separe
        ch.forEach(val => {
            val.style.marginTop = '0'
        })
        ch[1].style.borderLeft = 'var(--border_style)'
    }
    sft.className = str;
}


let li = [...document.querySelectorAll('.sf_item')]
let span = [...document.querySelector('.dis_des').children]
let prevClick = -1
li.forEach(val => {
    val.addEventListener('click', () => {
        if (prevClick === li.indexOf(val)) {
            span[prevClick + 1].style.display = 'none'
            span[0].style.display = 'inline-block'
            span[0].scrollIntoView({behavior: "smooth", block: 'start'})
            prevClick = -1
        } else {
            span[prevClick + 1].style.display = 'none'
            prevClick = li.indexOf(val)
            span[prevClick + 1].style.display = 'inline-block'
            span[prevClick + 1].scrollIntoView({behavior: "smooth", block: 'start'})
        }
    })
})


const animation = '1s ease-in 0ms 1 normal forwards'
let logos = [...document.querySelectorAll('.logo_progr')]
addEventListeners()

function createPoint(rectangle) {
    return {
        x: (rectangle.left + (rectangle.width / 2)),
        y: rectangle.top,
    }
}

function transition(val) {
    removeEventListeners()
    let middlePointVal = createPoint(val.getBoundingClientRect())
    let middlePointParent = createPoint(val.parentNode.getBoundingClientRect())

    val.style.transition = 'transform 1s ease-in'
    let x_val = middlePointParent.x - middlePointVal.x
    let y_val = middlePointParent.y - middlePointVal.y
    if(prevClick > -1){
        removeContent(logos.indexOf(val))
        setTimeout(()=>{
            val.style.transform = `translate(${x_val}px, ${y_val}px)`
        },1000)
    }else{
        val.style.transform = `translate(${x_val}px, ${y_val}px)`
        setTimeout(displayConentProgLang(logos.indexOf(val)),1000)
    }
    if (prevClick > -1) {
        setTimeout(() => {
            for (let i of logos) {
                if (i !== val) {
                    i.style.animation = 'appear ' + animation
                }
            }
        }, 1000)
        prevClick = -1
    }

    setTimeout(addEventListeners,1000)
}

function eventHandler(event) {
    let val = event.target
    if (prevClick > -1) {
        transition(logos[prevClick])
    } else {
        for (let i of logos) {
            if (i !== val) {
                i.style.animation = 'dissapear ' + animation
            }
        }

        setTimeout(() => {
            transition(val)
            prevClick = logos.indexOf(val)
        }, 1000)
    }
}
function removeEventListeners(){
    for(let i of logos){
       i.removeEventListener('click',eventHandler)
    }
}
function addEventListeners(){
    for(let i of logos){
        i.addEventListener('click',eventHandler)
    }
}
let pamti = []
function displayConentProgLang(indx){
    let imgProg = findParagraph(indx)
    if(!checkIfHasBeen(pamti,indx)) {
        console.log(1)
        setTimeout(() => {
            imgProg.style.display = 'block'
            imgProg.style.position = 'absolute'
            console.log(imgProg.getBoundingClientRect(), logos[indx].getBoundingClientRect())
            console.log(logos[indx].getBoundingClientRect().bottom - imgProg.getBoundingClientRect().top)
            let val = fix(imgProg,logos[indx])
            imgProg.style.transform = `translate(${val}px ,${logos[indx].getBoundingClientRect().bottom - imgProg.getBoundingClientRect().top}px)`
            imgProg.style.margin = '0px'
        }, 1000)
    }else{
        setTimeout(function(){
            imgProg.style.display = 'block'
        },1000)

    }
    pamti.push(logos[indx])
}
function fix(obj1,obj2){
    let point1 = createPoint(obj1.getBoundingClientRect())
    let point2 = createPoint(obj2.getBoundingClientRect())
    console.log(point1.x,point2.x)
    return point2.x - point1.x
}
function checkIfHasBeen(pamti,indx){
    for(let i of pamti ){
        if(i == logos[indx]){
            return true;
        }
    }
    return false;
}
function removeContent(indx){
    let imgProg = findParagraph(indx)
    console.log(2)
    setTimeout(function(){
        imgProg.style.display = 'none'
    },1000)
}
function findParagraph(indx){
    let el;
    switch (indx){
        case 0 :el= document.querySelector('#jsDesc') ; break;
        case 1 : el =document.querySelector('#cDesc') ; break;
        case 2 : el= document.querySelector('#cppDesc'); break;
        case 3 : el= document.querySelector('#CSS3'); break;
        case 4 : el = document.querySelector('#HTML5'); break;
    }
    return el;
}

// edu height



let {width: pushHobies} = document.querySelector('.wrapperAllHobies').getBoundingClientRect()
let divRel = [...document.querySelectorAll('div[id*="relative"]')]
// if(window.innerWidth < )
if (window.innerWidth > 400) {
    divRel[0].style.setProperty('left', `${pushHobies / 10}px`)
    divRel[2].style.setProperty('left', `-${pushHobies / 10}px`)
} else {
    divRel[0].style.setProperty('left', `${pushHobies / 15}px`)
    divRel[2].style.setProperty('right', `${pushHobies / 15}px`)
}
let sections = [...document.querySelectorAll('section')]
let liMain = [...document.querySelectorAll('.navigation')]
sections = sections.slice(1,sections.length)
liMain.forEach(value =>{
    value.addEventListener('click',()=>{
        let indxMain = liMain.indexOf(value)
        sections[indxMain].scrollIntoView({behavior:"smooth"})
    })
})
let i = 20
const opinionsSec = document.querySelector('.opinionsSec')
const absoluteOpinions = [...document.querySelectorAll('.opinionB')]
const relativeOpinion = document.querySelector('#opinionX')
if(window.innerWidth < 620) {
    absoluteOpinions.forEach(value => {
        value.style.height = `${relativeOpinion.getBoundingClientRect().height}px`
        value.style.transform = `translateY(${i += 100}px)`
    })
    opinionsSec.style.height = `${calculateHeihgt()}px`
}
function calculateHeihgt(){
    let height = opinionsSec.getBoundingClientRect().height
    absoluteOpinions.forEach(value => {
        height+= value.getBoundingClientRect().height
    })
    return height
}
const mainImages = [...document.querySelectorAll('.welcome img')]
const mainImgesCont = mainImages[0].parentNode

let change = (start,end)=>{
    let tmp = start
    start = end
    end = tmp
}
const images = [...document.querySelectorAll('.main_img')]
let nasoka = true ;

// changing background main
setInterval(()=>{
       if(nasoka){
           changeAnimationClassTo(images[2],'positioning','leaving')
           changeAnimationClassTo([images[1],images[0]],'leaving','positioning')
       }else{
           changeAnimationClassTo([images[1],images[0]],'positioning','leaving')
           changeAnimationClassTo(images[2],'leaving','positioning')
       }
       nasoka = !nasoka
},4000)
function changeAnimationClassTo(who,toWhat,removeThis){
    if(Array.isArray(who)){
        who.forEach(val=>{
            val.classList.add(`${toWhat}`)
            val.classList.remove(`${removeThis}`)
        })
    }else{
        console
        who.classList.add(`${toWhat}`)
        who.classList.remove(`${removeThis}`)
    }
}
let op = {
    threshold : 0.8
}
let divProg = document.querySelector('.prog_skll')
const intersectionLogos = new IntersectionObserver((val,op)=>{
    val = val[0]
    if(val.isIntersecting ){
        console.log(val)
        const logos = [...document.querySelectorAll('.logo_progr')]
        logos.forEach(val=>{
            val.classList.add('apperingLogo')
        })
    }
})
intersectionLogos.observe(divProg)
if(window.innerWidth < 700) {
    let namali = -1
    const relativeOp = [...document.querySelectorAll('.relativeOpinions')]
    relativeOp.forEach(val => {
        val.addEventListener('click', () => {
            ischistiClasses()
            if (namali !== relativeOp.indexOf(val)) {
                val.classList.add('zgolemi')
                namali = relativeOp.indexOf(val)
            } else {
                namali = -1
            }

        })
    })
}
function ischistiClasses(){
    relativeOp.forEach(val=>{
        val.classList.remove('zgolemi')
    })
}


