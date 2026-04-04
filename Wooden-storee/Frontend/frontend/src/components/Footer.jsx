import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-black text-white mt-10 py-6">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">🪑 Furniture</h2>
          <p className="text-gray-400">
            Modern furniture for modern homes.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <p className="text-gray-400">Home</p>
          <p className="text-gray-400">About</p>
          <p className="text-gray-400">Cart</p>
        </div>

        {/* Developer + Social */}
        <div>
          <h2 className="font-semibold mb-2">Developer</h2>
          <p className="text-gray-400">Ritik Anand</p>
          <p className="text-gray-400 mb-3">Full Stack Developer</p>

          {/* 🔥 SOCIAL ICONS */}
          <div className="flex gap-4 text-xl">

            <a
              href="https://www.linkedin.com/in/ritik-anand-9ba026250/"
              target="_blank"
              className="hover:text-blue-500"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Ritik137"
              target="_blank"
              className="hover:text-gray-400"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.instagram.com/_i_m__ritik_"
              target="_blank"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>

            <a
              href="https://x.com/Born_to_ruleee"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>

          </div>

        </div>

      </div>

      <p className="text-center text-gray-500 mt-6">
        © 2026 Ritik Furniture App. All rights reserved.
      </p>

    </div>
  );
}