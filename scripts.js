const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) =>{
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".imagem-central");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (!arquivo) {
        return; // Nenhum arquivo selecionado
    }

    // Validação de tipo
    if (!arquivo.type.match('image/png') && !arquivo.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        return;
    }

    // Validação de tamanho
    if (arquivo.size > 2 * 1024 * 1024){
        alert('A imagem deve ter no máximo 2MB.');
        return;
    }

    try {
        const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
        imagemPrincipal.src = conteudoDoArquivo.url;
        nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
        console.error("Erro na leitura do arquivo", erro);
    }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento)=>{
    if (evento.target.classList.contains("remove-tag")){
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

const tagsDisponiveis = ["Front-End","Progamação","Data Science", "Full-stack", "Back-end", "HTML", "CSS", "Javascript"];

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise ((resolve) =>{
        setTimeout(() =>{
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

inputTags.addEventListener("keypress",async (evento) =>{
    if(evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto != ""){
            try{
                const tagExiste = await verificarTagsDisponiveis(tagTexto);
                if(tagExiste){

                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else{
                    alert("Tag não foi encontrada")
                }
            } catch (error){
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.");
            }
        }
    }
})

const botaoPublicar = document.querySelector(".btn-publicar");

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto){
    return new Promise((resolve, resejct)=>{
        setTimeout(() =>{
            const deuCerto = Math.random() > 0.5;

            if(deuCerto){
                resolve("Projeto publicado com sucesso!")
            } else {
                resejct("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault();

    const nomeProjeto = document.getElementById("name");
    const descricaoProjeto = document.getElementById("descricao");
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Seu projeto foi publicado!")
    } catch (error){
        console.log("Deu errado: ", error);
        alert("Deu ruim no seu projeto");
    }
})

const botaoDescartar = document.querySelector(".btn-descartar");

botaoDescartar.addEventListener("click", (evento) =>{
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";
    listaTags.innerHTML = "";
})