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
                   
                   $('#loginArea').fadeOut();
                   $('#chatArea').fadeIn();
               }
            }
        );

        $('#inputMessage').keypress(
            (e) =>
            {
                if (e.which == 13)
                {
                    // user entered a message
                    let message = $('#inputMessage').val();
                    console.log(message);
                }
            }
        );
    }
);