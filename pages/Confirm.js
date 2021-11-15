import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";
import Link from "next/dist/client/link";

const Confirm = () => {
  const [pickupCordinates, setPickupCordinates] = useState([0, 0]);
  const [dropoffCordinates, setDropoffCordinates] = useState([0, 0]);

  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const getPickupCoordinates = (pickupCor) => {
    const pickup = pickupCor;
    // Fetch function
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGl2anlvdHNpbmdoIiwiYSI6ImNrdnliZzN4NTBxNmgydXFpb3pud2xwNnUifQ.eWhjUxj8a-KGWUOTiG9Msw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCordinates(data.features[0].center);
      });
  };
  const getDropCoordinates = (dropCor) => {
    const dropoff = dropCor;
    // Fetch function
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiZGl2anlvdHNpbmdoIiwiYSI6ImNrdnliZzN4NTBxNmgydXFpb3pud2xwNnUifQ.eWhjUxj8a-KGWUOTiG9Msw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCordinates(data.features[0].center);
      });
  };
  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropCoordinates(dropoff);
  }, [pickup, dropoff]);
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/Search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      {/* Map */}
      <Map
        pickupCordinates={pickupCordinates}
        dropoffCordinates={dropoffCordinates}
      />
      {/* bottom box */}
      <RideContainer>
        <RideSelector
          pickupCordinates={pickupCordinates}
          dropoffCordinates={dropoffCordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const RideContainer = tw.div`
flex flex-col flex-1 h-1/2
`;
const Wrapper = tw.div`
flex h-screen flex-col flex-1 h-1/2
`;

const ConfirmButtonContainer = tw.div`
border-t-2
`;
const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 text-center py-4 text-xl
`;

const BackButton = tw.img`
h-full object-contain`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white showdow-md cursor-pointer
`;
