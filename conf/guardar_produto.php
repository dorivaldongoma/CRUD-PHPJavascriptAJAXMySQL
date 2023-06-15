<?php
$cargaUtil = json_decode(file_get_contents("php://input"));
// Se não houver dados, saia imediatamente indicando um erro 500
if (!$cargaUtil) {
    http_response_code(500);
    exit;
}
// Extrair valores
$nome = $cargaUtil->nome;
$preco = $cargaUtil->preco;
$descricao = $cargaUtil->descricao;
include_once "funcoes.php";
$resposta = guardarProduto($nome, $preco, $descricao);
// Retornar a resposta da função para o cliente
echo json_encode($resposta);