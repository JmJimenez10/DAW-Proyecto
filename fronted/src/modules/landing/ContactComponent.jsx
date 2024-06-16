import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GifVerification from "../../assets/gifs/verification.gif";
import { Modal } from "../core/components/utils/Modal";

export const ContactComponent = () => {
  const refForm = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recaptchaRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si el reCAPTCHA está completado
    if (!recaptchaValue) {
      setRecaptchaError(true);
      return;
    }

    const serviceId = "service_doidig8";
    const templateId = "template_7t3dzm4";
    const apikey = "fb54rEXjHznOChKPf";

    emailjs
      .sendForm(serviceId, templateId, refForm.current, apikey)
      .then(() => {
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
        recaptchaRef.current.reset();
        refForm.current.reset();
        setRecaptchaValue(null);
        setRecaptchaError(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
    setRecaptchaError(false);
  };

  return (
    <section id="hazteCliente" className="relative">
      <div className="absolute top-0 z-[-3] h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className="absolute z-[-2] h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div>
        <h3 className="pt-24 text-center text-3xl sm:text-5xl md:text-7xl text-dark-blue font-bold">Hazte Cliente</h3>
        <h3 className="text-center text-2xl md:text-3xl text-clear-blue font-bold mt-7">Contacta con nosotros sin compromiso</h3>
        <article className="flex justify-evenly items-center">
          <form action="" ref={refForm} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <div className="relative w-full md:min-w-[400px] lg:min-w-[600px] h-10">
              <input
                required
                id="username"
                name="username"
                type="text"
                className="peer w-full h-full bg-white text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                placeholder=" "
              />
              <label htmlFor="username" className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                Nombre
              </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
              <input
                required
                id="email"
                name="email"
                type="email"
                className="peer w-full h-full bg-white text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                placeholder=" "
              />
              <label htmlFor="email" className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                Correo
              </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
              <input
                required
                id="telephone"
                name="telephone"
                type="number"
                className="peer w-full h-full bg-white text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                placeholder=" "
              />
              <label htmlFor="telephone" className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                Teléfono
              </label>
            </div>
            <div className="relative w-full min-w-[200px] h-10">
              <textarea
                required
                id="message"
                name="message"
                className="resize-none peer w-full h-[200px] bg-white text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                placeholder=" "
              />
              <label htmlFor="message" className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                Mensaje
              </label>
            </div>
            <div className={`mt-[150px] mx-auto ${recaptchaError ? "border-2 border-red-500 rounded" : ""}`}>
              <ReCAPTCHA ref={recaptchaRef} sitekey="6LfjBe0pAAAAAD3_p8VkNc5rTazV78OgJA_v7-eY" onChange={onChange} />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="mt-5 mb-3 primary-button">
                Enviar
              </button>
            </div>
          </form>
        </article>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img src={GifVerification} alt="gif de verificación" />
      </Modal>
    </section>
  );
};
