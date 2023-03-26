import { Dot } from "./components/dot.js"
import { Fireworks } from "./components/fireworks.js"

export const ambient_display = new p5(sketch => {
    sketch.name = "ambient_display";
    sketch.activated = false;

    let firework;
    let fireworks = [];
    let dots = [];
    let dist = [];
    let flagfire = true;
    let flagdistmin = true;
    let flagtempofire = false;
    let chronofire = 0;
    let chronomax = 3000;
    let countfire = 0;
    let countmax = 6;


    sketch.preload = () => {

    };

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch.createCanvas(width, height, sketch.WEBGL).position(0, 0);

        socket.on(sketch.name, data => sketch.update_data(data));
        sketch.activated = true;

        for(var i=0; i<50; i++){
           let dot = new Dot();
           dots.push(dot);
        }
    };


    sketch.resume = () => { };
    sketch.pause = () => { };
    sketch.update = () => { };

    //receive the values from the data dictionary in order to have only distances
    sketch.update_data = (data) => {
        if (data == undefined) return;
        if (Object.keys(data).length > 0) {
            dist = Object.values(data);
        }
    };

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
        sketch.fill(255);
        sketch.push();
        sketch.push();
        sketch.pop();

        background(0);

        //create the bakground with colored dots
        for(let dot of dots){
            dot.updateDot();
            dot.showDot(sketch);
        }
      
        let min = 50; 
        //create countmax fireworks if a sensor detects a distance less than 50 cm
        //les feux d'artifices s'affichent pendant une durée de 3 secondes
        for(let i = 0; i < dist.length; i++) {
            if(dist[i]>min){
                firework = undefined;
            }
            else{
                if(flagfire == true){

                    if (firework == undefined){
                        firework = new Fireworks(random(width),random(height));
                        if (flagtempofire == false){
                            chronofire = millis();
                            flagtempofire = true;
                        }
                    }
                    //limit the size of the list
                    if(flagtempofire == true){
                        countfire++;
                        if (countfire < countmax) {
                            fireworks.push(firework);
                        }
                        for(let j=0; j<fireworks.length; j++){
                            fireworks[j].showFirework(sketch);
                            
                        }
                    }
                    
                }
            } 
        }
        //end of fireworks after 3 seconds
        if(flagtempofire == true && ((millis()-chronofire) > chronomax)){
            flagfire = false;
            flagtempofire = false;
        }
        //if a sensor detects again a distance inferior to 50 cm the fireworks can start
        if(flagfire == false)
        {
            flagdistmin = true;
            for (let i = 0; i < dist.length; i++){
                if(dist[i]<min){
                    flagdistmin = false;
                }
            }

            if(flagdistmin == false){
                firework = undefined;
                fireworks = [];
                flagfire = true;
                countfire = 0;
            }
        }
        sketch.pop();
    }

    
});


