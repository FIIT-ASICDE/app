import Link from 'next/link';
import { Button } from '../../ui/button';
import Image from 'next/image'

export default function HeaderLoggedIn() {
  return (
    <header className="bg-gray-800 text-white p-1">
      <div className="container mx-auto pr-0 flex justify-between items-center">
        <div className="flex items-center space-x-2 p-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-gray-800 font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl">ASICDE</span>
        </div>
        <nav>
          <ul className="flex space-x-1">
            <li className="p-1">
              <Link href={"/classrooms"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  Classrooms
                </Button>
              </Link>
            </li>
            <li className="p-1">
              <Link href={"/repositories"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  Repositories
                </Button>
              </Link>
            </li>
            <li className="p-1.5 px-6">
              <Link href={"/profile"}>
                <button className="rounded-full p-1.5 bg-white hover:bg-gray-400">
                  <Image
                    src={"/icons/UserIcon.webp"}
                    alt="User Icon"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}