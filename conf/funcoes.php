<?php
function obterVariavelDeEntrada($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new \RuntimeException("O arquivo de variáveis de ambiente ($file) não existe. Favor criá-lo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    }
    throw new \RuntimeException("A chave especificada (" . $key . ") não existe no arquivo de variáveis de ambiente.");
}
function obterConexao()
{
    $password = obterVariavelDeEntrada("MYSQL_PASSWORD");
    $user = obterVariavelDeEntrada("MYSQL_USER");
    $dbName = obterVariavelDeEntrada("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}
function atualizarProduto($nome, $preco, $descricao, $id)
{
    $bd = obterConexao();
    $query = $bd->prepare("UPDATE produtos SET nome = ?, preco = ?, descricao = ?, editado = NOW() WHERE id = ?");
    return $query->execute([$nome, $preco, $descricao, $id]);
}

function obterProdutoPorId($id)
{
    $bd = obterConexao();
    $query = $bd->prepare("SELECT * FROM produtos WHERE id = ?");
    $query->execute([$id]);
    return $query->fetchObject();
}

function obterProdutos()
{
    $bd = obterConexao();
    return $bd->query("SELECT * FROM produtos")->fetchAll();
}

function eliminarProduto($id)
{
    $bd = obterConexao();
    return $bd->prepare("DELETE FROM produtos WHERE id = ?")->execute([$id]);
}

function guardarProduto($nome, $preco, $descricao)
{
    $bd = obterConexao();
    $query = $bd->prepare("INSERT INTO produtos(nome, preco, descricao, cadastrado) VALUES(?, ?, ?, NOW())");
    return $query->execute([$nome, $preco, $descricao]);
}
