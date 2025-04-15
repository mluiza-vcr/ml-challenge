export default function StarWarsTextIntro() {
  return (
    <div className="relative overflow-hidden bg-black text-yellow-400 flex items-center justify-center h-screen">
      <div className="perspective w-full h-full">
        <div className="animate-crawl text-center preserve-3d text-xl max-w-2xl mx-auto leading-relaxed opacity-100 will-change-transform">
          <p className="mb-4">
            Há muito tempo, em uma galáxia muito, muito distante...
          </p>
          <h1 className="text-3xl font-bold mb-6">STAR WARS</h1>
          <p>
            Episódio IV <br />
            UMA NOVA ESPERANÇA <br />
            <br />É um período de guerra civil. <br />
            <br />
            Naves rebeldes, atacando a partir de uma base secreta, conquistaram
            sua primeira vitória contra o maligno Império Galáctico. <br />
            <br />
            Durante a batalha, espiões rebeldes conseguiram roubar planos
            secretos da arma definitiva do Império, a ESTRELA DA MORTE, uma
            estação espacial blindada com poder suficiente para destruir um
            planeta inteiro.
            <br />
            <br /> Perseguida pelos agentes sinistros do Império, a Princesa
            Leia corre para casa a bordo de sua nave, guardiã dos planos
            roubados que podem salvar seu povo e restaurar a liberdade à
            galáxia.
          </p>
        </div>
      </div>
    </div>
  );
}
