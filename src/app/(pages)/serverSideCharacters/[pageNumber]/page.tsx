import Link from "next/link";
import styles from "./Characters.module.scss";
import { ApiResponse, Character, Info } from "@/app/models/custom-types";
import Pagination from "@/Components/Pagination/PagePagination/page";

type paramsType = {
  params: {
    pageNumber: string;
  };
};
const Characters = async ({ params }: paramsType) => {
  const pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 1;

  //! To Get the Characters Data
  const getCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
      if (!response.ok) {
        console.log("RESPONSE: failed");
        return [];
      }
      const result = (await response.json()) as ApiResponse;
      return result.results;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const data = await getCharacters();

  return (
    <>
      <h1> Server Side Rendering (SSR)</h1>
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
                    <Link className={styles.more_btn} href={`/serverSideCharacters/${pageNumber}/${character.id}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
      <Pagination pageNumber={pageNumber} />
    </>
  );
};

export default Characters;
