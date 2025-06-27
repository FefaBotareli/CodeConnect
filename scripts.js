const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

document.getElementById('imageUpload').addEventListener('change', function(event){
    var file = event.target.files[0];
})

if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
    alert('Por favor, selecione uma imagem PNG ou JPEG.');
    return;
}

if (file.size > 2 * 1024 * 1024){
    alert('A imagem deve ter no máximo 2MB.');
    return;
}