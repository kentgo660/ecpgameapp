import { NextResponse } from "next/server";

export function middleware(request){

    const user = request.cookies.get("ecpUser");
    const disclaimer = request.cookies.get("ecpDisclaimerAccepted");
    const pathname = request.nextUrl.pathname;

    const protectedRoutes = [
        "/dashboard",
        "/stages",
        "/leaderboard",
        "/gamecompleted",
        "/championship",
        "/bonus",
        "/badges"
    ];

    const isProtected = protectedRoutes.some(
            (route) => 
                pathname.startsWith(route)
    );

    if (isProtected && !user) {
        return NextResponse.redirect(
            new URL(
                "/",
                request.url
            )
        );
    }

    if (
        pathname.startsWith(
            "/dashboard"
        ) &&
        !disclaimer
    ) {

        return NextResponse.redirect(
            new URL(
                "/disclaimer",
                request.url
            )
        );

    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/stages/:path*",
        "/leaderboard/:path*",
        "/badges/:path*",
        "/gamecompleted/:path*",
        "/bonus/:path*",
        "/championship/:path*",
        
        
    ],
};