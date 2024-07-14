"use client";
import Link from "next/link";
import styles from "./Characters.module.scss";
import { ApiResponse, Character, Info } from "@/app/models/custom-types";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Characters = () => {
  const [data, setData] = useState<Character[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  //! useRouter() used for URL Query Parameter (ex.. http://localhost:3000/characters?page=1)
  const router = useRouter();
  //! useSearchParams() used to get the URL Query Parameter from URL
  const searchParams = useSearchParams();
  const queryPage: any = searchParams.get("page");

  const getCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${queryPage}`);
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
      //! Push the ?page=* into URL as parameter in every next
      router.push(`?page=${pages + 1}`);
    }
  };

  const prev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPages(queryPage - 1);
    //! Push the ?page=* into URL as parameter in every prev
    router.push(`?page=${queryPage - 1}`);
  };

  useEffect(() => {
    // const pageNumber = queryPage ? parseInt(queryPage) : 1;
    const pageNumber = queryPage ? Number(queryPage) : 1;
    setPages(pageNumber);
  }, [queryPage]);

  useEffect(() => {
    getCharacters();
  }, [pages, queryPage]);

  return (
    <>
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
                    <Link className={styles.more_btn} href={`/characters/${character.id}`}>
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
          <button className={styles.paging_btn} onClick={prev} disabled={queryPage === null || queryPage === "1" ? true : false}>
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
