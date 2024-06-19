"use client"

import { useState } from "react";
import Categories from "./components/Categories";
import PropertyList from "./components/properties/PropertyList";
import Pagination from "./components/properties/Pagination";

export default function Home() {

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <Categories />
       <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PropertyList page={page} setTotalPages={setTotalPages} />
      </div>
       <div className="flex justify-center mt-6">
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
