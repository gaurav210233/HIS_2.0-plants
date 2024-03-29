#include "custom_soilMoist.h"

CustomSoilMoist::CustomSoilMoist(uint8_t pin) : _pin(pin) {}

void CustomSoilMoist::begin() {
    pinMode(_pin, INPUT);
}

int CustomSoilMoist::readMoisture() {
    return analogRead(_pin);
}