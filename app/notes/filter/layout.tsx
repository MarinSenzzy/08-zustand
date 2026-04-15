import css from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <>
      <div className={css.container}>
        <div className={css.sidebar}>{sidebar}</div>
        <div className={css.notesWrapper}>{children}</div>
      </div>
    </>
  );
};

export default NotesLayout;
