import { clsx } from 'clsx';

const Card = ({ className = '', children, ...props }) => (
  <div
    className={clsx(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className = '', ...props }) => (
  <div
    className={clsx('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);

const CardTitle = ({ className = '', ...props }) => (
  <h3
    className={clsx(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
);

const CardDescription = ({ className = '', ...props }) => (
  <p
    className={clsx('text-sm text-muted-foreground', className)}
    {...props}
  />
);

const CardContent = ({ className = '', ...props }) => (
  <div className={clsx('p-6 pt-0', className)} {...props} />
);

const CardFooter = ({ className = '', ...props }) => (
  <div
    className={clsx('flex items-center p-6 pt-0', className)}
    {...props}
  />
);

export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };