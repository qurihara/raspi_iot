var name = "raspi-zero-w-1";
var MilkCocoa = require('milkcocoa');

var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  // P13 LED blink
  var led = new five.Led("P1-13");
  led.on();//.blink();

  // var servo = new five.Servo(12);
  var servo = new five.Servo({
        id: "coin_servo",
        pin: 'P1-12',
        type: "standard",
        range: [-180,180],
        fps:100,
        invert: false,
        startAt: 00,
        center: true,
        });

  var relay = new five.Relay('P1-16');

  var listen = function(){
    milkcocoa = new MilkCocoa('woodj2to2ujh.mlkcca.com');
    ds = milkcocoa.dataStore('messages');
    ds.on('send', function(sended) {
      // console.log('[message recieved] title: '+sended.value.title+', content: '+sended.value.content);
      if (sended.value.title === name){
        try{
          eval(sended.value.content);
        }catch(e){
        }
      }
    });    
    function send(str){
          ds.send({title : 'id', content : name});
          // console.log("sent.");
    }
    send(name);
  }

  // ds.send({title : 'command', content : 'servo.to(0);'});// initial
  // ds.send({title : 'command', content : 'servo.to(-160);'});// push


  setTimeout(listen, 60000);

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
    servo: servo,
    led: led,
    relay: relay
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
