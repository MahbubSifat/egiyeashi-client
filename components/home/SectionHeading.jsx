export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base-content/70">{text}</p>}
    </div>
  );
}