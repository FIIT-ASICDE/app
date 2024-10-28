import Link from 'next/link';
import { Button } from '../../ui/button';

export default function HeaderDefault() {
  return (
    <header className="bg-gray-800 text-white p-1">
      <div className="container mx-auto pr-5 flex justify-between items-center">
        <div className="flex items-center space-x-2 p-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-gray-800 font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl">ASICDE</span>
        </div>
        <nav>
          <ul className="flex space-x-1">
            <li className="p-1">
              <Link href={"/"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  Home
                </Button>
              </Link>
            </li>
            <li className="p-1">
              <Link href={"/about"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  About Us
                </Button>
              </Link>
            </li>
            <li className="p-1">
              <Link href={"/features"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  Features
                </Button>
              </Link>
            </li>
            <li className="p-1">
              <Link href={"/pricing"}>
                <Button variant="default" className="text-base font-normal px-6 bg-gray-800 hover:bg-gray-700">
                  Pricing
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}