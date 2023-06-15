<?php include_once "../inc/cabecalho.php"; ?>
<div class="columns">
    <div class="column">
        <h2 class="is-size-2">Produtos existentes</h2>
        <a class="button is-success" href="../adicionar_produto.php">Adicionar novo&nbsp;<i class="fa fa-plus"></i></a>
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Cadastrado</th>
                    <th>Editado</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                </tr>
            </thead>
            <tbody id="corpoTabela">
            </tbody>
        </table>
    </div>
</div>
<script src="../js/produtos.js"></script>
<?php include_once "../inc/rodape.php" ?>