import { useState } from "react";
import { NavLink } from "react-router-dom";
import Captura from "../../assets/CapturaWebLanding.png";
import ImgHero from "../../assets/ImgHero.svg";
import ImgHero2 from "../../assets/ImgHero2.svg";
import Logo from "../../assets/LogoJyH_NoFondo.png";
import IconUp from "../../assets/icons/arrow-narrow-up.svg";
import IconCheck from "../../assets/icons/check.svg";
import { ContactComponent } from "./ContactComponent";

export const Landing = () => {
  const servicios1 = ["Asesoramiento laboral", "Asesoramiento fiscal", "Asesoramiento financiero", "Tramitación de herencias"];
  const servicios2 = ["Asesoramiento contable", "Asesoramiento jurídico", "Tramitación compra-venta de inmuebles", "Y mucho más..."];

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <button id="btnTop" onClick={scrollToTop} className={`z-20 fixed bottom-10 right-10 bg-gray-800 text-white p-3 rounded-full shadow-md  ${visible ? "inline" : "hidden"}`}>
        <img src={IconUp} alt="flecha hacia arriba" />
      </button>
      <nav className="absolute z-50 w-full h-28">
        <div className="container flex justify-between items-center mx-auto left-0 right-0 border-b-2 border-clear-gray px-12">
          <a href="">
            <figure className="max-w-[150px]">
              <img className="w-full block" src={Logo} alt="logo de la empresa" />
            </figure>
          </a>
          <input type="checkbox" id="menu" className="peer hidden" />
          <label
            htmlFor="menu"
            className="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu peer-checked:fixed peer-checked:right-20 transition-all z-50 lg:hidden"
          ></label>

          <div className="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform lg:static lg:bg-none lg:translate-x-0 z-40">
            <ul className="text-xl font-semibold absolute bg-white inset-x-0 top-24 p-12 bg-dark-gray w-[90%] mx-auto rounded-md h-max text-center grid gap-6 xl:gap-14 text-no-white shadow-2xl lg:w-max lg:bg-transparent lg:p-0 lg:grid-flow-col lg:static">
              <li>
                <a href="#inicio" className="group relative w-max">
                  Inicio
                  <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                  <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                </a>
              </li>
              <li>
                <a href="#sobreNosotros" className="group relative w-max">
                  Sobre nosotros
                  <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                  <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="group relative w-max">
                  Servicios
                  <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                  <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                </a>
              </li>
              <li>
                <a href="#hazteCliente" className="group relative w-max">
                  Hazte cliente
                  <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                  <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-clear-blue group-hover:w-3/6"></span>
                </a>
              </li>
              <li>
                <NavLink to={"/login"} className="primary-button">
                  Acceder
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header id="inicio" className="px-5 pb-10 lg:h-[calc(100vh-3rem)] relative flex flex-col justify-center items-center ">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        <h1 className="mt-14 p-5 pt-28 text-center text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-clear-blue via-dark-blue to-clear-blue inline-block text-transparent bg-clip-text">
          Jiménez y Hormigo
        </h1>
        <h1 className="text-center text-4xl sm:text-6xl md:text-8xl font-bold text-gray-800">Asesores</h1>
        <h2 className=" text-gray-700 mt-8 text-center text-2xl md:text-4xl font-bold">
          Expertos en <span className="text-dark-blue">asesoría</span>{" "}
          <span className="bg-gradient-to-r from-dark-blue to-dark-blue/80 inline-block text-transparent bg-clip-text">
            financiera<span className="text-gray-700">,</span>
          </span>{" "}
          <span className="bg-gradient-to-r from-dark-blue/80 to-dark-blue inline-block text-transparent bg-clip-text">
            fiscal<span className="text-gray-700">,</span>
          </span>{" "}
          <span className="bg-gradient-to-r from-dark-blue to-dark-blue/80 inline-block text-transparent bg-clip-text">laboral</span> y{" "}
          <span className="bg-gradient-to-r from-dark-blue/80 to-dark-blue inline-block text-transparent bg-clip-text pb-1">jurídica</span>
        </h2>
        <h2 className="pb-16 text-gray-700 mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
          Tu despacho profesional ahora <span className="bg-gradient-to-r from-clear-blue to-dark-blue inline-block text-transparent bg-clip-text">online</span> y{" "}
          <span className="bg-gradient-to-r from-dark-blue to-clear-blue inline-block text-transparent bg-clip-text">presencial</span>
        </h2>
        <div className="container flex justify-around items-center">
          <img src={ImgHero2} alt="papeles" className="w-1/3 lg:w-1/6  left-44 bottom -rotate-12" />
          <img src={ImgHero} alt="gráfica en pantalla" className="w-1/3 lg:w-1/6  right-44 top-40 rotate-6" />
        </div>
      </header>

      <section className="relative flex flex-col justify-between">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#C9EBFF,transparent)]"></div>
        </div>

        <div id="sobreNosotros"></div>
        <div className="pt-24 px-16 xl:px-52">
          <article>
            <h3 className="text-3xl sm:text-5xl md:text-7xl text-dark-blue font-bold mb-3 md:mb-7">Sobre Nosotros</h3>
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="xl:w-2/3">
                <p className="text-xl md:text-2xl text-pretty">
                  En{" "}
                  <span className="font-bold bg-gradient-to-r from-clear-blue via-dark-blue to-clear-blue inline-block text-transparent bg-clip-text">
                    Jiménez y Hormigo ASESORES{" "}
                  </span>
                  &nbsp;somos abogados y economistas con más de un cuarto de siglo brindando asesoría financiera, fiscal, laboral y jurídica de excelencia desde nuestra fundación en 1995.
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6359.168914583795!2d-5.930458123690924!3d37.1625791471879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1277c50056d729%3A0x6509c587756e3ee3!2sJIMENEZ%20Y%20HORMIGO%20*2A%20ASESORES!5e0!3m2!1ses!2ses!4v1717443513829!5m2!1ses!2ses"
                width="600"
                height="450"
                style={{ border: 0, height: "15rem", width: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </article>

          <div id="servicios"></div>
          <article className="w-full mt-24">
            <h3 className="text-center text-3xl sm:text-5xl md:text-7xl text-dark-blue font-bold mb-10">Nuestros Servicios</h3>
            <div className="mx-auto flex flex-col md:flex-row justify-evenly gap-5 md:gap-16 lg:items-center">
              <div className="flex flex-col gap-5 text-lg md:text-xl">
                {servicios1.map((servicio) => (
                  <div className="flex gap-3 items-center font-semibold" key={servicio}>
                    <img src={IconCheck} alt="" className="size-8 drop-shadow-[0_0px_2px_rgba(34,197,94)]" />
                    <p>{servicio}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5 text-lg md:text-xl">
                {servicios2.map((servicio) => (
                  <div className="flex gap-3 items-center font-semibold" key={servicio}>
                    <img src={IconCheck} alt="" className="size-8 drop-shadow-[0_0px_2px_rgba(34,197,94)]" />
                    <p>{servicio}</p>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-center text-2xl md:text-3xl text-clear-blue font-bold mt-10">Además de eso... ¡Nuestra WEB!</h3>
            <div className="w-3/5 rounded-t-lg lg:rounded-t-3xl overflow-hidden mt-10 mx-auto">
              <img src={Captura} alt="panel de control de la web" className="w-full" />
            </div>
          </article>
        </div>
      </section>

      <ContactComponent />

      <footer className="bg-gray-800 mt-24">
        <div className="py-24 grid lg:grid-cols-3 gap-10 lg:gap-0 items-center justify-items-center">
          <section className="text-white text-center flex flex-col gap-3 text-lg col-span-1">
            <p>Los Palacios y Villafranca, Sevilla</p>
            <p>C/ Buenos Aires, Nº. 40 - 1º D</p>
            <p>Email: jimenezyhormigo@economistas.org</p>
            <p>Tlf: 95581 17 25</p>
          </section>

          <div className="w-3/5 rounded-3xl bg-gradient-to-b from-white/80 to-white/30 border border-white flex items-center justify-center">
            <img src={Logo} alt="Logo Jiménez y Hormigo Asesores" className="w-2/4 drop-shadow-[5px_9px_4px_rgba(0,0,0,0.3)]" />
          </div>

          <ul className="text-white text-start flex flex-col gap-3 text-lg list-disc col-span-1">
            <li>Términos y condiciones</li>
            <li>Política de privacidad</li>
            <li>Procesamiento de datos</li>
            <li>Manual de usuario</li>
          </ul>
        </div>

        <div className="text-center text-white backdrop-blur-lg rounded-xl pb-5">
          Made by{" "}
          <a className="underline" target="_blank" href="https://jmjimenez.dev/">
            JmJimenez.dev
          </a>{" "}
          👨‍💻
        </div>
      </footer>
    </>
  );
};
