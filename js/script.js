class TagList{

    constructor(){
        this.list = document.querySelector('.tags-area')
        this.checkbox = document.querySelector('.readonly-switch')
        this.inputTagName = document.querySelector('.add-tag_input')
    }

    getList(){

        for(let tag of this.list.children){
            console.log(`${tag.id}:${tag.textContent}`)
        }
    }

    setList(arr){

        let tagList = [...arr]
        this.list.innerHTML = ''
        for(let tag of tagList){
            this.addTag(tag)
        }
    }

    addTag(str){
        let currentId = '0'

        for(let tag of str.split(/[, ]+/)){
            if (this.list.firstElementChild){
                currentId = (parseInt(this.list.firstElementChild.id) + 1)
            }
            if (tag.trim() != ''){
                this.list.insertAdjacentHTML('afterBegin',`<div class="tag" id=${currentId}><p class="tag-text">${tag}</p><button class="tag-button" onclick="tagList.removeTag(${currentId})"><img src="img/trash.svg"></button></div>`)
            }
            else{
                continue
            }
        }
        this.inputTagName.value = ''
    }

    removeTag(id){

        for (let tag of this.list.children){
            if (tag.id == id || tag.textContent === id){
                tag.remove()
                break
            }
        } 
    }
    setReadonly(bool){
        this.checkbox.checked = bool

        document.querySelector('.add-tag_button').disabled = bool
        document.querySelector('.add-tag_input').disabled = bool
        for(let tag of document.querySelectorAll('.tag-button')){
            tag.disabled = bool
        }
    }
    getReadonly(){
        return this.checkbox.checked
    }

}

let tagList = new TagList()
let newStorage = window.localStorage

if(newStorage.getItem('tagList')){
    tagList.list.innerHTML = newStorage.getItem('tagList')
}

if(newStorage.getItem('readonlyMode')){
    tagList.setReadonly(JSON.parse(newStorage.getItem('readonlyMode')))
}
else{
    newStorage.setItem('readonlyMode', tagList.checkbox.checked)
}

const tagListObserver = new MutationObserver(()=>{
    newStorage.setItem('tagList', tagList.list.innerHTML)
})
tagListObserver.observe(tagList.list, {childList:true})

tagList.checkbox.addEventListener('change', ()=>{
    newStorage.setItem('readonlyMode', tagList.checkbox.checked)
})