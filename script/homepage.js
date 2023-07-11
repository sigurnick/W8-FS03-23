const allPlayButton = document.querySelectorAll('.play-button')
const allCards = document.querySelectorAll('.card')


//diaply play button on mouseover
allCards.forEach((e,i)=>{
  
    e.addEventListener('mouseover',function(){
        
        allPlayButton[i].classList.remove('d-none')
    })

    e.addEventListener('mouseout',function(){
        allPlayButton[i].classList.add('d-none')
    })
})

