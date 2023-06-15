<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>CRUD com PHP, MySQL, JavaScript e AJAX | Dorivaldo Ngoma</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Dorivaldo Ngoma">
    <meta name="description" content="CRUD usando base de dados MySQL com uma aplicação web desenvolvida em JavaScript e PHP, utilizando a técnica AJAX e a codificação JSON.">
    <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.1/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
    <script src="<?php echo ($link_alert ?? "../js/sweetalert2.min.js"); ?>" type="text/javascript"></script>
</head>
<body>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <button class="navbar-burger is-warning button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="<?php echo ($link_produtos ?? "produtos.php"); ?>">Produtos</a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/dorivaldongoma" class="button is-primary">
                            <strong>Suporte e ajuda</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <section class="section">