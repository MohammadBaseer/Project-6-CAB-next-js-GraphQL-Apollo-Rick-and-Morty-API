"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SelectEpisodes = () => {
  const route = useRouter();
  return (
    <div>
      <label htmlFor="select">Choose a season:</label>
      <select
        name="episode"
        id="select"
        onChange={(e) => {
          route.push(`?epi=${e.target.value}`);
        }}
      >
        <option value="S01">One</option>
        <option value="S02">Two</option>
        <option value="S03">Three</option>
        <option value="S04">Four</option>
        <option value="S05">Five</option>
      </select>
    </div>
  );
};

export default SelectEpisodes;
