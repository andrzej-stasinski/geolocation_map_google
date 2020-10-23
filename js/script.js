
(function(){
    console.log('function');
    var supportOutput  = document.querySelector('#supportOutput'),
        positionOutput = document.querySelector('#positionOutput'),
        findPosition   = document.querySelector('#findPosition'),
        mapka          = document.querySelector('#mapa');

    if(navigator.geolocation) {
        supportOutput.innerHTML = 'Przeglądarka wspiera geolokalizację';
        supportOutput.classList.add('alert-success');
    } else {
        supportOutput.innerHTML = 'Przeglądarka NIE wspiera geolokalizację';
        supportOutput.classList.add('alert-danger');
    }
    positionOutput.textContent = 'Tutaj będą współrzędne geo';

    // mapa z położeniem ustalonym
    mapa = new google.maps.Map(mapka, { 
        center: new google.maps.LatLng(54.30, 18.56), //zwiekszenie ../left
        zoom:10, 
        mapTypeId:google.maps.MapTypeId.ROADMAP 
    });

    function success(pos) {
        console.warn('success');
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        var timestamp = pos.timestamp;
        positionOutput.textContent = lat + ', ' + lng + ', timestamp:' + new Date(timestamp).toLocaleTimeString() + ' aktualny czas:' + new Date().toLocaleTimeString();
        positionOutput.classList.remove('alert-info');
        positionOutput.classList.add('alert-success');

        // mapa z położeniem aktualnym na środeku
        mapa.setCenter(new google.maps.LatLng(lat, lng));
        mapa.setZoom(13);

       // Default the Marker
       var marker1 = new google.maps.Marker({ 
          position: new google.maps.LatLng(lat, lng), 
          map: mapa, 
       }); 
    }

    function error(err) {
        console.warn('error');
        positionOutput.textContent = 'Error...';
        positionOutput.classList.remove('alert-info');
        positionOutput.classList.add('alert-danger');

        var message;
        switch(err.code) {
            case err.PERMISSION_DENIED:
            message = 'Brak zgody na lokalizację';
            break;
            case err.POSITION_UNAVAILABLE:
            message = 'Brak sieci';
            break; 
            case err.TIMEOUT:
            message = 'Przekroczono czas oczekiwania';
            break;           
        }        
        positionOutput.textContent += message;
    }


    var opt = { timeout: 2700, maximumAge: 60000 };
    findPosition.onclick = function() {
        console.info('click');
        navigator.geolocation.getCurrentPosition( success, error, opt );

        positionOutput.classList.remove('alert-danger');
        positionOutput.classList.remove('alert-success');
        positionOutput.classList.add('alert-info');
        positionOutput.textContent = 'Czekaj...'

    }
})();







