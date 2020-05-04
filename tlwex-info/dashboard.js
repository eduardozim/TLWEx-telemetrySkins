Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    //
    // skinConfig - a copy of the skin configuration from config.json
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // this function is called before everything else, 
    // so you may perform any DOM or resource initializations / image preloading here

    utils.preloadImages([
        'images/bg-off.png', 'images/bg-on.png',
        'images/blinker-left-off.png', 'images/blinker-left-on.png',
        'images/blinker-right-off.png', 'images/blinker-right-on.png',
        'images/cruise-off.png', 'images/cruise-on.png',
        'images/highbeam-off.png', 'images/highbeam-on.png',
        'images/lowbeam-off.png', 'images/lowbeam-on.png',
        'images/parklights-off.png', 'images/parklights-on.png',
        'images/trailer-off.png', 'images/trailer-on.png',
		'images/tlwex.png'
    ]);

    // return to menu by a click
    $(document).add('body').on('click', function () {
        window.history.back();
    });
}

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // This filter is used to change telemetry data 
    // before it is displayed on the dashboard.
    // You may convert km/h to mph, kilograms to tons, etc.

    data.hasJob = data.trailer.attached;
    // round truck speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));
    data.truck.cruiseControlSpeedRounded = data.truck.cruiseControlOn
        ? Math.floor(data.truck.cruiseControlSpeed)
        : 0;
    // convert kg to t
    data.trailer.mass = data.hasJob ? (Math.round(data.trailer.mass / 1000.0) + 't') : '';
    // format odometer data as: 00000.0
    data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    // convert gear to readable format
    data.truck.gear = data.truck.displayedGear; // use displayed gear
    data.truck.gear = data.truck.gear > 0
        ? 'D' + data.truck.gear
        : (data.truck.gear < 0 ? 'R' + Math.abs(data.truck.gear) : 'N');
    // convert rpm to rpm * 100
    data.truck.engineRpm = data.truck.engineRpm / 100;
    // calculate wear
    var wearSumPercent = (data.truck.wearEngine +
        data.truck.wearTransmission +
        data.truck.wearCabin +
        data.truck.wearChassis +
        data.truck.wearWheels)/5;
    //wearSumPercent = Math.min(wearSumPercent, 100);
    data.truck.wearSum = Math.round(wearSumPercent * 100) + '%'; 
    data.trailer.wear = Math.round(data.trailer.wear * 100) + '%';
    
    // Datailed truck wear
    data.truck.wearCabin = Math.round(data.truck.wearCabin * 100) + '%';
	data.truck.wearChassis = Math.round(data.truck.wearChassis * 100) + '%';
	data.truck.wearEngine = Math.round(data.truck.wearEngine * 100) + '%';
	data.truck.wearTransmission = Math.round(data.truck.wearTransmission * 100) + '%';
	data.truck.wearWheels = Math.round(data.truck.wearWheels * 100) + '%';
    
    //Truck data
    data.truck.modeltype = data.truck.make + ' ' + data.truck.model;

    // Fuel data
    data.truck.fuelnumber = Math.round(data.truck.fuel) + 'L';
    data.truck.autonomy = Math.round((data.truck.fuel / data.truck.fuelAverageConsumption),2) + ' Km';
    data.truck.fuelAverageConsumptionlpkm = utils.formatFloat(data.truck.fuelAverageConsumption * 100 ,2) + ' L x 100Km';
    data.truck.fuelAverageConsumptionkmpl = utils.formatFloat(1 / data.truck.fuelAverageConsumption ,2) + ' Km/L';
	
    
    // return changed data to the core for rendering
    

    return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    //
    // data - same data object as in the filter function
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // we don't have anything custom to render in this skin,
    // but you may use jQuery here to update DOM or CSS
}