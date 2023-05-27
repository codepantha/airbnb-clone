'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = (props) => {
  const { title, subtitle, center } = props;
  return (
    <article className={center ? 'text-center' : 'text-start'}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && (
        <h3 className="font-light text-neutral-500 mt-2">{subtitle}</h3>
      )}
    </article>
  );
};

export default Heading;
