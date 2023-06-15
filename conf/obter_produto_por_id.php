<?php
if (!isset($_GET["id"])) {
    http_response_code(500);
    exit();
}
include_once "funcoes.php";
$produto = obterProdutoPorId($_GET["id"]);
echo json_encode($produto);