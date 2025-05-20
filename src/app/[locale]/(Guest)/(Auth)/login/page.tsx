import { AuthPictureDescrition } from "@/lib/ui/forms/auth/AuthPictureDescrition";
import LoginForm from "@/lib/ui/forms/auth/login/LoginForm";

export default function login() {
    return (
        <>
            <LoginForm/>
            <AuthPictureDescrition src="/login.png" alt="Login picture"/>
        </>
    )
}