<?php
include_once "funcoes.php";
$produtos = obterProdutos();
echo json_encode($produtos);
