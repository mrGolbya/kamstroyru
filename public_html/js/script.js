$(document).ready(function(){

	var distance1 = 0;
    var distance2 = 0;
	
	function init() {
	    var myMap = new ymaps.Map('map', {
	            center: [58.875617, 37.080191],
	            zoom: 10,
	            type: 'yandex#map',
	            behaviors: ['scrollZoom', 'drag']
	        }),
	        search = new ymaps.control.SearchControl({
	            useMapBounds: true,
	            noCentering: true,
	            noPlacemark: true
	        }),
	        
	        calculator = new DeliveryCalculator(myMap, myMap.getCenter());
	    myMap.controls.add(search, { right: 5, top: 5 });
	    search.events.add('resultselect', function (e) {
	        var results = search.getResultsArray(),
	            selected = e.get('resultIndex'),
	            point = results[selected].geometry.getCoordinates();
	        calculator.setStartPoint(point);
	    });
	}
	
	
	
	function DeliveryCalculator(map, finish) {
	    this._map = map;
	    this._start = null;
	    //this._finish = new ymaps.Placemark(finish, { iconContent: 'A' });
	    //this._finish = null;
	    this._finish = new ymaps.Placemark();
	    this._route = null;
	    map.events.add('click', this._onStartPointChange, this);
	    map.geoObjects.add(this._finish);
	}
	
	var ptp = DeliveryCalculator.prototype;
	ptp._onStartPointChange = function (e) {
	    this.setStartPoint(e.get('coordPosition'));
	};
	
	ptp.getDirections = function () {
	    var self = this,
	        start = this._start.geometry.getCoordinates(),
	        //finish = this._finish.geometry.getCoordinates();
	        finish = [58.875617, 37.080191];
	        //finish2 = [59.923367, 30.392303];
	    if(this._route) {
	        this._map.geoObjects.remove(this._route);
	    }
	    
	    ymaps.geocode(start, { results: 1 })
	        .then(function (geocode) {
	            var address = geocode.geoObjects.get(0) &&
	                geocode.geoObjects.get(0).properties.get('balloonContentBody') || '';
	      

	      ymaps.route([start, finish])
	                .then(function (router) {	                	 
	                	distance1 = Math.round(router.getLength() / 1000);
	                	
	                	 message = '<span>Расстояние: ' + distance1 + 'км.</span><br/>' +
                         '<!--span style="font-weight: bold; font-style: italic">Стоимость доставки: %sр.</span-->';
		                 self._route = router.getPaths();
		                 self._route.options.set({ strokeWidth: 5, strokeColor: '0000ffff', opacity: 0.5 });
		                 self._map.geoObjects.add(self._route);
		                 self._map.geoObjects.add(new ymaps.Placemark(finish, { iconContent: 'A' }));
		                 self._start.properties.set('balloonContentBody', address + message.replace('%s', self.calculate(distance1)));
		                 self._start.balloon.open();
	                	
				      /*  ymaps.route([start, finish2])
			                .then(function (router1) {
			                	distance2 = Math.round(router1.getLength() / 1000);
	
			                	if(distance2 < distance1){
			                        message = '<span>Расстояние: ' + distance2 + 'км.</span><br/>' +
				                            '<!--span style="font-weight: bold; font-style: italic">Стоимость доставки: %sр.</span-->';
				                    self._route = router1.getPaths();
				                    self._route.options.set({ strokeWidth: 5, strokeColor: '0000ffff', opacity: 0.5 });
				                    self._map.geoObjects.add(self._route);
				                    self._map.geoObjects.add(new ymaps.Placemark(finish2, { iconContent: 'A' }));
				                    self._start.properties.set('balloonContentBody', address + message.replace('%s', self.calculate(distance2)));
				                    self._start.balloon.open();
			                	} else {
			                		 message = '<span>Расстояние: ' + distance1 + 'км.</span><br/>' +
			                            '<!--span style="font-weight: bold; font-style: italic">Стоимость доставки: %sр.</span-->';
			                    self._route = router.getPaths();
			                    self._route.options.set({ strokeWidth: 5, strokeColor: '0000ffff', opacity: 0.5 });
			                    self._map.geoObjects.add(self._route);
			                    self._map.geoObjects.add(new ymaps.Placemark(finish, { iconContent: 'A' }));
			                    self._start.properties.set('balloonContentBody', address + message.replace('%s', self.calculate(distance1)));
			                    self._start.balloon.open();
			                		
			                	}
			                });*/
            
	                });

	           	            
	        });
	};
	
	ptp.setStartPoint = function (position) {
	    if(this._start) {
	        this._start.geometry.setCoordinates(position);
	    }
	    else {
	        this._start = new ymaps.Placemark(position, { iconContent: 'Б' }, { draggable: true });
	        this._start.events.add('dragend', this._onStartPointChange, this);
	        this._map.geoObjects.add(this._start);
	    }
	    this.getDirections();
	};
	
	ptp.calculate = function (len) {
	    // Константы.
	    var DELIVERY_TARIF = 70,
	        MINIMUM_COST = 0;

	    if(len > 400){
	    	
	    	len = ((len - 400) * DELIVERY_TARIF);
	    	
	    } else {
	    	len = 0;
	    }
	    
	    
	    return Math.max(len, MINIMUM_COST);
	};
	ymaps.ready(init);


});

