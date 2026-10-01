import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type DetailInfoItem = {
  id: string | number;
  label: string;
  value?: string | number;
};

export type DetailInfoSection = {
  title: string;
  items: DetailInfoItem[];
};

type DetailInfoCardProps = {
  title: string;
  description?: string;
  sections: DetailInfoSection[];
};

const DetailInfoCard = ({
  title,
  description,
  sections,
}: DetailInfoCardProps) => (
  <Card className='w-full border border-white/8 bg-card/80 shadow-2xl shadow-black/20 ring-1 ring-white/5 backdrop-blur sm:max-w-xl'>
    <CardHeader className='border-b border-white/8 pb-5'>
      <div className='flex items-center gap-3'>
        <span
          aria-hidden='true'
          className='size-2 rounded-full bg-primary shadow-[0_0_14px] shadow-primary/60'
        />
        <CardTitle className='text-lg font-semibold tracking-tight'>
          {title}
        </CardTitle>
      </div>
      {description && (
        <CardDescription className='mt-1 leading-relaxed'>
          {description}
        </CardDescription>
      )}
    </CardHeader>
    <CardContent className='space-y-6'>
      {sections.map((section) => (
        <section key={section.title} className='space-y-3'>
          <h3 className='text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase'>
            {section.title}
          </h3>
          {section.items.length > 0 ? (
            <dl className='overflow-hidden rounded-xl border border-white/8 bg-background/35 text-sm'>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className='flex min-h-12 items-center justify-between gap-4 border-b border-white/6 px-4 py-3 transition-colors last:border-b-0 hover:bg-white/4'
                >
                  <dt className='text-muted-foreground'>{item.label}</dt>
                  {item.value !== undefined && (
                    <dd className='text-right font-medium text-foreground'>
                      {item.value}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          ) : (
            <p className='rounded-xl border border-dashed border-white/10 bg-background/25 px-4 py-6 text-center text-sm text-muted-foreground'>
              등록된 정보가 없습니다.
            </p>
          )}
        </section>
      ))}
    </CardContent>
  </Card>
);

export default DetailInfoCard;
