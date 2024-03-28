import React from 'react'
import logo from './logo.svg'
import './App.css'
import AppConfig from './config/app'

function App() {
    console.log(AppConfig.IMAGES_API_ENDPOINT)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="w-24 aspect-square animate-spin" alt="logo"/>
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>

                {/*<ImageCarousel/>*/}
            </header>
        </div>
    )
}

export default App
