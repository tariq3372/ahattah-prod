import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../hooks/useMediaQuery";

import { delay, motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { SlCallOut, SlLocationPin } from "react-icons/sl";
import Dropdownv2 from "../components/Dropdownv2";
// import Selector from '../components/Selector';

import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import emailjs from "@emailjs/browser";

import ar from "../lng/ar.json";
import en from "../lng/en.json";
import { useRef } from "react";

const Selector = ({ selected, setSelected, people }) => {
  const { t, i18n } = useTranslation();
  // Data
  useEffect(() => {
    if (i18n.language === "عربي") {
      setSelected({ name: "اختر الباقة" });
    } else {
      setSelected({ name: "Select Package" });
    }
  }, []);

  return (
    <div
      className={`w-full md:w-[1200px] ${
        i18n.language === "عربي" ? "font-reem" : "font-noto"
      }`}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative h-full flex">
          <Listbox.Button
            className={`relative w-full cursor-default rounded md:rounded-none bg-white py-2 pl-5 pr-5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm ${
              i18n.language === "عربي" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`pointer-events-none absolute inset-y-0 ${
                i18n.language === "عربي" ? "left-0" : "right-0"
              } flex items-center p-2`}
            >
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <span className={`block truncate text-[0.9rem]`}>
              {selected.name}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm ${
                i18n.language === "عربي" ? "text-right" : "text-left"
              }`}
            >
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-5 pr-4 ${
                      active
                        ? "bg-mettalic-gold text-russian-violet"
                        : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-medium"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const Contact = ({
  contact,
  contactContent,
  or,
  name,
  email,
  phone,
  selectPackage,
  submit,
  location,
  whatsapp,
  call,
}) => {
  const { t, i18n } = useTranslation();
  const form = useRef();
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(false);

  const ale = () => {
    if (i18n.language === "عربي") {
      alert("تم توجيه النموذج بنجاح!");
    } else {
      alert("Form routed Successfully!");
    }
  };
  const onSubmit = async (e) => {
    setLoading(true);
    let url = "";
    let message = "";
    if (i18n.language === "عربي") {
      message =
        "تفاعل جديد من موقع الويب الخاص بك:" +
        "%0a" +
        "%0aاسم     = " +
        e.Name +
        "%0aعنوان الايميل = " +
        e.Email +
        "%0aهاتف    = " +
        e.Phone +
        "%0aالحزمة المختارة     = " +
        selected.name;
    } else {
      message =
        "New Interaction from your Website:%0a%0aName     = " +
        e.Name +
        "%0aEmail ID = " +
        e.Email +
        "%0aPhone    = " +
        e.Phone +
        "%0aPackage     = " +
        selected.name;
    }
    const data = {
      name: e.Name,
      email: e.Email,
      phone: e.Phone,
      package: selected.name,
    };
    emailjs
      .sendForm(
        "service_yer6ord",
        "template_9ll4rmr",
        form.current,
        "RSdkf6Nl91aIQzpDy"
      )
      .then(
        (result) => {
          if (i18n.language === "عربي") {
            reset();
            alert("تم ارسال طلبك بنجاح.");
            setLoading(false);
          } else {
            reset();
            alert("Your request has been sent successfully!");
            setLoading(false);
          }
        },
        (error) => {
          if (i18n.language === "عربي") {
            alert("حدث خطأ ما حاول مرة أخرى لاحقًا!");
            setLoading(false);
          } else {
            alert("Something Went Wrong Try Again Later!");
            setLoading(false);
          }
        }
      );
    // if (isAboveSmallScreens) {
    //   url = `https://web.whatsapp.com/send?phone=+966508188743&text=${message}&app_absent=0`;
    // } else {
    //   url = `https://api.whatsapp.com/send?phone=+966508188743&text=${message}&app_absent=0`;
    // }
    // route.push(url);
    // e.preventDefault();
    // window.open(url, "_blank");
    // ale();
  };

  // const [selectedValue, setSelectedValue] = useState(null);

  // Data
  let def = i18n.language === "عربي" ? "اختر الباقة" : "Select Package";
  let packT1 =
    i18n.language === "عربي"
      ? ar.package.package01.title
      : en.package.package01.title;
  let packT2 =
    i18n.language === "عربي"
      ? ar.package.package02.title
      : en.package.package02.title;
  let packT3 =
    i18n.language === "عربي"
      ? ar.package.package03.title
      : en.package.package03.title;
  let packT4 =
    i18n.language === "عربي"
      ? ar.package.package04.title
      : en.package.package04.title;

  let people = [
    { name: packT1 },
    { name: packT2 },
    { name: packT3 },
    { name: packT4 },
  ];
  let options = [packT1, packT2, packT3, packT4];
  let def_arr = { name: def };

  // const [selected, setSelected] = useState(def_arr)
  const [selected, setSelected] = useState(def_arr);

  const {
    register,
    reset,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (e) => {
  //   const isValid = await trigger();
  //   if (!isValid) {
  //     e.preventDefault();
  //   }
  // }

  return (
    <section
      data-section
      id="contact"
      className={`py-10 ${
        i18n.language === "Arabic" || "عربي" ? "font-reem" : "font-noto"
      }`}
    >
      <div
        className={`mt-24 px-5 md:px-10 py-10 bg-metalic-grey/80 w-full rounded-lg`}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.2 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h2 className="text-mettalic-gold text-2xl font-bold z-10 text-center uppercase">
            {contact}
          </h2>

          <p className="mt-5 mb-8 text-md text-center font-medium">
            {contactContent}
          </p>
          {/* {i18n.language === 'عربي' ? setSelected(selected) : setSelected(selected) } */}
          <form
            ref={form}
            target="_blank"
            // onSubmit={onSubmit}
            // action="https://formsubmit.co/abdullah@ahattah.com"
            method="POST"
          >
            {i18n.language === "عربي" ? (
              <div className="flex flex-col-reverse justify-center md:flex-row md:space-x-3 text-russian-violet">
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  className="mt-5 md:mt-0 rounded mb-3 md:rounded-none md:mb-0 md:rounded-l-lg bg-mettalic-gold px-8 py-1.5"
                >
                  {submit}
                </button>

                <Selector
                  selected={selected}
                  setSelected={setSelected}
                  people={people}
                />
                <input
                  type="hidden"
                  name="Selected Package"
                  value={selected.name}
                  {...register("Package", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                {/* <Dropdownv2/> */}
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2 text-right"
                  type="text"
                  placeholder={phone}
                  {...register("Phone", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2 text-right"
                  type="text"
                  placeholder={email}
                  {...register("Email", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 md:rounded-r-lg bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2 text-right"
                  type="text"
                  placeholder={name}
                  {...register("Name", {
                    required: true,
                    maxLength: 50,
                  })}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center md:flex-row md:space-x-3 text-russian-violet">
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 md:rounded-l-lg bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2"
                  type="text"
                  placeholder={name}
                  {...register("Name", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2"
                  type="text"
                  placeholder={email}
                  {...register("Email", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <input
                  className="w-full rounded mb-3 md:rounded-none md:mb-0 bg-white text-[1rem] font-normal placeholder-olive/75 px-5 py-2"
                  type="text"
                  placeholder={phone}
                  {...register("Phone", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                <Selector
                  selected={selected}
                  setSelected={setSelected}
                  people={people}
                />
                <input
                  type="hidden"
                  name="Selected Package"
                  value={selected.name}
                  {...register("Package", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                {/* <Dropdownv2/> */}
                {/* <input
                        className='w-full rounded mb-3 md:rounded-none md:mb-0 bg-white text-sm font-normal placeholder-olive/75 px-5 py-2'
                        type='text'
                        placeholder={selectPackage}
                        {...register("name",{
                            required: true,
                            maxLength: 20,
                        })}
                    /> */}
                {!loading ? (
                  <button
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="mt-5 md:mt-0 rounded mb-3 md:rounded-none md:mb-0 md:rounded-r-lg bg-mettalic-gold px-8 py-1.5"
                  >
                    {submit}
                  </button>
                ) : (
                  <button className="mt-5 md:mt-0 rounded mb-3 md:rounded-none md:mb-0 md:rounded-r-lg bg-mettalic-gold px-8 py-1.5">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </div>
      {/* <h2 className='text-xl mt-10 font-bold z-10 text-center uppercase'>
        {or}
    </h2> */}
      <motion.div
        class="mt-8 md:mt-16 flex flex-wrap md:flex-nowrap gap-4 text-center items-center justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.75 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <a
          href="tel:+966508188743"
          class="grid grid-cols-3 gap-2 rounded-lg group items-center text-center w-full lg:w-[300px] sm:w-[200px] bg-white lg:px-20 sm:px-10 px-20 py-3 text-sm font-bold border-russian-violet text-russian-violet shadow hover:bg-mettalic-gold border-2 hover:border-russian-violet transition duration-500"
        >
          <SlCallOut className="block col-span-1" />
          <p className="group-hover:hidden block col-span-2">{call}</p>
          <p className="group-hover:block hidden col-span-2">+966508188743</p>
        </a>

        {/* <a
                    href="tel:+966594161652"
                    class="grid grid-cols-3 items-center text-center w-full rounded bg-white lg:px-10 px-20 py-3 text-sm font-bold border-russian-violet text-russian-violet shadow hover:bg-mettalic-gold border-2 hover:border-russian-violet sm:w-auto transition duration-500"
                    >
                        <SlCallOut className='col-span-1' />
                        <p className='col-span-2'>+966594161652</p>
                    
                    </a> */}

        <a
          href="https://wa.me/966508188743"
          class="grid grid-cols-3 gap-2 rounded-lg items-center text-center w-full lg:w-[300px] sm:w-[200px] bg-white lg:px-20  sm:px-10 px-20 py-3 text-sm font-bold border-russian-violet text-russian-violet shadow hover:bg-mettalic-gold border-2 hover:border-russian-violet transition duration-500"
        >
          <SiWhatsapp className="col-span-1" />
          <p className="col-span-2">{whatsapp}</p>
        </a>

        <a class="grid grid-cols-3 gap-2 rounded-lg items-center text-center w-full lg:w-[300px] sm:w-[200px] bg-white lg:px-20 sm:px-10 px-20 py-3 text-sm font-bold border-russian-violet text-russian-violet shadow hover:bg-mettalic-gold border-2 hover:border-russian-violet transition duration-500">
          <SlLocationPin className="col-span-1" />
          <p className="col-span-2">{location}</p>
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
