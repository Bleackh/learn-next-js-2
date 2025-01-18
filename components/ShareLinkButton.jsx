'use client'

import { useState } from "react"
import { LinkIcon } from '@heroicons/react/24/outline'

export default function ShareLinkButton() {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href); setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <button type="button" onClick={handleClick} className="flex gap-1 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1.5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={copied}>
            <LinkIcon className="h-4 w-4" />
            {copied ? 'Link Copied!' : 'Share Link'}
        </button>
    )
}