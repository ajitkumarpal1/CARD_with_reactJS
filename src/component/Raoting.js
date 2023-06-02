import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Side } from "./Side";
import { Login } from './Login';
import { NotFound } from './notFound';
export const Raoting = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Side />}>
                    <Route path="/" element={<Side />} />
                    <Route path="/demo" element={<Side />} />
                    <Route path="/about" element={<Side />} />
                    <Route path='/todolist' element={<Side />}/>
                    <Route path='/table' element={<Side />}/>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
