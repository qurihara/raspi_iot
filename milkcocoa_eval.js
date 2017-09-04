var name = "raspi-zero-w-1";
var MilkCocoa = require('milkcocoa');

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // P13 LED blink
  var led = new five.Led("P1-13");
  led.blink();

  var servo = new five.Servo(12);

  milkcocoa = new MilkCocoa('woodj2to2ujh.mlkcca.com');
  ds = milkcocoa.dataStore('messages');
  ds.on('send', function(sended) {
    log('[message recieved] title: '+sended.value.title+', content: '+sended.value.content);
    eval(sended.value.content);
    // servo.sweep();
  });

  // ds.send({title : 'command', content : 'servo.sweep();'});

  function send(str){
        ds.send({title : 'id', content : name});
        console.log("sent.");
  }
  send(name);

  // Servo alternate constructor with options
  /*
  var servo = new five.Servo({
    id: "MyServo",     // User defined id
    pin: 10,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    center: true,      // overrides startAt if true and moves the servo to the center of the range
  });
  */

  // Add servo to REPL (optional)
  this.repl.inject({
    servo: servo
  });


  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
  // servo.center();

  // to( deg )
  //
  // Moves the servo to position by degrees
  //
  // servo.to( 90 );

  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );

  // servo.sweep();
});
