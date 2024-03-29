#ifndef CUSTOM_DHT
#define CUSTOM_DHT

#include <DHT.h>
#include <DHT_U.h>

class CustomDht {
public:
    CustomDht(uint8_t pin, uint8_t type);
    void begin();
    float readHumidity();
    float readTemperature();
    float readTemperatureFahrenheit();
private:
    DHT dht;
};

#endif // CUSTOM_DHT