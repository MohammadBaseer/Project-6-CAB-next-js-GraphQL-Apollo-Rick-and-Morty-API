"use client";
import Link from "next/link";
import styles from "./Characters.module.scss";
import { ApiResponse, Character, Info } from "@/app/models/custom-types";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type paramsType = {
  params: {
    pageNumber: string;
  };
};
const Characters = ({ params }: paramsType) => {
  const CurrentPage = params.pageNumber ? parseInt(params.pageNumber) : 1;

  const [data, setData] = useState<Character[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  const router = useRouter();

  const getCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${CurrentPage}`);
      if (!response.ok) {
        console.log("RESPONSE: failed");
        return;
      }
      const result = (await response.json()) as ApiResponse;
      setData(result.results);
      setTotalPages(result.info.pages);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const next = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pages !== totalPages) {
      setPages(pages + 1);
      router.push(`${pages + 1}`);
    }
  };

  const prev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPages(CurrentPage - 1);
    router.push(`${CurrentPage - 1}`);
  };

  useEffect(() => {
    setPages(CurrentPage);
  }, [CurrentPage]);

  useEffect(() => {
    getCharacters();
  }, [pages, CurrentPage]);

  return (
    <>
      <h1> Client Side Rendering (CSR)</h1>
      <div className={styles.item_box}>
        {data &&
          data.map((character) => {
            return (
              <div className={styles.item} key={character.id}>
                <div className={styles.card_inner}>
                  <div className={styles.card_front}>
                    <img className={styles.item_image} src={character.image} alt="Photo" />
                  </div>
                  <div className={styles.card_back}>
                    <h1>{character.name}</h1>
                    <Link className={styles.more_btn} href={`/clientSideCharacter/${CurrentPage}/${character.id}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
      <div className={styles.paging}>
        <div>
          <button className={styles.paging_btn} onClick={prev} disabled={CurrentPage === null || CurrentPage === 1 ? true : false}>
            {"<"}
          </button>
          <button className={styles.paging_btn} onClick={next} disabled={pages === totalPages ? true : false}>
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Characters;
