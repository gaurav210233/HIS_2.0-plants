#ifndef CUSTOM_SOILMOIST
#define CUSTOM_SOILMOIST

#include <Arduino.h>
class CustomSoilMoist
{
    public:
    CustomSoilMoist (uint8_t pin);
    void begin();
    int readMoisture();
    
    private:
    uint8_t _pin;
};

#endif // CUSTOM_SOILMOIST