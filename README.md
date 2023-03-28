# ambient_display
code to implement an ambient display on the interactive pool

## Sensor Server File : 
This file is the driver for Gosai that allows to get the data from the sensors placed under the billiard table. It processes the data and adds them to a dictionary

## ambient_display app : 
- Processing.py python code that itnitialize wich driver the app is going to need to display on the pool table. it uses the sensor server driver
- The display file is the main sketch of the project. These are the animations displayed on the pool table. It retrieves the data sent by the sensor server driver and makes an interactive display 

## arduinoWebSockets-master.zip : 
The library needed to run the arduino code 
