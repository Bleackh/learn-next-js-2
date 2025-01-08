import React from 'react'

export default function Layour({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="vi ewport" content="width=device-width, initial-scale=1.0" />
                <title>Learn Next JS</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
