"use client";
import { ApiResponse, Character } from "@/app/models/custom-types";
import styles from "./Pagination.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type pageNumberPropsType = {
  pageNumber: number;
};

const Pagination = ({ pageNumber }: pageNumberPropsType) => {
  const router = useRouter();
  const [pages, setPages] = useState<number>(pageNumber);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  //! To Get the Characters Total Pages
  const TotalPages = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!response.ok) {
        console.log("RESPONSE: failed");
      }
      const result = (await response.json()) as ApiResponse;
      const totalPagesCount = result.info.pages;
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const next = () => {
    setPages(pages + 1);
    //     //! Push the ?page=* into URL as parameter in every next
    router.push(`${pages + 1}`);
  };

  const prev = () => {
    setPages(pages - 1);
    //     //! Push the ?page=* into URL as parameter in every next
    router.push(`${pages - 1}`);
  };

  useEffect(() => {
    TotalPages();
  }, []);

  return (
    <div className={styles.paging}>
      <div>
        <button className={styles.paging_btn} onClick={prev} disabled={pages === 1 ? true : false}>
          {"<"}
        </button>

        <button className={styles.paging_btn} onClick={next} disabled={pages === totalPages && totalPages ? true : false}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
