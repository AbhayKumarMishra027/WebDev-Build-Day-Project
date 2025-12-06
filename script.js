const input = document.getElementById("quoteInput");
const saveBtn = document.getElementById("saveBtn");
const quotesList = document.getElementById("quotesList");
const randomBtn = document.getElementById("randomBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

function updateStorage(){
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function renderQuotes(){
    quotesList.innerHTML = "";
    quotes.forEach((text,i)=>{
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = text;

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.className = "icon-btn";
        editBtn.onclick = () => {
            let updated = prompt("Edit quote:", text);
            if(updated && updated.trim()){
                quotes[i] = updated.trim();
                updateStorage();
                renderQuotes();
            }
        };

        let delBtn = document.createElement("button");
        delBtn.innerHTML = "❌";
        delBtn.className = "icon-btn";
        delBtn.onclick = () => {
            quotes.splice(i,1);
            updateStorage();
            renderQuotes();
        };

        let box = document.createElement("div");
        box.appendChild(editBtn);
        box.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(box);
        quotesList.appendChild(li);
    });
}

saveBtn.onclick = () => {
    if(!input.value.trim()) return;
    quotes.push(input.value.trim());
    input.value = "";
    updateStorage();
    renderQuotes();
};

randomBtn.onclick = () => {
    if(!quotes.length) return;
    alert("🎲 " + quotes[Math.floor(Math.random()*quotes.length)]);
};

clearAllBtn.onclick = () => {
    if(confirm("Delete all quotes?")){
        quotes = [];
        updateStorage();
        renderQuotes();
    }
};

renderQuotes();
