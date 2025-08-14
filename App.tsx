import React, { useState } from 'react';
import type { CharacterProfile } from './types';
import { generateCharacterProfile } from './services/geminiService';
import Loader from './components/Loader';
import BrushStrokeIcon from './components/icons/BrushStrokeIcon';

const App: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [characterName, setCharacterName] = useState<string>('');
    const [profile, setProfile] = useState<CharacterProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!name.trim()) {
            setError('Por favor, introduce un nombre.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setProfile(null);
        setCharacterName(name);

        try {
            const result = await generateCharacterProfile(name);
            setProfile(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Un error desconocido ha ocurrido.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGenerate();
        }
    };

    const ProfileField = ({ label, value }: { label: string, value: string }) => (
        <div className="mb-4 break-words">
            <h3 className="text-sm font-cinzel text-amber-400 tracking-widest uppercase mb-1">{label}</h3>
            <p className="text-slate-200 text-lg">{value}</p>
        </div>
    );

    return (
        <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-3xl w-full mx-auto">
                <header className="text-center">
                    <h1 className="text-4xl md:text-6xl font-cinzel text-amber-300 mb-2">Creador de Leyendas Murim</h1>
                    <p className="text-slate-400 mb-8 md:mb-12">Inserta un nombre y forja el destino de un guerrero.</p>
                </header>

                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribe el nombre del personaje..."
                        className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-4 py-3 text-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-slate-500 w-full"
                        aria-label="Nombre del personaje"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !name.trim()}
                        className="bg-red-700 hover:bg-red-600 text-white font-bold font-cinzel py-3 px-6 rounded-md transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center sm:px-8 shrink-0"
                    >
                        {isLoading ? 'Forjando...' : 'Generar'}
                    </button>
                </div>
                
                <div className="max-w-2xl mx-auto mt-8">
                    {isLoading && <Loader />}
                    {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md" role="alert">{error}</div>}
                    {profile && (
                        <article className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg p-6 md:p-8 animate-fade-in text-left">
                            <h2 className="text-3xl font-cinzel text-amber-300 mb-6 text-center">{characterName}</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <ProfileField label="Familia" value={profile.familia} />
                                <ProfileField label="Secta" value={profile.secta} />
                            </div>
                            
                            <div className="mt-4">
                               <ProfileField label="Localización" value={profile.localizacion} />
                            </div>
                            <div className="mt-4">
                               <ProfileField label="Arte Marcial Divina" value={profile.arteMarcialDivina} />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-600/50 relative">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 pointer-events-none">
                                    <BrushStrokeIcon className="text-red-800/30" />
                                </div>
                                <h3 className="text-lg font-cinzel text-amber-400 mb-2 text-center relative">
                                    <span className="relative">Destino</span>
                                </h3>
                                <p className="text-slate-300 text-center italic text-lg">{profile.destino}</p>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </main>
    );
};

export default App;
