#ifndef WIFI_SETUP_H
#define WIFI_SETUP_H

#include <WiFi.h>

class WifiSetup {
public:
    static void connect(const char* ssid, const char* password);
};

#endif // WIFI_SETUP_H
