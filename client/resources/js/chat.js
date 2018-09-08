$(document).ready(
    () =>
    {
        window.network = new Network(this);

        $('#usernameInput').keypress(
            (e) =>
            {
               if (e.which == 13)
               {
                   // user entered their name
                   let name = $('#usernameInput').val();
                   console.log(name);

                   network.util.fadeOut('loginArea');
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
                    network.util.sendMessage(message);
                }
            }
        );
    }
);