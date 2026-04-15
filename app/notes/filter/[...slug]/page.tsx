// import NoteList from '@/components/NoteList/NoteList';
// type NoteFiltersProps = {
//   params: Promise<{ slug: string[] }>;
// };
// const NoteFilters = async ({ params }: NoteFiltersProps) => {
//   const { slug } = await params;

//   const category = slug[0] === 'all' ? undefined : slug[0];
//   console.log('🚀 ~ NoteFilters ~ category:', category);
//   const data = await fetchNotesTag({ search: '', page: 1, tag: category });

//   return (
//     <>
//       <div>
//         <h1>Note by filters</h1>
//         <NoteList notes={data.notes} />
//       </div>
//     </>
//   );
// };

// export default NoteFilters;
import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';

type NoteFiltersProps = {
  params: Promise<{ slug: string[] }>;
};

const NoteFilters = async ({ params }: NoteFiltersProps) => {
  const { slug } = await params;

  const category = slug[0] === 'all' ? undefined : slug[0];
  console.log('🚀 ~ NoteFilters ~ category:', category);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, category],
    queryFn: () => fetchNotes({ search: '', page: 1, tag: category }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient initialTag={category} />
      </HydrationBoundary>
    </>
  );
};

export default NoteFilters;
