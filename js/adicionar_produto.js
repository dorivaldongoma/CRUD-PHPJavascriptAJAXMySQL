const $nome = document.querySelector("#nome"),
    $descricao = document.querySelector("#descricao"),
    $preco = document.querySelector("#preco"),
    $btnGuardar = document.querySelector("#btnGuardar");

$btnGuardar.onclick = async () => {
    const nome = $nome.value,
        descricao = $descricao.value,
        preco = parseFloat($preco.value);
    // Pequena validação, embora ela deva ser feita no lado do servidor de qualquer forma, é pura estética aqui.
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
            text: "Escreva o preço",
            timer: 700, // <- Ocultar dentro de 0.7 segundos
        });
    }
    // O que vamos enviar para o PHP
    const cargaUtil = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        // Observação: poderíamos simplificar e escrever:
        // nome,
        // Em vez de:
        // nome: nome
        // Mas isso pode confundir o iniciante
    };
    // Codificamos...
    const cargaUtilCodificada = JSON.stringify(cargaUtil);
    // Enviamos
    try {
        const respostaRaw = await fetch("conf/guardar_produto.php", {
            method: "POST",
            body: cargaUtilCodificada,
        });
        // O servidor responderá com JSON
        const resposta = await respostaRaw.json();
        if (resposta) {
            // E se chegamos até aqui, tudo correu bem.
            Swal.fire({
                icon: "success",
                text: "Produto salvo",
                timer: 700, // <- Ocultar dentro de 0.7 segundos
            });
            // Limpamos o formulário
            $nome.value = $descricao.value = $preco.value = "";
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
            title: "Erro de servidor",
            text: "Por favor, tente novamente. O erro é: " + e,
        });
    }
};