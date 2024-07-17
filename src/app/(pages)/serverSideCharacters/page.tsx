import Link from "next/link";
import React from "react";

function serverSideCharactersPage() {
  return (
    <div>
      <h1>Here you can see all the character from every season ordered by page</h1>

      <Link href="/serverSideCharacters/1">Show me the first page</Link>
    </div>
  );
}

export default serverSideCharactersPage;
