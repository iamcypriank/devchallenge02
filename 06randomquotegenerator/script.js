import { getRandomQuote } from "./app.js";

window.addEventListener('load',function(){
    main();
})



function main(){
    updateUI();
    document.querySelector('#random').addEventListener('click',()=>{
    updateUI();
    })

    
}

document.querySelector('#share').addEventListener('click',()=>{
        document.querySelector('.modal').style.display = 'flex';
        let x = document.querySelector('.x');
        let shareUrl = encodeURI(window.location.href);
        let shareText = document.querySelector('.quote').textContent;
        let url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`; 
        x.setAttribute('href',url) ;
        x.setAttribute('target','_blank') ;
        
})

document.querySelector('.copy-link').addEventListener('click',function(e){
    navigator.clipboard.writeText(encodeURI(window.location.href));
    alert('link copied');
})

document.querySelector('.close').addEventListener('click',function(e){
    document.querySelector('.modal').style.display = 'none';

})



//this function updates UI
async function updateUI(){
    const data = await getRandomQuote();
    document.querySelector('.container').innerHTML = `
    <div class="info-container">
                <h1 class="author">
                    ${data.author}
                </h1>
                <div class="category">
                    <p class="cat">${data.tags[0]}</p>
                    <p class="cat">${data.tags[1]}</p>
                </div>
            </div>
          <h1 class="quote">"${data.quote}"</h1>
    `;      
}

