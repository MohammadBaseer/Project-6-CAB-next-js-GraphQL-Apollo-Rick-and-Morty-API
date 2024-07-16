"use client";
import { Character } from "@/app/models/custom-types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ServerSideSingleCharacters.module.scss";
import Spinner from "@/Components/Spinner/Loading";
import { useRouter } from "next/navigation";
type SingleCharType = {
  params: {
    id: string;
  };
};
const SingleCharacter = ({ params: { id } }: SingleCharType) => {
  console.log("ID:::", id);

  const [data, setData] = useState<Character | null>(null);
  const [totalPages, setTotalPages] = useState<number | string>(826);

  const [pages, setPages] = useState<number | string>(id);
  const pageNumber = Number(pages);
  //! useRouter() used for URL Query Parameter
  const router = useRouter();

  const FetchSingleData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) {
        console.log("RESPONSE: failed");
        return;
      }
      const data = (await response.json()) as Character;
      setData(data);
    } catch (error) {
      console.log("Error:::", error);
    }
  };

  //!==============
  const next = () => {
    if (pageNumber !== totalPages) {
      setPages(pageNumber + 1);
      //! Push the pageNumber into URL as parameter in every next
      router.push(`${pageNumber + 1}`);
    }
  };

  const prev = () => {
    setPages(pageNumber - 1);
    //! Push the pageNumber into URL as parameter in every  prev;
    router.push(`${pageNumber - 1}`);
  };
  //!

  useEffect(() => {
    FetchSingleData();
  }, []);

  return (
    <>
      <div className={styles.box_container}>
        {!data ? (
          <Spinner />
        ) : (
          <div className={styles.image_box}>
            <Image className={styles.image} src={data.image} alt={data.name} width={300} height={300} priority />
          </div>
        )}
        {!data ? (
          <Spinner />
        ) : (
          <div className={styles.title_box}>
            <h1 className={styles.title}>{data.name}</h1>
            <h3>Species: {data.species}</h3>
            <h3>Status: {data.status}</h3>
            <h3>Gender: {data.gender}</h3>
          </div>
        )}
      </div>
      <div className={styles.paging}>
        <div>
          <button className={styles.paging_btn} onClick={prev} disabled={pageNumber === null || pageNumber === 1 ? true : false}>
            Prev
          </button>
          <button className={styles.paging_btn} onClick={next} disabled={pageNumber === totalPages ? true : false}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCharacter;
