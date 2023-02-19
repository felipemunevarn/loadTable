let nameLoad;

addLoad = () => {
    nameLoad = document.querySelector(".nameLoadCase");
    if (nameLoad.value !== "") {
        addLoadCase();
        addColumnHeader();
        addInput();     
        nameLoad.value = "";
    } else {
        console.log("Error");
    }  
}

addLoadCase = () => {
    let casesTableBodyRef = document.querySelector(".loadCaseTable").getElementsByTagName('tbody')[0];
    let lastValue = 0;
    if (casesTableBodyRef.lastChild.lastChild !== null) {
        lastValue = Number(casesTableBodyRef.lastChild.lastChild.lastChild.value);
    }
    let newRow = casesTableBodyRef.insertRow();
    let newCell = newRow.insertCell();
    let newCell2 = newRow.insertCell();
    let newInput = document.createElement("input");
    newInput.classList.add("factorInput");
    newInput.type = 'number';
    newInput.value = Number(lastValue + 1);
    newCell2.appendChild(newInput);
    newCell.innerHTML = nameLoad.value;
}

addColumnHeader = () => {
    let factorsTableHeadRef = document.querySelector(".factorsTable").getElementsByTagName('thead')[0];
    let existHeaders = factorsTableHeadRef.children[0];
    let newCol = document.createElement("TH");
    newCol.innerHTML = nameLoad.value;
    existHeaders.appendChild(newCol);
}

addInput = () => {
    let factorsTableBodyRef = document.querySelector(".factorsTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < factorsTableBodyRef.children.length; i++) {
        let existRow = factorsTableBodyRef.children[i];
        let newCell2 = existRow.insertCell();
        let newInput = document.createElement("input");
        newInput.classList.add("factorInput");
        newInput.type = 'number';
        newCell2.appendChild(newInput);
    }
}

showOutput = () => {
    let factorsTableBodyRef = document.querySelector(".factorsTable").getElementsByTagName('tbody')[0];
    let casesTableBodyRef = document.querySelector(".loadCaseTable").getElementsByTagName('tbody')[0];
    for (let k = 0; k < factorsTableBodyRef.children.length; k++) {        
    
        let existRow = factorsTableBodyRef.children[k];
        let factorsTableHeadRef = document.querySelector(".factorsTable").getElementsByTagName('thead')[0];
        let existHeader = factorsTableHeadRef.children[0];
        let text = `LOAD COMB ${existRow.firstElementChild.firstElementChild.value}`;
        for (let i = 1; i < existHeader.children.length; i++) {
            if (existRow.children[i].firstElementChild.value !== "") {
                if (text !== `LOAD COMB ${existRow.firstElementChild.firstElementChild.value}`) {
                    text = text + " +";
                }
                text = text + ` ${existRow.children[i].firstElementChild.value} ${existHeader.children[i].innerHTML}`;
            }    
        }
        let output = document.querySelector(".output");
        let newLine = document.createElement("p");
        output.appendChild(newLine);
        newLine.innerHTML = text;

        let text2 = "";

        for (let i = 1; i < existHeader.children.length; i++) {
            if (existRow.children[i].firstElementChild.value !== "") {
                for (let j = 0; j < casesTableBodyRef.children.length; j++) {
                    if(casesTableBodyRef.children[j].children[0].innerHTML === existHeader.children[i].innerHTML){
                        text2 = `${text2} ${casesTableBodyRef.children[j].children[1].children[0].value} ${existRow.children[i].firstElementChild.value }`
                    }                
                }
            }    
        }

        let newLine2 = document.createElement("p");
        output.appendChild(newLine2);
        newLine2.innerHTML = text2;
    }
}

addCombo = () => {
    let factorsTableBodyRef = document.querySelector(".factorsTable").getElementsByTagName('tbody')[0];
    let factorsTableHeadRef = document.querySelector(".factorsTable").getElementsByTagName('thead')[0];
    let newRow = factorsTableBodyRef.insertRow();
    let newCell = newRow.insertCell();
    let newInput = document.createElement("input");
    newInput.type = 'number';
    let numberOfRows = factorsTableBodyRef.children.length;
    newInput.value = Number(factorsTableBodyRef.children[numberOfRows - 2].firstElementChild.firstElementChild.value) + 1;
    newCell.appendChild(newInput);
    for (let i = 1; i < factorsTableHeadRef.children[0].children.length; i++) {
        let newCell = newRow.insertCell();
        let newInput = document.createElement("input");
        newInput.type = 'number';
        newInput.classList.add("factorInput");
        newCell.appendChild(newInput);
    }
}

function copyToClipboard() {
    let str;
    for (let i = 0; i < document.getElementsByClassName('output')[0].children.length; i++) {
        str = str + document.getElementsByClassName('output')[0].children[i].innerText + "\n";
    }
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}