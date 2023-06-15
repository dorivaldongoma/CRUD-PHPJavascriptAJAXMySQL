const $corpoTabela = document.querySelector("#corpoTabela");

const obterProdutos = async () => {
    // Essa é uma solicitação GET, não precisamos indicar o método ou o corpo.
    const respostaRaw = await fetch("obter_produtos.php");
    const produtos = await respostaRaw.json();
    // Limpamos a mesa
    $corpoTabela.innerHTML = "";
    // Agora temos os produtos. Vamos examiná-los
    for (const produto of produtos) {
        // Vamos anexar elementos à tabela.
        const $fila = document.createElement("tr");
        // A célula de nome
        const $celulaNome = document.createElement("td");
        // Coloque seu valor e anexe-o à linha
        $celulaNome.innerText = produto.nome;
        $fila.appendChild($celulaNome);
        // O mesmo para o restante
        const $celulaDescricao = document.createElement("td");
        $celulaDescricao.innerText = produto.descricao;
        $fila.appendChild($celulaDescricao);
        const $celulaPreco = document.createElement("td");
        $celulaPreco.innerText = produto.preco;
        $fila.appendChild($celulaPreco);
        const $celulaCadastrado = document.createElement("td");
        $celulaCadastrado.innerText = produto.cadastrado;
        $fila.appendChild($celulaCadastrado);
        const $celulaEditado = document.createElement("td");
        $celulaEditado.innerText = produto.editado;
        $fila.appendChild($celulaEditado);
        // Extrair o ID do produto em que estamos no ciclo.
        const idProduto = produto.id;
        // Link para eliminar
        const $linkEditar = document.createElement("a");
        let nomePasta = window.location.pathname.split("/");
        $linkEditar.href = window.location.protocol + "//" + window.location.host + "/" + nomePasta[1] + "/editar_produto.php?id=" + idProduto;
        $linkEditar.innerHTML = `<i class="fa fa-edit"></i>`;
        $linkEditar.classList.add("button", "is-warning");
        const $celulaLinkEditar = document.createElement("td");
        $celulaLinkEditar.appendChild($linkEditar);
        $fila.appendChild($celulaLinkEditar);

        // Para o botão de exclusão, primeiro criamos o botão, adicionamos seu ouvinte e, em seguida, o anexamos à sua célula.
        const $botaoEliminar = document.createElement("button");
        $botaoEliminar.classList.add("button", "is-danger")
        $botaoEliminar.innerHTML = `<i class="fa fa-trash"></i>`;
        $botaoEliminar.onclick = async () => {

            const respostaConfirmacion = await Swal.fire({
                title: "Confirmação",
                text: "Excluir o produto? Isso não pode ser desfeito.",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Sim, eliminar',
                cancelButtonText: 'Cancelar',
            });
            if (respostaConfirmacion.value) {
                let nomePasta = window.location.pathname.split("/");
                const url = window.location.protocol + "//" + window.location.host + "/" + nomePasta[1] + "/conf/eliminar_produto.php?id=" + idProduto;
                const respostaRaw = await fetch(url, {
                    method: "DELETE",
                });
                const resposta = await respostaRaw.json();
                if (resposta) {
                    Swal.fire({
                        icon: "success",
                        text: "Produto eliminado",
                        timer: 700, // <- Ocultar dentro de 0.7 segundos
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "O servidor não respondeu com êxito.",
                    });
                }
                // De qualquer forma, obtenha novamente os produtos para atualizar a tabela.
                obterProdutos();
            }
        };
        const $celulaBotao = document.createElement("td");
        $celulaBotao.appendChild($botaoEliminar);
        $fila.appendChild($celulaBotao);
        // Anexar a linha à tabela
        $corpoTabela.appendChild($fila);
    }
};

// E quando esse script é incluído, chamamos a função
obterProdutos();