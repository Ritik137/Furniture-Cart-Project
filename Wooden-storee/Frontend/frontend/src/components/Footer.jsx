import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="13" width="20" height="5" rx="2" fill="#1a1a1a" />
                  <rect x="4" y="8" width="16" height="6" rx="2" fill="#1a1a1a" opacity="0.7" />
                  <rect x="5" y="18" width="2" height="4" rx="1" fill="#1a1a1a" />
                  <rect x="17" y="18" width="2" height="4" rx="1" fill="#1a1a1a" />
                </svg>
              </div>
              <span className="text-lg font-semibold" style={{ fontFamily: "Georgia, serif" }}>Furnish</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Thoughtfully designed furniture for the spaces you live in. Quality crafted, delivered to your door.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Navigate</h3>
            <div className="space-y-3">
              {[{ to: "/", label: "Home" }, { to: "/about", label: "About" }, { to: "/cart", label: "Cart" }].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="block text-sm text-stone-400 no-underline hover:text-white transition-colors duration-150">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Developer</h3>
            <p className="text-white font-medium mb-1">Ritik Anand</p>
            <p className="text-stone-400 text-sm mb-5">Full Stack Developer</p>

            <div className="flex gap-2">
              {[
                { href: "https://www.linkedin.com/in/ritik-anand-9ba026250/", icon: <FaLinkedin />, hoverClass: "hover:text-blue-400 hover:border-blue-500" },
                { href: "https://github.com/Ritik137", icon: <FaGithub />, hoverClass: "hover:text-white hover:border-stone-400" },
                { href: "https://www.instagram.com/_i_m__ritik_", icon: <FaInstagram />, hoverClass: "hover:text-pink-400 hover:border-pink-500" },
                { href: "https://x.com/Born_to_ruleee", icon: <FaTwitter />, hoverClass: "hover:text-sky-400 hover:border-sky-500" },
              ].map(({ href, icon, hoverClass }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className={`w-9 h-9 border border-stone-700 rounded-lg flex items-center justify-center text-stone-500 no-underline transition-all duration-150 ${hoverClass}`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-stone-500 text-xs">© 2026 Furnish by Ritik Anand. All rights reserved.</span>
          <span className="text-stone-600 text-xs">Built with React · Node.js · MongoDB</span>
        </div>
      </div>
    </footer>
  );
}
  