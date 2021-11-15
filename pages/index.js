import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const [user1, setUser1] = useState(null);
  const router = useRouter();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser1(null);
        router.push("/Login");
      }
    });
  }, []);
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        {/* Header */}
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />
          <Profile>
            <Name>{user1 && user1.name}</Name>
            <UserImage
              src={user1 && user1.photoUrl}
              onClick={() => signOut(auth)}
            />
          </Profile>
        </Header>
        {/* Action Button */}
        <ActionButtons>
          <Link href="/Search">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Wheels
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reserve
          </ActionButton>
        </ActionButtons>
        {/* input Button */}
        <InputButton>Where To?</InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const Header = tw.div`
  flex justify-between items-center
`;
const UberLogo = tw.img`
  h-20
`;
const ActionItems = tw.div`
  flex-1 p-4
`;
const Profile = tw.div`
  flex items-center 
`;

const Name = tw.div`
  mr-4 w-20 text-small
`;
const UserImage = tw.img`
  h-12 w-12 rounded-full border border-grey-200 p-px cursor-pointer
`;

const ActionButtons = tw.div`
 flex justify-between
`;
const ActionButton = tw.div`
 flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition text-xl cursor-pointer

`;
const ActionButtonImage = tw.img`
h-3/5
`;
const InputButton = tw.div`
h-20 bg-gray-200 text-xl p-4 flex items-center mt-8
`;
