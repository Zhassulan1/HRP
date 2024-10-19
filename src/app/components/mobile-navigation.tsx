import { Search, Bell, User, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes, SetStateAction, useEffect, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'

export default function MobileNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState("")

  const tabs = [
    { id: "search", icon: Search, label: "Search", path: "/" },
    // { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ]

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === pathname)
    if (currentTab) {
      setActiveTab(currentTab.id)
    }
  }, [pathname])

  const handleTabClick = (tab: { id: SetStateAction<string>; icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; label?: string; path?: string }) => {
    setActiveTab(tab.id)
    if (tab.path !== pathname && tab.path) {
      router.push(tab.path)
    }
  }



  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-[#1b1b1b] border-t border-[#2f2f2f] md:hidden">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <tab.icon className={`w-6 h-6 mb-1 ${
              activeTab === tab.id ? "text-[#bbbbbb]" : "text-gray-500"
            } group-hover:text-[#bbbbbb]`} />
            <span className="text-xs text-gray-500 group-hover:text-[#bbbbbb]">
              {tab.label}
            </span>
          </button>
        ))}


      </div>
    </div>
  )
}
