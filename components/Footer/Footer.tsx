import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: MarinSenzzy / Nikita</p>
          <p>
            Contact us:
            <a href="mailto:nikitasidorovic24@gmail.com">nikitasidorovic24@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
