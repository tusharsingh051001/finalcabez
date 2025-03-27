import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { createClient, Client, SubscribePayload } from "graphql-ws";
import env from "/Users/tusharsingh/Desktop/APK/cabezdummy/env.json";

const HASURA_WS_URL = env.HASURA_WS_URL;
const HASURA_ADMIN_SECRET = env.HASURA_ADMIN_SECRET;
const PARENT_UUID = env.PARENT_UUID;

const LOCATION_SUBSCRIPTION = `
  subscription MySubscription($parentUUID: String!) {
    parent(where: {uuid: {_eq: $parentUUID}}) {
      driver {
        locationdata(order_by: {id: desc_nulls_last}, limit: 1) {
          latitude
          longitude
          speed_kmph
        }
      }
    }
  }
`;

interface Coords {
  latitude: number;
  longitude: number;
  speed_kmph?: number;
}

const MapScreen = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client: Client = createClient({
      url: HASURA_WS_URL,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
      },
    });

    const payload: SubscribePayload = {
      query: LOCATION_SUBSCRIPTION,
      variables: { parentUUID: PARENT_UUID },
    };

    let unsubscribe: () => void;

    unsubscribe = client.subscribe(payload, {
      next: (data) => {
        const locationData =
          data.data?.parent?.[0]?.driver?.locationdata?.[0];
        if (locationData) {
          setCoords({
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            speed_kmph: locationData.speed_kmph,
          });
          setLoading(false);
        }
      },
      error: (err) => {
        console.error("Subscription error:", err);
        setLoading(false);
      },
      complete: () => {
        console.log("Subscription completed");
      },
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const lat = coords?.latitude ?? 0;
  const lng = coords?.longitude ?? 0;
  const speed = coords?.speed_kmph ?? 0;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
          .speed-box {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            z-index: 1000;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <div class="speed-box" id="speedBox">Speed: ${speed} km/h</div>
        
        <script>
          var lat = ${lat};
          var lng = ${lng};
          var speed = ${speed};
          
          var map = L.map('map').setView([lat, lng], 17);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var marker = L.marker([lat, lng]).addTo(map);

          function updateMap(newLat, newLng, newSpeed) {
            marker.setLatLng([newLat, newLng]);
            map.setView([newLat, newLng], 17);
            document.getElementById('speedBox').innerText = 'Speed: ' + newSpeed + ' km/h';
          }

          setInterval(() => {
            updateMap(lat, lng, speed);
          }, 5000);
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        onError={(err) => console.error("WebView error: ", err)}
      />
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
