import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Header() {
    const pathname = usePathname()

    return (
        <header style={{
            background: 'orange',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>Checkpoint : frontend</h1>
            {pathname !== '/' &&
                <Link href="/" style={{position: 'absolute', left: 10}}>Countries</Link>
            }
        </header>
    );
}
