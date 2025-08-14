
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className="relative h-16 w-16">
                <div className="absolute h-full w-full rounded-full border-2 border-t-amber-400 border-l-amber-400 border-r-slate-700 border-b-slate-700 animate-spin"></div>
                <div className="absolute h-full w-full rounded-full border-2 border-t-red-600 border-l-red-600 border-r-slate-700 border-b-slate-700 animate-spin [animation-delay:-0.2s]"></div>
                <div className="flex h-full w-full items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </div>
            <p className="text-amber-300 font-cinzel tracking-wider">Forjando una Leyenda...</p>
        </div>
    );
};

export default Loader;
