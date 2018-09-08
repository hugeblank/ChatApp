$(document).ready(
    () =>
    {
        $('#usernameInput').keypress(
            (e) =>
            {
               if (e.which == 13)
               {
                   // user entered their name
                   let name = $('#usernameInput').val();
                   console.log(name);
               }
            }
        );
    }
);