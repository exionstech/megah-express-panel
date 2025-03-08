"use client"

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HTTPException } from "hono/http-exception"
import { ThemeProvider } from "next-themes"
import { PropsWithChildren, useState } from "react"
import ToasterNextTheme from "./toast-provider"
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const Providers = ({ children }: PropsWithChildren) => {

    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (err) => {
                        let errorMessage: string
                        if (err instanceof HTTPException) {
                            errorMessage = err.message
                        } else if (err instanceof Error) {
                            errorMessage = err.message
                        } else {
                            errorMessage = "An unknown error occurred."
                        }
                        // toast notify user, log as an example
                        console.log(errorMessage)
                    },
                }),
            })
    )

    return <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange

            >
                {children}
                <ToasterNextTheme />
            </ThemeProvider>
        </NuqsAdapter>

    </QueryClientProvider>
}
