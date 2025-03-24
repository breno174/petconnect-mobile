import { Slot } from "expo-router";
import { AuthUserProvider } from "../context/authUserProvider";

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <AuthUserProvider>
            <Slot />
        </AuthUserProvider>
    );
}