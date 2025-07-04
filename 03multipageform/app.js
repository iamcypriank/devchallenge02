//ui logic


main();

function main(){
    form1(form2);
}




// form1
function form1(callback){
    let form1 = document.createElement('form');
    form1.classList.add('form1');
    form1.innerHTML = `<p class="title">Register</p>
                    <div class="col">
                        <div class="row">
                            <label for="name">Name</label>
                            <input type="text" id="name" placeholder="enter your name" required>
                        </div>
                        <div class="row">
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="example" required>
                        </div>
                    </div>
                    <button >Continue</button>`; 

    document.querySelector('.form-container').appendChild(form1);

    //user input validation
    let form1EL = document.querySelector('.form1');
    form1EL.addEventListener('submit',function(e){
        e.preventDefault();
        let name = form1.querySelector('#name').value.trim();
        let email = form1.querySelector('#email').value.trim();
        if((name!='' && name!=null) && (email!='' && email!=null)){
            user.info.name = name;
            user.info.email = email;    
            document.querySelector('.form-container').innerHTML='';
            callback(form3);        
        } 
    })

};


//form2
function form2(callback){
    let form2 = document.createElement('form');
    form2.classList.add('form2');
    form2.innerHTML = `<h1 class="title">Which topics you are interested in?</h1> 
                <div class="col">
                    <input type="checkbox" name="interest" id="option1" value="Software Development">
                    <label for="option1" class="option">Software Development</label>
                    <input type="checkbox" name="interest" id="option2" value="User Experience"> 
                    <label for="option2" class="option">User Experience</label>
                    <input type="checkbox" name="interest" id="option3" value="Graphic Design">
                    <label for="option3" class="option">Graphic Design</label>
                </div>
                <button >Continue</button>`;
                
    document.querySelector('.form-container').appendChild(form2);  
    
    let form2El = document.querySelector('.form2');
    form2El.addEventListener('submit',function(e){
        e.preventDefault();
        let data = [];
        let interests = form2El.querySelectorAll('input[type="checkbox"]:checked');
        interests.forEach(interest => {
            if(interest.value!='' && interest.value!=null){
                data.push(interest.value);
            }
        });
        if(data.length>0){
            data.forEach((item)=>{
                user.interests.push(item)
            })

            //
             document.querySelector('.form-container').innerHTML='';
             callback();
        }
    });

}

//form3
function form3(){
    let form3 = document.createElement('form');
    form3.classList.add('form3');
    let responseText = '';

    for (let key in user.info) {
        responseText += `<p class="text">${key}: ${user.info[key]}</p>`;
    }

    responseText += `<p class="text">Interests:</p>`;
    user.interests.forEach(interest => {
        responseText += `<p class="text">- ${interest}</p>`;
    });
    responseText +=`<button>Confirm</button>`;
    form3.innerHTML = responseText;
    document.querySelector('.form-container').appendChild(form3);
    form3.addEventListener('submit',function(e){
        e.preventDefault();
        alert('form submitted succeffully!');
        document.querySelector('.form-container').innerHTML='<p>Thank You for wasting your time!</p>';
    });

}


//logic
let user = {
    info : {
        name : '',
        email : ''
    },
    interests : [],
}
