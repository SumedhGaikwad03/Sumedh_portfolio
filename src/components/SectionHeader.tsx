type Props = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ index, title, description }: Props) {
  return (
    <div className="mb-7">
      <div className="flex items-baseline gap-3 mb-2.5">
        <span className="mono-label text-[var(--color-accent)]">// {index}</span>
        <span className="mono-label">{title}</span>
      </div>
      <div className="h-px w-full bg-[var(--color-border)]" />
      {description && (
        <p className="mt-3 text-[var(--color-slate)] max-w-xl text-sm">{description}</p>
      )}
    </div>
  );
}
