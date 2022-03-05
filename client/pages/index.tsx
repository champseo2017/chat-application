import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSockets } from "../context/socket.context";

import RoomsContainer from "../containers/Rooms";

const Home: NextPage = () => {
  const { socket } = useSockets();
  return <div>{socket.id}fe</div>;
};

export default Home;
