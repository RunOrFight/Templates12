const checkbox = document.querySelector('.readonly-switch')
checkbox.addEventListener('change', function(){
    const addTagBtn = document.querySelector('.add-tag_button')
    const input = document.querySelector('.add-tag_input')
    const tagBtns = document.querySelectorAll('.tag-button')
    addTagBtn.disabled = !addTagBtn.disabled
    input.disabled = !input.disabled 
    // tagBtns.map((elem)=>{
    //     elem.disabled = !elem.disabled
    // })
    for (tagBtn of tagBtns){
        tagBtn.disabled = !tagBtn.disabled
    }
})

function addTag(){
    const tagList = document.querySelector('.tags-area')
    const input = document.querySelector('.add-tag_input')
    let currentId = '0'
    if (tagList.lastElementChild){
        currentId = (parseInt(tagList.lastElementChild.id) + 1)
    }
    if(input.value.trim() != ''){
        tagList.innerHTML += `<div class="tag" id=${currentId}><p class="tag-text">${input.value}</p><button class="tag-button" onclick="removeTag(${currentId})">+</button></div>`
    }
    input.value = ''
}

function removeTag(id){

    const tagList = document.querySelector('.tags-area').children
    for (tag of tagList){
        if (tag.id == id){
            tag.remove()
            break
        }
    } 
   
}

