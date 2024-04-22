import useSWR from "swr";
import { SWRProvider } from "./lib/client/swr-provider";
import SWRTester from "@/components/SWRTester";

export default function Home() {
  return (
    <SWRProvider>
      <SWRTester />
    </SWRProvider>
  );
}
