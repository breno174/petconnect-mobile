import { Slot, useRouter } from "expo-router";
import { AuthUserProvider } from "../context/authUserProvider";
import { useEffect } from "react";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
    console.log("ocorre");
  }, []);

  return (
    <AuthUserProvider>
      <Slot />
    </AuthUserProvider>
  );
}
