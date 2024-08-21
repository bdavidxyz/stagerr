"use client"

import PageContainer from "@/components/page-container";
import PostsList from "@/components/posts-list";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/categories";
import { POSTS } from "@/utils/posts";
import Link from "next/link";

export default function Home() {

  return (
    <PageContainer>
      <div className="py-10 px-4">

        {/* First section */}
        <div 
          style={{backgroundImage:"url(/img/hero.jpg)"}}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">
                Become A Better React Developper
              </h1>
              <Input type="email" placeholder="Email" className="dark:bg-white mt-4"/>
              <Button size="lg" className="w-full py-6 text-xl mt-4">
                Subscribe to our Newsletter
              </Button>
            </div>
          </div>
        </div>

        {/* Categories section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        {
          CATEGORIES.map((category : Category)=>(
            <div key={category.id}>
              <Link href={`/categories/${category.slug}`}>
                <Button variant="outline">
                  {category.name}
                </Button>
              </Link>
            </div>
          ))
        }
        </div>

        {/* List posts section */}
        <PostsList posts={POSTS} />
      </div>
    </PageContainer>
  );
}
