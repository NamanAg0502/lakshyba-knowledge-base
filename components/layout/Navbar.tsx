"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ScaleIcon,
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/Button";

const navigation = [
  { name: "Home", href: "/", icon: BookOpenIcon },
  { name: "Documents", href: "/documents", icon: DocumentTextIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm">
      <nav
        className="container max-w-7xl mx-auto px-4 flex items-center justify-between py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <ScaleIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-neutral-900">
              Legal KB
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center text-sm font-medium px-3 py-2 rounded-md ${
                pathname === item.href
                  ? "text-primary-600 bg-primary-50"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <item.icon className="h-5 w-5 mr-1.5" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button size="sm" onClick={() => router.push("/upload")}>
            <ArrowUpTrayIcon className="h-4 w-4 mr-1.5" />
            Upload Document
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <ScaleIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-semibold text-neutral-900">
                Legal KB
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-neutral-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-medium ${
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50"
                        : "text-neutral-900 hover:bg-neutral-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-6 w-6 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button className="w-full" asChild>
                  <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                    Upload Document
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
