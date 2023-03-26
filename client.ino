#include <WiFi.h>
#include <WebServer.h>
#include <Uri.h>
#include <HTTP_Method.h>
#include <WebSocketsClient.h>



#define echoPin1 32
#define trigPin1 33
#define echoPin2 25
#define trigPin2 26
#define echoPin3 4
#define trigPin3 0
#define echoPin4 27
#define trigPin4 14



long duration, distance,sensor1,sensor2,sensor3,sensor4;
String datas;

const char* ssid = "...";
const char* password =  "...";


const uint16_t port = 8091;

const char* host = "IP address";

WiFiClient client; 
void setup()
{
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("...");
  }

  Serial.print("WiFi connected with IP: ");
  Serial.println(WiFi.localIP());

  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  pinMode(trigPin4, OUTPUT);
  pinMode(echoPin4, INPUT);



    while (!client.connect(host, port)) {
        Serial.println("Connection to host failed");

        delay(10);
    }

    Serial.println("Connected to server successful!");

    

}

void loop()
{
    SonarSensor(trigPin1, echoPin1);
    sensor1 = distance;
    SonarSensor(trigPin2, echoPin2);
    sensor2 = distance;
    SonarSensor(trigPin3, echoPin3);
    sensor3 = distance;
    SonarSensor(trigPin4, echoPin4);
    sensor4 = distance;

    datas += "sensor1=";
    datas += sensor1;
    datas += "|sensor2=";
    datas += sensor2;
    datas += "|sensor3=";
    datas += sensor3;
    datas += "|sensor4=";
    datas += sensor4;



    
    client.print(datas);
    Serial.print(datas);

    datas = "";

    
    delay(100);
}

void SonarSensor(int trigPin,int echoPin)
{
  digitalWrite(trigPin, LOW);
  delay(2);
  digitalWrite(trigPin, HIGH);
  delay(1000);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;

}
