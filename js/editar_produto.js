const $nome = document.querySelector("#nome"),
    $descricao = document.querySelector("#descricao"),
    $preco = document.querySelector("#preco"),
    $btnGuardar = document.querySelector("#btnGuardar");

// Um global a ser definido ao preencher o formulário e lido ao enviar o formulário
let idProduto;

const preencherFormulario = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    idProduto = urlSearchParams.get("id"); // <-- Atualizar ID global
    // Obter o produto do PHP
    const respuestaRaw = await fetch(`conf/obter_produto_por_id.php?id=${idProduto}`);
    const produto = await respuestaRaw.json();
    // Rellenar formulario
    $nome.value = produto.nome;
    $descricao.value = produto.descricao;
    $preco.value = produto.preco;
};

// Ao incluir esse script, chame a função imediatamente.
preencherFormulario();

$btnGuardar.onclick = async () => {
    // Ele se comporta da mesma forma que quando salvamos um novo.
    const nome = $nome.value,
        descricao = $descricao.value,
        preco = parseFloat($preco.value);
    // Pequena validação, embora ela deva ser feita no lado do servidor de qualquer forma, é puramente estética aqui.
    if (!nome) {
        return Swal.fire({
            icon: "error",
            text: "Escreva o nome",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }
    if (!descricao) {
        return Swal.fire({
            icon: "error",
            text: "Escreva a descrição",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }

    if (!preco) {
        return Swal.fire({
            icon: "error",
            text: "Escreva o preco",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }
    // O que enviaremos ao PHP. Também incluímos o ID
    const cargaUtil = {
        id: idProduto,
        nome: nome,
        descricao: descricao,
        preco: preco,
    };
    // Codificamos...
    const cargaUtilCodificada = JSON.stringify(cargaUtil);
    // Enviamos
    try {
        const respuestaRaw = await fetch("conf/atualizar_produto.php", {
            method: "PUT",
            body: cargaUtilCodificada,
        });
        // O servidor responderá com JSON
        const respuesta = await respuestaRaw.json();
        if (respuesta) {
            // E se chegamos até aqui, tudo correu bem.
            // Esperamos que o alerta seja exibido
            await Swal.fire({
                icon: "success",
                text: "Produto atualizado",
                timer: 700, // <- Ocultar dentro de 0.7 segundos
            });
            // Redirecionamos para todos os produtos
            window.location.href = "conf/produtos.php";
        } else {
            Swal.fire({
                icon: "error",
                text: "O servidor não enviou uma resposta bem-sucedida",
            });
        }
    } catch (e) {
        // Em caso de erro
        Swal.fire({
            icon: "error",
            title: "Erro do servidor",
            text: "Por favor, tente novamente. O erro é: " + e,
        });
    }
};