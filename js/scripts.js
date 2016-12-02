var buildTrack = '';
var buildPreview = '';
// get input from user
getUserInput();

function getUserInput() {
    $("#js-userSubmit").submit(function(event) {
        event.preventDefault();
        var userInput = $("#js-userInput").val();
        console.log(userInput);
        getSpotify(userInput);
    })
}

//send usersInput to spotify api to get json

var getSpotify = function(userInput) {
    $.getJSON(
        "https://api.spotify.com/v1/search",          
    {                                                         
        q: userInput,
        limit: 1,                                           
        type: "artist"                                          
    },
        function(receivedApiData) {                               
            console.log(receivedApiData)                           
            if(receivedApiData.artists.total == 0) {        
              alert("No songs found!");                            
            }
            else {
                console.log(receivedApiData.artists.items[0].id)
                var artistId = receivedApiData.artists.items[0].id
                $('p').html(receivedApiData.artists.items[0].name + "'s Albums");
                var getTopTracks = function() {
                    $.getJSON(
                        'https://api.spotify.com/v1/artists/' + artistId + '/albums?album_type=album',
                    {
                        limit: 5
                    },
                        // function(recivedTracks) {
                        //     var tracks = recivedTracks.tracks;
                        //     console.log(recivedTracks.tracks);
                        //     for(var i = 0; i < 9; i++){                     // FIX!!!
                        //         buildTrack += "<iframe class='col-md-4 space' src='https://embed.spotify.com/?uri=";                            
                        //         buildTrack += tracks[i].uri + "' ";
                        //         buildTrack += 'width="200" height="300" frameborder="0" allowtransparency="true"></iframe>'
                        //         $(".js-search-results").html(buildTrack);
                        //         buildPreview += '<div class="col-md-4 space"><a href="#" class="thumbnail">' 
                        //         buildPreview += '<img src="' + tracks[i].album.images[0].url + '"' 
                        //         buildPreview += 'alt="' + tracks[i].preview_url + '"></a>' 
                        //         buildPreview += tracks[i].name + '<br><audio controls><source src="' + tracks[i].preview_url + '" type="audio/mp4"></div>'
                        //     }
                        function(receivedAlbums) {
                            var albumId = receivedAlbums.id;
                            var cover = receivedAlbums.items[0].images[1].uri;
                            console.log(receivedAlbums.id);
                            for(var i = 0; i < 9; i++){                    
                                buildTrack += "<iframe class='col-md-4 space' src='https://embed.spotify.com/?uri=";                            
                                buildTrack += receivedAlbums[i].uri + "' ";
                                buildTrack += 'width="300" height="300" frameborder="0" allowtransparency="true"></iframe>'
                                $(".js-search-results").html(buildTrack);
                                buildPreview += '<div class="col-md-4 space"><a href="#" class="thumbnail">' 
                                buildPreview += '<img src="' + receivedAlbums[i].images[1].url + '"' 
                                buildPreview += 'alt="' + receivedAlbums[i].name + '"></a>' 
                                buildPreview += receivedAlbums[i].name> + '</div>'
                            }
                            console.log(buildTrack);
                            $(".js-search-results").html(buildTrack);
                            $(".js-preview-results").html(buildPreview);
                            buildTrack = '';
                            buildPreview = '';

                        }
                    );
                } 
                getTopTracks();
               
            }
        }
    )
}
var state = true;

$("#previewTrack").click(function(){
    $(".previewTrack").addClass('showMusic');
    $(".previewTrack").removeClass('hideMusic');
    $(".fullTrack").addClass('hideMusic');
    $(".fullTrack").removeClass('showMusic');
})
$("#fullTrack").click(function(){
    $(".fullTrack").addClass('showMusic');
    $(".fullTrack").removeClass('hideMusic');
    $(".previewTrack").addClass('hideMusic');
    $(".previewTrack").removeClass('showMusic');
})