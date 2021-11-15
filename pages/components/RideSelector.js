import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../Data/carList";
const RideSelector = ({ pickupCordinates, dropoffCordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  useEffect(() => {
    rideDuration = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCordinates[0]}, ${pickupCordinates[1]};${dropoffCordinates[0]}, ${dropoffCordinates[1]}?access_token=pk.eyJ1IjoiZGl2anlvdHNpbmdoIiwiYSI6ImNrdnliZzN4NTBxNmgydXFpb3pud2xwNnUifQ.eWhjUxj8a-KGWUOTiG9Msw`
    )
      .then((response) => response.json())
      .then((data) => {
        setRideDuration(data.routes[0].duration / 1000);
      });
  }, [pickupCordinates, dropoffCordinates]);
  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more!</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 mins away</Time>
            </CarDetails>
            <CarPrice>
              {"$" + (rideDuration + car.multiplier).toFixed(2)}
            </CarPrice>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
flex-1 flex flex-col overflow-y-scroll
`;
const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`;
const CarList = tw.div`
overflow-y-scroll
`;

const CarImage = tw.img`
h-14 mr-4
`;

const Car = tw.div`
flex items-center p-4
`;

const CarDetails = tw.div`
flex-1
`;

const Service = tw.div`
font-medium
`;

const Time = tw.div`
text-xs text-blue-500
`;
const CarPrice = tw.div`
text-xl
`;
