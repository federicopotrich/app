let vers;


fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(res=>{
    return res.json()
}).then(res=>{
    vers = res[0]
    console.log('vers: '+vers)
    
    let divTMP = document.createElement('div')
    let title = document.createElement('h1')
    title.innerText = 'Skins for all champ'
    let form = document.createElement('form')
    let txtSearch = document.createElement('input')
    form.append(title)

    txtSearch.setAttribute('type', 'text')
    txtSearch.setAttribute('list', 'l')
    txtSearch.setAttribute('placeholder', 'Write something to search')


    let btn = document.createElement('input')

    btn.setAttribute('type', 'submit')
    btn.setAttribute('value', 'Search')
    
    let refresh = document.createElement('i')
    refresh.innerHTML = '<i class="fa-solid fa-rotate-right"></i>'
    
    let divExtendedResearch = document.createElement('div')
    
    divExtendedResearch.classList.add('d-flex')
    divExtendedResearch.classList.add('flex-row')

    let label = document.createElement('label')

    label.setAttribute('for', 'isChroma')
    label.innerText = 'Chroma'

    let chx = document.createElement('input')

    chx.setAttribute('type', 'checkbox')
    chx.setAttribute('id', 'isChroma')
    
    divExtendedResearch.append(label)
    divExtendedResearch.append(chx)
    
    divTMP.append(txtSearch)
    divTMP.append(btn)
    divTMP.append(refresh)
    
    form.append(divTMP)
    form.append(divExtendedResearch)
    
    document.body.append(form)
    
    btn.addEventListener('click', (event)=>{
        event.preventDefault()
        
        if(txtSearch.value.trim() != ""){
            let l = document.querySelectorAll('h1')
            
            l.forEach(element => {
                if(element.getAttribute('class') === 'nothing'){
                    element.remove()
                }
            });
            
            
            let ctr = 0
            let allDiv = document.querySelectorAll('.comune')
            
            allDiv.forEach(element => {
                let idDiv = document.getElementById(`${element.getAttribute('id')}`)
                idDiv.style.display = "flex"
            });
            let skinsArr = document.querySelectorAll('.divPerSkin')
            skinsArr.forEach(el => {
                if(!el.innerHTML.includes('chroma')){
                    el.style.display = "flex"
                }
            });
            if(chx.checked){
                allDiv.forEach(element => {
                    let skinBelle = element.querySelector('.skins')
                    if(!skinBelle.innerHTML.includes('chroma '+ txtSearch.value.toLocaleLowerCase())){
                        let idDiv = document.getElementById(`${element.getAttribute('id')}`)
                        idDiv.style.display = "none"
                        
                        ctr++;
                    }else{
                        let skinsArr = skinBelle.querySelectorAll('.divPerSkin')
                        skinsArr.forEach(el => {
                            if(!el.innerHTML.includes('chroma')){
                                el.style.display = "none"
                            }
                        });
                    }
                });
            }else{
                allDiv.forEach(element => {
                    let tmpctr = 0;
                    //console.log(element)
                    //console.log(element.querySelectorAll('.divPerSkin'))
                    if(!element.innerHTML.toLocaleLowerCase().includes(txtSearch.value.toLocaleLowerCase())){
                        let idDiv = document.getElementById(`${element.getAttribute('id')}`)
                        idDiv.style.display = "none"
                        ctr++;
                    }else{
                        let skinBelle = element.querySelectorAll('.divPerSkin')
                        skinBelle.forEach(el => {
                            skinBelleText = el.querySelector('h3')
                            if(skinBelleText.innerText.toLocaleLowerCase().includes(txtSearch.value.toLocaleLowerCase())){
                                //console.log(skinBelleText.innerText)
                                //console.log(document.querySelector(el.getAttribute('id')))
                                document.getElementById(el.getAttribute('id')).style.display = 'flex'
                            }else{
                                document.getElementById(el.getAttribute('id')).style.display = 'none'
                                tmpctr++;
                            }
                        });
                        
                    }
                    if(tmpctr == element.querySelectorAll('.divPerSkin').length){
                        document.getElementById(element.getAttribute('id')).style.display = 'none'
                    }
                });
                
            }

            if(ctr >= allDiv.length){
                let non = document.createElement('h1')
                non.classList.add('nothing')
                non.innerHTML = `I couldn't find anything <i class="fa-solid fa-face-sad-cry"></i>` 
                document.body.append(non)
            }
            
        }
    })
    fetch(`http://ddragon.leagueoflegends.com/cdn/${vers}/data/en_US/champion.json`).then(res=>{
        return res.json();
    }).then(response=>{
        let d = document.createElement('datalist')
        d.id = 'l'
        
        let champs = response.data;
        document.body.append(d)
        for (var champName in champs) {
            //console.log(champs[champName].name);
            createContainerSkinChamp(champs[champName].name)
            
        }
        refresh.addEventListener('click', (event)=>{
            event.preventDefault()
            //let tuttiDiv = document.querySelectorAll('div')
            
            //console.log(document.getElementsByTagName('div'))
            
            for (let i = 2; i < document.getElementsByTagName('div').length; i++) {
                let e = (document.getElementsByTagName('div'))[i];
                e.style.display = 'flex'
            }
        })
    })
})
function createContainerSkinChamp(nameChamp){
    //https://ddragon.leagueoflegends.com/cdn/img/champion/splash/CHAMPNAME_NUM.jpg <-- link per skin splash

    let h1TitleName = document.createElement('h1')
    h1TitleName.innerText = nameChamp

    //sostituzione nomi particolari
    nameChamp = nameChamp.replace(" ", "")
    nameChamp = nameChamp.replace("'", "")
    nameChamp = nameChamp.replace(".", "")
    nameChamp = nameChamp.replace("Nunu& Willump", "Nunu")
    nameChamp = nameChamp.replace("LeBlanc", "Leblanc")
    nameChamp = nameChamp.replace("KhaZix", "Khazix")
    nameChamp = nameChamp.replace("ChoGath", "Chogath")
    nameChamp = nameChamp.replace("KaiSa", "Kaisa" || "Kaisa", "Kaisa")
    nameChamp = nameChamp.replace("VelKoz", "Velkoz")
    nameChamp = nameChamp.replace("Renata Glasc", "Renata")
    nameChamp = nameChamp.replace("RenataGlasc", "Renata")
    nameChamp = nameChamp.replace("Dr.Mundo", "DrMundo")

    nameChamp = nameChamp.replace("Wukong", "MonkeyKing")
    nameChamp = nameChamp.charAt(0).toUpperCase() + nameChamp.substring(1)
    
    let option = document.createElement('option')
    option.innerText = nameChamp

    document.querySelector('datalist').append(option)

    //creazione div con id del nome
    
    let div = document.createElement('div')
    div.setAttribute('id', nameChamp)
    div.classList.add('comune')
    div.append(h1TitleName)
    let hr = document.createElement('hr')

    div.append(hr)
    fetch(`http://ddragon.leagueoflegends.com/cdn/${vers}/data/en_US/champion/${nameChamp}.json`).then(res=>{ // <-- link info per champ
        return res.json()
    }).then(data=>{
        let champs = data.data
        //console.log(champs)
        
        for (var champName in champs) {
            //console.log(champs[champName].name);
            let skins = champs[champName].skins
            
            let divSkin = document.createElement('div')
            divSkin.classList.add('skins')
            h1TitleName.setAttribute('title', `This champ has ${skins.length} different ${(tmp = skins.length > 1 ? 'skin' : 'skins')}`)
            
            h1TitleName.addEventListener('click', (event)=>{
                event.preventDefault()
                let page = window.open('infoPage.html')
        
                page.onload = function(){
                    page.document.querySelector('html').innerHTML =`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"><link rel="stylesheet" href="css/style.css">
                        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.css' integrity='sha512-4wFGk961cJS2gpSfzy1vU+R8Q93foZOoGgfEDetiClOqNvggdtnRpdCsAgfm8VU9mKkv2unla8RBYwA6hoFwqg==' crossorigin='anonymous'/>
                        <link rel="shortcut icon" href="http://ddragon.leagueoflegends.com/cdn/${vers}/img/champion/${champs[champName].name}.png">
                        <link rel="stylesheet" href="css/secondStyle.css">
                        <title>${champs[champName].name} infos</title>
                    </head>
                    <body>
                        ${giveChamp(vers, champs[champName]).innerHTML}
                        <script src="js/FileSaver.min.js"></script>
                        <script src="js/infosChamp.js"></script>
                    </body>
                    </html>
                    `
                };
            })
            skins.forEach(element => {
                if(champName === 'Fiddlesticks' && element.num === 9){
                    nameChamp = nameChamp.replace('Fiddlesticks', 'FiddleSticks')
                }

                let divPerSkin = document.createElement('div')
                divPerSkin.classList.add('divPerSkin')

                let nameChampSkin = document.createElement('h3')
                element.name.replace('default', 'default skin')
                
                if(element.chromas){
                    let divChroma = document.createElement('div')
                    divChroma.classList.add('chroma')
                    divChroma.classList.add(nameChamp.toLocaleLowerCase())
                    
                    divChroma.innerHTML = `<i class="fa-solid fa-palette"></i>`

                    divChroma.setAttribute('title', 'Is available the chroma for this skin')
                    divPerSkin.append(divChroma)
                }

                if(element.name === 'default'){
                    nameChampSkin.innerText = element.name + ' ' + nameChamp
                    divPerSkin.id = element.name + nameChamp
                }else{
                    nameChampSkin.innerText = element.name
                    divPerSkin.id = element.name
                }

                divPerSkin.append(nameChampSkin)

                let img = document.createElement('img')
                img.setAttribute('src', `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nameChamp}_${element.num}.jpg`)
                //console.log(img)
                img.setAttribute('title', 'Tap two times to save this image')
                img.addEventListener('dblclick', (event)=>{
                    event.preventDefault()
                    //controllare se il dispositivo è un up oppure no
                    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                        saveAs(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nameChamp}_${element.num}.jpg`, element.name)
                    }else{
                        saveAs(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nameChamp}_${element.num}.jpg`, element.name)
                    }
                })
                

                divPerSkin.append(img)
                divSkin.append(divPerSkin)
            
                
            });
            div.append(divSkin)
        }
    })
    document.querySelector('body').append(div)
}