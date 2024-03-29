import React from 'react'
import logo from './logo.svg'
import './App.css'
import useImages from './hooks/useImages'
import AppConfig from './config/app'
import InfiniteCarousel from './components/InfiniteCarousel'

function App() {
    const { images, isLoading } = useImages(AppConfig.IMAGES_API_ENDPOINT as string);

    if(isLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="w-24 aspect-square animate-spin" alt="logo"/>
                    <h1 className="text-3xl font-bold underline">
                        Loading...
                    </h1>
                </header>
            </div>
        )
    }

    return (
        <div className="App bg-gray-800 h-screen w-full">
            <header className="App-header w-full">
                <img src={logo} className="w-24 aspect-square animate-spin" alt="logo"/>
                <InfiniteCarousel images={images}/>
            </header>
        </div>
    )
}

export default App
