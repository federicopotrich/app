function giveChamp(vers, champ) {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')

    h1.innerText = champ.id
    h1.classList.add('text-center')
    div.append(h1)

    let img = document.createElement('img')
    img.classList.add('imgIcon')
    img.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/${vers}/img/champion/${champ.id}.png`)
    let divTmp = document.createElement('div')
    divTmp.setAttribute('class', 'd-flex justify-content-center')
    
    divTmp.append(img)
    div.append(divTmp)

    divTmp = document.createElement('div')
    divTmp.classList.add('quote')
    divTmp.classList.add('d-flex')
    divTmp.classList.add('justify-content-center')

    divTmp.innerHTML = '<h1>QUOTES: </h1>'
    let quote = document.createElement('q')
    quote.innerText = champ.lore
    divTmp.append(quote)
    
    div.append(divTmp)


    let passive = champ.passive
    divTmp = document.createElement('div')
    divTmp.innerHTML = `<h1 class="pTitle">↓ Passive ↓</h1>
    <div class="passive">
        <h3>${passive.name}</h3>
        <img src="http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${passive.image.full}">
    </div>
    `
    div.append(divTmp)

    divTmp = document.createElement('div')
    let abilitiesTitle = document.createElement('h1')
    abilitiesTitle.innerText = '↓ ABILITIES ↓'
    abilitiesTitle.classList.add('titoloAbb')
    divTmp.append(abilitiesTitle)
    divTmp.classList.add('abilies')
    let hr = document.createElement('hr')
    divTmp.append(hr)

    let fieldAbb = document.createElement('div')
    fieldAbb.classList.add('spell')
    

    
    let spells = champ.spells
    let ctr = 0;

    spells.forEach(element => {
        ctr++;
        let divPiccolo = document.createElement('div')
        divPiccolo.classList.add(element.id.substring((element.id.length)-1))
        divPiccolo.classList.add('ability')
        let h1 = document.createElement('h1')
        
        switch (ctr) {
            case 1:
                h1.innerText = element.name + " → Q"
            break;
            case 2:
                h1.innerText = element.name + " → W"
            break;
            case 3:
                h1.innerText = element.name + " → E"
            break;
            default:
                h1.innerText = element.name + " → R"
            break;
        }
        divPiccolo.append(h1)
        hr = document.createElement('hr')
        divPiccolo.append(hr)

        let imgSpell = document.createElement('img')
        imgSpell.setAttribute('src', `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${element.image.full}`)
        divPiccolo.append(imgSpell)

        let h3 = document.createElement('h3')
        h3.innerHTML = element.description
        divPiccolo.append(h3)

        h3 = document.createElement('h3')
        h3.innerText = 'Cooldown: [ '+ element.cooldownBurn + ' ]'
        hr = document.createElement('hr')

        divPiccolo.append(h3)
        divPiccolo.append(hr)
        fieldAbb.append(divPiccolo)
    });

    divTmp.append(fieldAbb)
    div.append(divTmp)

    return div
}