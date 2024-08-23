"use client"

import { ThemeProvider as NextThemeProvider} from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useState, useEffect } from "react";

export default function ThemeProvider({
    children,
    ...props }: ThemeProviderProps
    ) {

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
    mounted && <NextThemeProvider {...props}>
    {children}
    </NextThemeProvider>
    );

}
