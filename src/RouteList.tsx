import { Routes, Route } from 'react-router-dom';

import Home from "./viwns/Home";
import NotFound from "./viwns/NotFound";

export const RouteList = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}