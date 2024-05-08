
function Quiz(sorular){ // constractor olusturduk quiz adında
    this.sorular = sorular;
    this.soruIndex = 0;
    this.dogruCevapSayisi = 0
}

Quiz.prototype.soruGetir = function(){
    return this.sorular[this.soruIndex]
}

function Soru(soruMetni,cevapSecenekleri,dogruCevap) //constracter oldugundan buyuk harfle basla 
{
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevapKontrol = function(cevapSecenekleri){ // prototip olsuturduk dısarda tanımlasakta ulasabilirz
    return cevapSecenekleri === this.dogruCevap
}



let sorular =[
    new Soru("1- En sevdiğim renk hangisidir?",{A:"Siyah",B:"Pembe",C:"Mavi",D:"Turkuaz"},"A"),
    new Soru("2- En sevdiğim yemek hangisidir?",{A:"Mantı",B:"Ispanak",C:"Makarna",D:"Et ürünleri(sade)"},"D"),
    new Soru("3- En sevdiğim sporcu hangisidir?",{A:"Lebron James",B:"Rafael Nadal",C:"David Beckham",D:"Sinan Engin"},"A"),
    new Soru("4-Annemin adı ?",{A:"eda"})
];


const quiz = new Quiz(sorular)

const option_list = document.querySelector(".option_list")
const correctIcon ='<div class="icon"><i class="fas fa-check"></i></div>'
const IncorrectIcon ='<div class="icon"><i class="fas fa-times"></i></div>'

document.querySelector(".btn-start").addEventListener("click", function(){
    document.querySelector(".btn-start").classList.add("active")
    document.querySelector(".quiz_box").classList.add("active")
    soruGoster(quiz.soruGetir())
    startTimer(10)
    starttimerLine()
    soruSayisiniGoster(quiz.soruIndex + 1 , quiz.sorular.length)
    document.querySelector(".next_btn").classList.remove("show")
})

function soruGoster(sorular){
    let question = `<span>${sorular.soruMetni}</span>`
    let option = '';

    for(let cevap in sorular.cevapSecenekleri){
        option += 
            `
             <div class="option">
                <span><b>${cevap}</b> : ${sorular.cevapSecenekleri[cevap]}</span>
            </div>
            `
    }
    document.querySelector(".question_text").innerHTML = question
    option_list .innerHTML = option
    const options = option_list.querySelectorAll(".option")

    for(let opt of options) {
        opt.setAttribute("onclick","optionSelected(this)")
    }
}


function optionSelected(options){
    clearInterval(counter)
    clearInterval(counter_line)

   let cevap = options.querySelector("span b").textContent
   let soru = quiz.soruGetir()


   if(soru.cevapKontrol(cevap)){
        options.classList.add("correct")
        options.insertAdjacentHTML("beforeend",correctIcon)
        quiz.dogruCevapSayisi+=1;

   }else{
        options.classList.add("incorrect")
        options.insertAdjacentHTML("beforeend",IncorrectIcon)

   }

   for(let x = 0 ; x < option_list.children.length  ; x++){
        option_list.children[x].classList.add("disabled")  

   }
   document.querySelector(".next_btn").classList.add("show")

}

document.querySelector(".next_btn").addEventListener("click",function(){
    if(quiz.soruIndex +1 != quiz.sorular.length){
        quiz.soruIndex += 1;
        clearInterval(counter)
        clearInterval(counter_line)
        startTimer(10)
        starttimerLine()
        soruGoster(quiz.soruGetir())
        soruSayisiniGoster(quiz.soruIndex + 1 , quiz.sorular.length)
        document.querySelector(".next_btn").classList.remove("show")

    }else{
        clearInterval(counter)
        document.querySelector(".quiz_box").classList.remove("active")
        document.querySelector(".score_box").classList.add("active")
        scoreGoster(quiz.sorular.length , quiz.dogruCevapSayisi )
    }

})

function soruSayisiniGoster(soruSayisi,toplamSoruSayisi){

    let tag = `<span class="badge bg-warning">${soruSayisi} / ${toplamSoruSayisi}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}


function scoreGoster(toplamSoru,dogruCevap){

    let tag =`toplam ${toplamSoru} sorudan ${dogruCevap} tane bildiniz !`
    document.querySelector(".score_box .score_text").innerHTML = tag
}

document.querySelector(".btn_quit").addEventListener("click",function(){window.location.reload()})
document.querySelector(".btn_replay").addEventListener("click",function(){
    quiz.soruIndex = 0
    quiz.dogruCevapSayisi = 0
    document.querySelector(".btn-start").click();
    document.querySelector(".score_box").remove("active")
})

let counter;

function startTimer(time){
   counter = setInterval(timer,1000) // 1 saniyede bir fonk çağırmak için

   function timer(){
    document.querySelector(".time-second").textContent = time
    time--;
    if(time < 0){
        clearInterval(counter)
        document.querySelector(".time_text").textContent = "Süre Bitti !!"
        let cevap = quiz.soruGetir().dogruCevap
        for(let option of document.querySelector(".option_list").children){
            if(option.querySelector("span b").textContent == cevap){
                option.classList.add("correct")
            }
            option.classList.add("disable")
            document.querySelector(".next_btn").classList.add("show")
        }
    }
}
}

function starttimerLine(){
    let line_with = 0 ;
    counter_line = setInterval(timer , 20)
    function timer(){
        line_with+=3
        document.querySelector(".time_line").style.width = line_with + "px"
        if(line_with > 1500){
            clearInterval(counter_line)
        }
    }   
}




