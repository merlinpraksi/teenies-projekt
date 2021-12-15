void setup () {
  Serial.begin(9600);

  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(6, INPUT);
  }

  void loop() {

int buttonState2 = digitalRead(2);
int buttonState3 = digitalRead(3);
int buttonState4 = digitalRead(4);
int buttonState6 = digitalRead(5); 

   if (buttonState2 == HIGH) {
    Serial.println(8);
   }
   if (buttonState3 == HIGH) {
    Serial.println(7);
   }
   if (buttonState4 == HIGH) {
    Serial.println(6);
   }
   if (buttonState6 == HIGH) {
    Serial.println(5);
   }

   delay(100);
   }
