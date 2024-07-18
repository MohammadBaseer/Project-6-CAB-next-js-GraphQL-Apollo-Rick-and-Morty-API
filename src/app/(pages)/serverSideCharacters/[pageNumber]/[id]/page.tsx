import { Character } from "@/app/models/custom-types";
import Image from "next/image";
import styles from "./ServerSideSingleCharacters.module.scss";
import Spinner from "@/Components/Spinner/Loading";
import ItemPagination from "@/Components/Pagination/ItemPagination/ItemPagination";

type SingleCharType = {
  params: {
    id: string;
    pageNumber: string;
  };
};
const SingleCharacter = async ({ params: { id, pageNumber } }: SingleCharType) => {
  const currentPage = Number(id);

  const FetchSingleData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) {
      console.log("RESPONSE: failed");
      return;
    }
    const data = (await response.json()) as Character;
    return data;
  };
  const data = await FetchSingleData();

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
      <ItemPagination currentPage={currentPage} />
    </>
  );
};

export default SingleCharacter;
