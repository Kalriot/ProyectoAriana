function validarFormulario() {
    const lugar = document.getElementById('lugar').value;
    const descripcion = document.getElementById('descripcion').value;

    if (lugar.trim() === '' || descripcion.trim() === '') {
        alert('Por favor, completa todos los campos obligatorios.');
        return false;
    }

    return true;
}
