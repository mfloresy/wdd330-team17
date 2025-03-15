const modals = document.getElementById('modal')
const button = document.getElementById('callBtn')
const closeButton = document.querySelector('#closeBtn')


button.addEventListener("click", () => {
    modals.style.display = "block";
})

closeButton.addEventListener("click", () => {
    modals.style.display = 'none';
}
)




