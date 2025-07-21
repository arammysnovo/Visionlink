// Selecionando os elementos
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

// Adicionando um event listener para alternar a classe 'active' ao clicar no menu
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    // Você pode adicionar mais lógicas aqui, como animar o menu ou mudar o ícone do botão
});
