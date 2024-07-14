import { Character } from "@/app/models/custom-types";
import Image from "next/image";
import React from "react";
import styles from "../Characters.module.scss";
type SingleCharType = {
  params: {
    id: string;
  };
};
const singleCharacter = async ({ params: { id } }: SingleCharType) => {
  console.log("ID:::", id);
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    console.log("RESPONSE: failed");
    return;
  }
  const result = (await response.json()) as Character;

  return (
    <div>
      <div className={styles.box_container}>
        <h1 className={styles.title}>{result.name}</h1>
        <h3>Species: {result.species}</h3>
        <h3>Status: {result.status}</h3>
        <h3>Gender: {result.gender}</h3>
        <Image className={styles.image} src={result.image} alt={result.name} width={300} height={300} priority />
      </div>
    </div>
  );
};

export default singleCharacter;
