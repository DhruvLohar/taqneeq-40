import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from './kanban-board';
import NewTaskDialog from './new-task-dialog';

export default function KanbanViewPage() {
  return (
    <PageContainer>
      <div className='mr-4 space-y-4'>
        <div className='flex flex-wrap items-start justify-between'>
          <Heading
            title={`Initialise and Launch`}
            description='Manage tasks by doing them'
          />
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </PageContainer>
  );
}
