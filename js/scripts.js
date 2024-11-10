
const togglePassword = document.querySelector('.toggle-password');
const passwordField = document.getElementById('contrasena');
const iconoOjo=document.getElementById("icono-ojo");
togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    if (type === 'text') {
        iconoOjo.setAttribute("d", "M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5C21.3 7.6 17 4.5 12 4.5zM12 17a5 5 0 110-10 5 5 0 010 10zM12 8a4 4 0 100 8 4 4 0 000-8z");
    } else {
        iconoOjo.setAttribute("d", "M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5C21.3 7.6 17 4.5 12 4.5zM12 17a5 5 0 110-10 5 5 0 010 10z");
    }
});
