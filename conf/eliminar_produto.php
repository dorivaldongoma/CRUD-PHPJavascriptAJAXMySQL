<?php
if (!isset($_GET["id"])) {
    http_response_code(500);
    exit();
}

include_once "funcoes.php";
$resposta = eliminarProduto($_GET["id"]);
echo json_encode($resposta);
