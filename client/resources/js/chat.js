$(document).ready(
    () =>
    {
        window.network = new Network();

        $('#usernameInput').keypress(
            (e) =>
            {
               if (e.which == 13)
               {
                   // user entered their name
                   let name = $('#usernameInput').val();
                   console.log(name);
                   
                   $('#loginArea').fadeOut();
                   network.initialize();
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