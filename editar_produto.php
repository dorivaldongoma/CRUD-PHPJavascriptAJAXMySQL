<?php $link_alert = "js/sweetalert2.min.js"; $link_produtos = "conf/produtos.php"; include_once "inc/cabecalho.php"; ?>
<div class="columns">
    <div class="column is-one-third">
        <h2 class="is-size-2">Editar produto</h2>
        <div class="field">
            <label for="nome">Nome</label>
            <div class="control">
                <input required id="nome" class="input" type="text" placeholder="Nome" name="nome">
            </div>
        </div>
        <div class="field">
            <label for="descricao">Descrição</label>
            <div class="control">
                <textarea name="descricao" class="textarea" id="descricao" cols="30" rows="5" placeholder="Descrição" required></textarea>
            </div>
        </div>
        <div class="field">
            <label for="preco">Preço</label>
            <div class="control">
                <input required id="preco" name="preco" class="input" type="number" placeholder="Preço">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button id="btnGuardar" class="button is-success">Guardar</button>
                <a href="conf/produtos.php" class="button is-warning">Voltar</a>
            </div>
        </div>
    </div>
</div>
<script src="js/editar_produto.js"></script>
<?php include_once "inc/rodape.php" ?>