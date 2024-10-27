import { LocateIcon } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTiktok,
  FaTwitter,
  FaViber,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#1c252e] text-white pt-8 mt-8">
      <div className="max-w-screen-xl mx-auto px-4 mb-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/4 mb-8">
            <img
              src="https://etutorclass.com/images/logo.png"
              alt="footer-logo"
              className="mb-6"
            />
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:underline">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/tutors" className="hover:underline">
                  Find Tutors
                </a>
              </li>
              <li>
                <a href="/enquiry" className="hover:underline">
                  Live Support
                </a>
              </li>
              <li>
                <a href="/forms" className="hover:underline">
                  Forms
                </a>
              </li>
              <li>
                <a href="/free-library" className="hover:underline">
                  Free Library
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/pustaksewa-survey" className="hover:underline">
                  Pustaksewa Survey
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div className="w-full lg:w-3/4">
            <div className="mb-4 py-4">
              <h5>
                Customer Support: 10:00 AM - 6:00 PM Nepal Time (Sun - Fri)
              </h5>
              <div className="flex justify-end space-x-4">
                <a
                  href="https://www.facebook.com/etutorclass"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size={19} />
                </a>
                <a
                  href="https://wa.me/9779857084806"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={19} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCafKF2Hf5nx-WtRuPFTprsQ"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube size={19} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <FaTwitter size={19} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <FaTiktok size={19} />
                </a>
                <a
                  href="https://www.instagram.com/etutorclass_official/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram size={19} />
                </a>
              </div>
            </div>

            <hr className="border-gray-700 mb-6" />

            <div className="flex flex-wrap">
              {/* Head Office Info */}
              <div className="w-full md:w-1/2 mb-6">
                <h6>Head Office</h6>
                <small className="flex items-center gap-1">
                  <IoLocationSharp /> <span> Bagbazar, Kathmandu</span>
                </small>
                <h5 className="mt-3 underline">Info & Support</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 01-4242320</span>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9801784805</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084805"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084805"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084805</span>
                    <div className="flex ml-[52px] gap-2">
                      <a
                        href="https://wa.me/9779857084805"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084805"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>

                <h5 className="mt-3 underline">Sales Department</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9801784804</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779801784804"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779801784804"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9801784806</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779801784806"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779801784806"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9801784809</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779801784809"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779801784809"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Office Info */}
              <div className="w-full md:w-1/2">
                <h6>Branch Office</h6>
                <small className="flex items-center gap-1   fr">
                  <IoLocationSharp /> <span> Butwal, Near City Center</span>
                </small>

                <h5 className="mt-3 underline">Info & Support</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 071-590980</span>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084802</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084802"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084802"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084806</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084806"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084806"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>

                <h5 className="mt-3 underline">Sales Department</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084807</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084807"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084807"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084808</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084808"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084808"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCall />
                    <span>+977- 9857084809</span>
                    <div className="flex ml-14 gap-2">
                      <a
                        href="https://wa.me/9779857084809"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#7360f2] border-white rounded"
                      >
                        <FaViber />
                      </a>
                      <a
                        href="https://wa.me/9779857084809"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-200 p-1 border hover:bg-[#25D366] border-white rounded"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods and App Download */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <img
                src="https://etutorclass.com/images/card1.jpg"
                alt="Payment Method"
                className="inline-block w-28"
              />
              <img
                src="https://etutorclass.com/images/card2.jpg"
                alt="Payment Method"
                className="inline-block w-28"
              />
              <img
                src="https://etutorclass.com/images/card3.jpg"
                alt="Payment Method"
                className="inline-block w-28"
              />

              <img
                src="https://etutorclass.com/images/card4.jpg"
                alt="Payment Method"
                className="inline-block w-28"
              />
              <img
                src="https://etutorclass.com/images/card5.jpg"
                alt="Payment Method"
                className="inline-block w-28"
              />
            </div>
            <div className="space-x-4">
              <a
                href="https://etutorclass.com/app-download"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://etutorclass.com/images/playstore.jpg"
                  alt="Google Play"
                  className="inline-block w-36"
                />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src="https://etutorclass.com/images/appstore.jpg"
                  alt="App Store"
                  className="inline-block w-36"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-950 text-white py-4 ">
        <p id="copyright" className="max-w-screen-xl mx-auto text-center">
          Copyright © 2024 <a href="">E-tutor class</a>. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
