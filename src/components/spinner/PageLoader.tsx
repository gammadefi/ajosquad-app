import clsx from 'clsx'
import React from 'react'

const PageLoader = () => {
    return (
        <div
            className={clsx(
                "h-full w-full",
                "grid place-content-center place-items-center bg-transparent"
            )}
        >
            <img src={"/logo.svg"} className="animate-pulse h-32 w-32" alt="logo" />
        </div>
    )
}

export default PageLoader