
//Abrir o cerrar menú hamburguesa
const buttonBurger = document.getElementById("button-burger");
const optionsMenu = document.getElementById("main-navigation");

buttonBurger.addEventListener("click",() => {
    //toogle - añade o elimina la clase dependiendo si existe (devuelve boolean)
    const isOpen = optionsMenu.classList.toggle("nav__menu--open"); 
    buttonBurger.setAttribute("aria-expanded", isOpen);

    if(isOpen){
        buttonBurger.textContent = "X";
    }else{
        buttonBurger.textContent = "☰";
    }
});

//Cerrar el menú al pulsar un enlace
const menuLinks = optionsMenu.querySelectorAll(".nav__link");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        optionsMenu.classList.remove("nav__menu--open");
        buttonBurger.textContent = "☰";
        buttonBurger.setAttribute("aria-expanded", false);
    });
});


