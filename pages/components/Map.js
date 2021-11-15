import React from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGl2anlvdHNpbmdoIiwiYSI6ImNrdnliZzN4NTBxNmgydXFpb3pud2xwNnUifQ.eWhjUxj8a-KGWUOTiG9Msw";
function Map({ pickupCordinates, dropoffCordinates }) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });
    if (pickupCordinates) {
      addToMap(map, pickupCordinates);
    }
    if (dropoffCordinates) {
      addToMap(map, dropoffCordinates);
    }
    if (pickupCordinates && dropoffCordinates) {
      map.fitBounds([dropoffCordinates, pickupCordinates], {
        padding: 60,
      });
    }
  }, [pickupCordinates, dropoffCordinates]);
  console.log(pickupCordinates);
  const addToMap = (map, cordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat([cordinates[0], cordinates[1]])
      .addTo(map);
  };

  return <Wrapper id="map"></Wrapper>;
}

export default Map;
const Wrapper = tw.div`
  bg-red-500 flex-1 h-1/2
`;
