"use client";
import { useState } from "react";
import styles from "./ItemPagination.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PageNumberPropsType = {
  currentPage: number;
};

const ItemPagination = ({ currentPage }: PageNumberPropsType) => {
  const [totalPages, setTotalPages] = useState<number | string>(826);
  const [pages, setPages] = useState<number | string>(currentPage);
  const router = useRouter();
  //!==============
  const next = () => {
    if (currentPage !== totalPages) {
      setPages(currentPage + 1);
      //! one way of changing both page number and id number in url
      router.push(`/serverSideCharacters/${Math.ceil((currentPage + 1) / 20)}/${currentPage + 1}`);
    }
  };

  const prev = () => {
    setPages(currentPage - 1);
    //! one way of changing both page number and id number in url
    router.push(`/serverSideCharacters/${Math.ceil((currentPage - 1) / 20)}/${currentPage - 1}`);
  };

  return (
    <div className={styles.paging}>
      <div>
        <Link className={styles.paging_btn} href={`/clientSideCharacter/${Math.ceil(currentPage / 20)}`}>
          {" "}
          back
        </Link>
        <button className={styles.paging_btn} onClick={prev} disabled={currentPage === null || currentPage === 1 ? true : false}>
          Prev
        </button>
        <button className={styles.paging_btn} onClick={next} disabled={currentPage === totalPages ? true : false}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemPagination;
