"use client";
import { Character } from "@/app/models/custom-types";
import Image from "next/image";
import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./SignalCharacter.module.scss";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/Spinner/Loading";
import Link from "next/link";
type SingleCharType = {
  params: {
    id: string;
  };
};

const SingleCharacter = ({ params: { id } }: SingleCharType) => {
  const [data, setData] = useState<Character | null>(null);
  const [totalPages, setTotalPages] = useState<number | string>("826");
  const [pages, setPages] = useState<number | string>(id);
  const pageNumber = Number(pages);
  // const [spinner, setSpinner] = useState(false);

  // console.log("id Type::", typeof pages);
  // console.log("pages::", pages);
  // //! useRouter() used for URL Query Parameter (ex.. http://localhost:3000/characters?page=1)
  const router = useRouter();
  // // //! useSearchParams() used to get the URL Query Parameter from URL
  // const searchParams = useSearchParams();
  // const queryPage: any = searchParams.get("");
  // // //!SECTION
  // console.log("queryPage:::", queryPage);

  const getDataByID = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${pages}`);
      // setSpinner(true);
      if (!response.ok) {
        console.log("RESPONSE: failed");
        return;
      }
      const result = (await response.json()) as Character;
      setData(result);
      // setSpinner(false);
    } catch (error) {
      console.log("error::", error);
      // setSpinner(false);
    }
  };

  const next = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pageNumber !== totalPages) {
      setPages(pageNumber + 1);
      //! Push the ?page=* into URL as parameter in every next
      router.push(`${pageNumber + 1}`);
    }
  };

  const prev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPages(pageNumber - 1);
    //! Push the ?page=* into URL as parameter in every prev
    router.push(`${pageNumber - 1}`);
  };

  useEffect(() => {
    getDataByID();
  }, [pages, pageNumber]);

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
          <Link className={styles.paging_btn} href={"/characters"}>
            {" "}
            back
          </Link>
          <button className={styles.paging_btn} onClick={prev} disabled={pageNumber === null || pageNumber === 1 ? true : false}>
            Prev
          </button>
          <button className={styles.paging_btn} onClick={next} disabled={pages === totalPages ? true : false}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCharacter;
