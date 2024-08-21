import React from 'react'
import PageContainer from './page-container'
import { HeaderNavigation } from './header-navigation'
import ProfileButton from "@/components/profile-button"
import ResponsiveMenu from './responsive-menu'

export default function Header() {
    return (
        <header className="p-4 border-b">
            <PageContainer>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <ResponsiveMenu />
                        <h1 
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600"
                        >
                            Nextjs Blog
                        </h1>
                    </div>
                    
                    {/* Nav avec shadcn */}
                    <HeaderNavigation />
                    
                    {/* Buttons auth */}
                    <div className='flex items-center'>
                        {/* Toggle dark mode */}
                        <ProfileButton />
                    </div>
                </div>
            </PageContainer>
        </header>
    )
}
