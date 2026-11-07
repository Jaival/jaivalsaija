import { Rows } from '@/components/pipeline';
import { cv } from '@/utils/cv';

/**
 * The CV's skill rows, with what I'm still learning in muted text after
 * "learning:". Shared by /cv and /aboutme, so both say what the PDF says.
 */
export default function SkillRows() {
  return (
    <Rows
      rows={cv.skills.map(skill => ({
        label: skill.label,
        value: (
          <>
            {skill.value}
            {skill.learning && (
              <span className='text-muted-foreground'>
                {' '}
                · learning: {skill.learning}
              </span>
            )}
          </>
        ),
      }))}
    />
  );
}
