#include "custom_dht.h"

CustomDht::CustomDht(uint8_t pin, uint8_t type) : dht(pin, type) {}

void CustomDht::begin() {
    dht.begin();
}

float CustomDht::readHumidity() {
    return dht.readHumidity();
}

float CustomDht::readTemperature() {
    return dht.readTemperature();
}

float CustomDht::readTemperatureFahrenheit() {
    return dht.readTemperature(true);
}
