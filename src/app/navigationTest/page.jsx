"use client"
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const navigationTestPage = () => {
    //CLIENT SIDE NAVIGATION KE LIYE USE KRTE HAI BELOW ONES
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const q = searchParams.get("q")
    console.log(q)

    const handleClick = () => {
        console.log("I am clicked")
        router.forward()
    }

    return (
        <div>
            {/* <Link href="/" prefetch={false}>Click Here</Link> */}
            <button onClick={handleClick}>Click Me</button>
        </div>
    )
}

export default navigationTestPage