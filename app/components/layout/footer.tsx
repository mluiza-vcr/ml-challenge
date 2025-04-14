import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 text-center dark:text-white text-sm bg-transparent z-10">
      <p> © {new Date().getFullYear()} Sua Galáxia Estelar</p>
      <p>
        Desenvolvido por{" "}
        <span className="text-decoration: underline hover:opacity-70">
          <Link to="https://www.linkedin.com/in/mluiza-vcr/">
            Maria Luiza Rodrigues{" "}
          </Link>
        </span>
      </p>
    </footer>
  );
}
