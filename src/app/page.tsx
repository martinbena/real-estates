import Estates from "@/components/home-page/Estates";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <Estates />
      </Suspense>
    </main>
  );
}
