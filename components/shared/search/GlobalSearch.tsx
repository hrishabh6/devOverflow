/* eslint-disable */
"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null)
  const query = searchParams.get("q");
  
  useEffect(() => {
    const handleClickOutside = (event : any) => {
      // @ts-ignore
      if(searchContainerRef.current &&  !searchContainerRef.current.contains(event.target)){
        setopen(false)
        setSearch('')
      }
    }
    setopen(false)
    document.addEventListener("click", handleClickOutside); 

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
    
  }, [pathname])
  

  const [search, setSearch] = useState(query || "");
  const [open, setopen] = useState(false)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else { 
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search,   pathname, router, searchParams, query]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden " ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search anything globally..."
          value={search}
          className="no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none bg-transparent"
          onChange={(e)=> {
            setSearch(e.target.value)
            if(!open){
              setopen(true)
            }
            if(e.target.value === ""){
              setopen(false)
            }
          }}
          
        />
      </div>
      {open && <GlobalResult/>}
    </div>
  );
};

export default GlobalSearch;
