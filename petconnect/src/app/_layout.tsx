import { Slot, useRouter } from "expo-router";
import { AuthUserProvider } from "../context/authUserProvider";
import { useEffect } from "react";
import { PetProvider } from "../context/petContext";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return (
    <AuthUserProvider>
      <PetProvider>
        <Slot />
      </PetProvider>
    </AuthUserProvider>
  );
}
