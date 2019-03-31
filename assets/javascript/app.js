var apiKey = 'y6ZZz4VNItJ3M4N6GGrssLCjD0Crt4Ny';
var queryUrl = 'https://api.giphy.com/v1/gifs/trending?limit=10&api_key=' + apiKey;
var topics = ['Atlanta United', 'Chicago Fire', 'FC Cincinnati', 'Colorado Rapids', 'Columbus Crew', 'FC Dallas', 'DC United',
    'Houston Dynamo', 'LAFC', 'LA Galaxy', 'Minnesota United', 'Montreal Impact', 'New England Revolution', 'NYCFC', 'New York Red Bulls',
    'Orlando City', 'Philadelphia Union', 'Real Salt Lake', 'San Jose Earthquakes', 'Seattle Sounders',
    'Sporting KC', 'Toronto FC', 'Vancouver Whitecaps'];
var searchLimit = 10;

//load buttons for each search term in topics array
function loadButtons() {
    for (let i = 0; i < topics.length; i++) {
        var newButton = $('<button>')
            .text(topics[i])
            .addClass('search-button')
            .attr('data-search', topics[i]);

        $('#buttons-view').append(newButton);
    }
}

//initialize search term buttons
loadButtons();

//display 10 gifs from giphy when a button is clicked
$(document.body).on('click', '.search-button', function () {
    var searchTerm = $(this).attr('data-search');
    console.log(searchTerm);

    //set api query url with search term
    queryUrl = 'https://api.giphy.com/v1/gifs/search?limit=' + searchLimit + '&api_key=' + apiKey + '&q=' + searchTerm;

    //make giphy api call with search term
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        //empty previous gifs
        $('#gifs').empty();

        console.log(response);
        console.log(response.data[0]);

        //create div for each image and add to gifs div
        for (let i = 0; i < response.data.length; i++) {
            var gifDiv = $('<span>');
            var gif = $('<img>')
                .attr('src', response.data[i].images.fixed_height_still.url)
                .attr('data-state', 'still')
                .attr('data-still', response.data[i].images.fixed_height_still.url)
                .attr('data-animate', response.data[i].images.fixed_height.url)
                .addClass('gif');

            gifDiv.append(gif);
            $('#gifs').append(gifDiv);
        }
    })
});

//change image state on click
$(document.body).on('click', '.gif', function () {
    //store current image state
    var state = $(this).attr('data-state');

    //change state and image source
    if (state == 'still') {
        $(this).attr('data-state', 'animate');

        var aniSrc = $(this).attr('data-animate');
        $(this).attr('src', aniSrc);
    }
    else {
        $(this).attr('data-state', 'still');

        var stillSrc = $(this).attr('data-still');
        $(this).attr('src', stillSrc);
    }

});