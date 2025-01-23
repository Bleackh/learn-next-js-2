import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Pagination({ href, page, pageCount }) {
    return (
        <div className="flex gap-3 pb-3">
            <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
                <ChevronLeftIcon className="w-4 h-4" />
            </PaginationLink>
            <span>
                Page {page} of {pageCount}
            </span>
            <PaginationLink
                href={`${href}?page=${page + 1}`}
                enabled={page < pageCount}
            >
                <ChevronRightIcon className="w-4 h-4" />
            </PaginationLink>
        </div>
    );
}

function PaginationLink({ children, href, enabled }) {
    if (!enabled) {
        return (
            <span className="px-3 py-1 rounded border text-gray-200  border-gray-300 cursor-not-allowed">
                {children}
            </span>
        );
    }
    return (
        <Link
            href={href}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200"
        >
            {children}
        </Link>
    );
}