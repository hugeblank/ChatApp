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

                   // user's randomized chat color
                   let ran = Math.round(0xffffff * Math.random());
                   let r = ran >> 16;
                   let g = ran >> 8 & 255;
                   let b = ran & 255;
                   let color = `rgb(${r}, ${g}, ${b})`;

                   window.userName = name;
                   window.userColor = color;
                   
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
                    network.util.sendMessage('t', message);
                    $('#inputMessage').val('');
                }
            }
        );
    }
);