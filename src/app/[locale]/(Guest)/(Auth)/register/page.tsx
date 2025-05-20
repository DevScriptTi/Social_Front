import { AuthPictureDescrition } from "@/lib/ui/forms/auth/AuthPictureDescrition";
import RegisterForm from "@/lib/ui/forms/auth/register/RegisterForm";

export default function login() {
    return (
        <>
            <RegisterForm/>
            <AuthPictureDescrition src="/login.png" alt="Login picture"/>
        </>
    )
}