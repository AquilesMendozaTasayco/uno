export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D0021B]">
      <div className="w-[1060px] min-h-[480px] flex items-center justify-between px-[60px] py-10 gap-10">

        {/* LEFT: Image */}
        <div className="flex-[0_0_480px] h-[360px] rounded-xl overflow-hidden">
          <img
            src="/recurso.png"
            alt="Recurso"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col items-start gap-7">

          {/* LOGO */}
          <div className="w-full max-w-[400px]">
            <img
              src="/logo_uno.png"
              alt="UNO Publicidad"
              className="w-full h-auto"
            />
          </div>

          {/* CONTACTS */}
          <div className="flex flex-col gap-[18px] w-full">

            <div className="flex items-center gap-3.5 text-white text-base">
              <div className="w-[42px] h-[42px] border-2 border-white/55 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span>Av. Espa&ntilde;a <strong>125</strong> - Trujillo</span>
            </div>

            <div className="flex items-center gap-3.5 text-white text-base">
              <div className="w-[42px] h-[42px] border-2 border-white/55 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <span>Jparedes@unopubli.com</span>
            </div>

            <div className="flex items-center gap-3.5 text-white text-base">
              <div className="w-[42px] h-[42px] border-2 border-white/55 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span>952 <strong>729</strong> 457</span>
            </div>

          </div>

          {/* CTA */}
          <button className="mt-1 bg-transparent border-2 border-white text-white font-bold text-[15px] tracking-[.05em] px-9 py-3.5 rounded-full cursor-pointer whitespace-nowrap hover:bg-white hover:text-[#D0021B] transition-colors duration-200">
            Descargar Brochure
          </button>

        </div>
      </div>
    </div>
  );
}
