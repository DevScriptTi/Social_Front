export function AuthPictureDescrition({src , alt}: {src:string, alt:string}) {
    return(
        <div className="h-full w-2/3 flex items-center justify-center "> 
            <img src={src} alt={alt} className="w-full block object-fill"/>
        </div>
    )
}