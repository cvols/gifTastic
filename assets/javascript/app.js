$(document).ready(function() {

    // global variables
    var sportz = ['ice hockey', 'football', 'baseball', 'basketball', 'soccer'];

    // function to make everything in the array have an uppercase first letter
    function upperCase() {
        for (var i = 0; i < sportz.length; i++) {
            sportz[i] = sportz[i].charAt(0).toUpperCase() + sportz[i].substr(1);
        }
    }
    upperCase();

    // function to add all buttonz to the screen in jumbotron div
    function addSportzButtonz() {
        for (var i = 0; i < sportz.length; i++) {
            upperCase();

            // creating a variable to hold a button tag
            var sportzButtonz = $('<button>');

            // adding a btn class to the button tag var to be the same for all buttons
            sportzButtonz.addClass('btn btn-primary btn-lg custom-btn');

            // adding an attribute to each specific button to make them unique
            sportzButtonz.attr('data-name', sportz[i]);

            // adding the text of each button individually
            sportzButtonz.text(sportz[i]);

            // adding the button to the page
            $('#buttonz-view').append(sportzButtonz);
        } // end for loop
    } // end function addSportzButtonz()
    addSportzButtonz();

    // function to add the new text from the search field to the button group array
    $('#add-sport').on('click', function(event) {

        // prevents an empty field from adding to the array
        event.preventDefault();

        // empty the buttons that are currently on the page so there are no duplicates
        $('#buttonz-view').empty();

        // creating a new variable to grab the value, no end spaces, and make it caps to be uniform
        sport = $('#sportz-input').val().trim();

        // adding the new val/var to the button group array
        sportz.push(sport);

        // calling the addSportzButton() again to get a new group of buttons
        addSportzButtonz();

    }); // end on add sport click 

    // on every button click with the class btn adding the gif info into custom col/thumbnail/caption divs
    $(document).on('click', '.btn', function(event) {

        // prevent enter from firing
        event.preventDefault();

        // creating a variable to grab unique data name
        var name = $(this).attr('data-name');

        // creating variable to use as my api call passing through the buttons data name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            name + "&api_key=dc6zaTOxFJmzC&limit=100";

        // ajax call
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {

            // creating a random number and assinging it to a variable
            var randomNumber = Math.floor((Math.random() * 100) + 1);

            // with the random number we can cycle through a list of 100 gifs because we set the limit to 100 in our search, then we can assign that random number to the array that the api gives us back
            // this allows us to pick a random gif of 100 and grab it's id and it's rating specific to that random gif
            var giphy = response.data[randomNumber].id;
            var gifRating = response.data[randomNumber].rating.toUpperCase();

            // appending my classes to make all information sit in a bootstrap thumbnail element
            $('#sportz-row').append('<div class="col-md-4"><div class="thumbnail text-center"><img src="https://i.giphy.com/' + giphy + '.gif" alt="' + name + '"class="giphy" data-animate="https://i.giphy.com/' + giphy + '.gif"data-still="https://i.giphy.com/media/' + giphy + '/giphy_s.gif" data-state="data-animate"/><div class="text-center caption"><h3>' + name + '</h3><p>Rating: ' + gifRating + '</p></div></div></div>');

        }); // end ajax call

    }); // end on btn click 


    $(document).on('mouseenter', '.giphy', function() {
        // creating a variable unique to the hover effect on a class of giphy and grabbing its data-state on each hover so we can compare it
        var state = $(this).attr('data-state');

        // if the data state === still
        if (state === 'still') {
            
            $(this).attr('src', $(this).attr('data-animate'));
            // chnage the data state to animate
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }); // end on mouseenter

    $(document).on('mouseleave', '.giphy', function() {
        // creating a variable unique to the hover effecton a class of giphy and grabbing its data-state on each hover so we can compare it
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }); // end on mouseleave

}); // end document ready