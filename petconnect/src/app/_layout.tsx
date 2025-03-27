import { Slot, useRouter } from "expo-router";
import { AuthUserProvider } from "../context/authUserProvider";
import { useEffect } from "react";

export default function Root() {
    return (
        <AuthUserProvider>
            <Slot />
        </AuthUserProvider>
    );
}