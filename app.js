const search_form = document.querySelector('.search_form ');
const search_input = document.querySelector('.search_input')


let url = 'https://api.github.com/users/'


search_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    userData(search_input.value)

})

function userData(username){
    fetch(url+username)
    .then(response =>{
        if(response.ok){
            return response.json()
        }else{
            info.innerHTML= 'Something went to wrong ):'
        }
    })
    .then( data =>{
        console.log(data)

        let output = `

        <div class="img">
        <img src = '${data.avatar_url}' >
        </div>

        <div class="user_data">

            <h2>${data.name} </h2>
            <p>${data.bio}</p>
            <ul>
                <li> <b>${data.followers} </b>   <strong>Followers </strong></li>
                <li> <b>${data.following} </b>   <strong> Following</strong> </li>
                <li> <b>${data.public_repos} </b> <strong>  Repositories   </strong>  </li>
            </ul>


            <div class="repo">

            </div>

        </div>
    `

    document.querySelector('.wrapper').innerHTML = '<div class="info"></div>';
    const info= document.querySelector('.info');
    info.innerHTML= output;
    let imageWidth = document.querySelector('.img').clientWidth
    let image= document.querySelector('img')
    image.style.cssText = `height : ${imageWidth}px`;
    search_input.value= '';
    userRepo(username)


    })

    .catch(err =>{
        info.innerHTML='Some thing went be wrong ): <br > Error : ' + err
    })


    
}


function userRepo(username){
    fetch(url + username + "/repos")
    .then(response =>{
        if(response.ok){
           return response.json()
        }else{
            info.innerHTML= 'Something went be wrong ): <br> Maybe you have given wrong username ! '
            

        }
    })
     .then(data=>{
         console.log(data)
         let repos = ''
        for(let i = 0 ;  i < data.length;i++ ){
             repos += `<a href ="${data[i]. html_url}" > ${data[i].name} </a>`

        }
        document.querySelector('.repo').innerHTML = repos


     })
     .catch(error => {
        info.innerHTML = 'Something went Wrong :) <br> Error: ' + error
    })



}

window.addEventListener('resize', function(){
    if(document.querySelector('img')){
        let imageWidth= document.querySelector('.img').clientWidth;
        let image = document.querySelector('.img')
        image.cssText =`height : ${imageWidth}px`


    }

})



