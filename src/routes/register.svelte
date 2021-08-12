<script lang="ts">

</script>

<main>
    <form action="http://localhost:1337/auth/local/register" method="post">
        <label for="username">Naam:</label><br>
        <input type="text" id="username" name="username" required><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" autocomplete="email" required><br>
        <label for="password">Wachtwoord:</label><br>
        <input type="password" id="password" name="password" required><br>
        <input type="submit">
    </form>
</main>
