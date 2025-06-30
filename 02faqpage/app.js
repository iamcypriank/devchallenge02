//ui logic



//button effect
let buttonContainerEl = document.querySelector('.button-container');
let prevBtn = '';


//info effect
let faqContainer = document.querySelector('.faq-container');
faqContainer.addEventListener('click',function(e){
    const currenFaqContainer = e.target.closest('.faq');
    if(currenFaqContainer){
        const currentText = currenFaqContainer.querySelector('.text');
        currentText.classList.toggle('show');

    }
});