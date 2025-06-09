'use client';

import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <PageContent />
    </div>
  );
}
