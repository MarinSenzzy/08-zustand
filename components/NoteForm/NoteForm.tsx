'use client';

import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, CreateNoteProps } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { sidebarTags } from '@/lib/tags';
import { useNoteStore } from '@/lib/store/noteStore';

// interface NoteFormProps {
//   onClose: () => void;
// }

const NoteForm = () => {
  const router = useRouter();

  const handleOnBack = () => {
    router.push('/notes/filter/all');
  };
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      handleOnBack();
    },
  });

  const handleAction = (formData: FormData) => {
    // const data = {
    //   title: formData.get('title') as string,
    //   content: formData.get('content') as string,
    //   tag: formData.get('tag') as Note['tag'],
    // };
    const data = Object.fromEntries(formData) as CreateNoteProps;
    mutate(data);
  };

  // const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
  //   mutate(values);
  //   console.log('Order data:', values);
  //   actions.resetForm();
  // };
  return (
    <>
      <form action={handleAction} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={css.input}
            defaultValue={draft.title}
            onChange={handleChanges}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            onChange={handleChanges}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            onChange={handleChanges}
          >
            {sidebarTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
            {/* <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option> */}
          </select>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleOnBack}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </form>
    </>
  );
};
export default NoteForm;
