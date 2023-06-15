</section>
<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", () => {
        const boton = document.querySelector(".navbar-burger");
        const menu = document.querySelector(".navbar-menu");
        boton.onclick = () => {
            menu.classList.toggle("is-active");
            boton.classList.toggle("is-active");
        };
    });
</script>
</body>
</html>