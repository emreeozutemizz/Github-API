// Elementleri Seçme

const githubform = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Gıthub();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubform.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin");
    }
    else {

        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not found"){
                //Hata Mesajı
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{
                ui.addSerachedUserToUI(username);
                Storage.addSerachedUserToStorage(username);
                ui.showUserInfo(response.user); 
                ui.showRepoInfo(response.repo);
            }

        })
        .catch(err => ui.showError(err));
    }


    ui.clearInput(); //Input temizle
    e.preventDefault();
}
function clearAllSearched(){
    //Tüm aramaları temizle
    if (confirm("Emin misiniz ?")){
        Storage.clearAllSerachedUsersFromStorage(); // Storageden Temizleme
        ui.clearAllSearchedFromUI();

    }
}
function getAllSearched(){
    //Arananları Storageden al ve UI'ye ekle
}