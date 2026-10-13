import userData from 'utils/data';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Enhanced SVG icon components with size and color control
interface IconProps {
  className?: string;
  size?: number;
}

const GitHubIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
    <path d='M9 18c-4.51 2-5-2-7-2' />
  </svg>
);

const LinkedInIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect width='4' height='12' x='2' y='9' />
    <circle cx='4' cy='4' r='2' />
  </svg>
);

const TwitterIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
  </svg>
);

const InstagramIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
  </svg>
);

// Social platforms, each tinted with one of the theme tokens
const socialPlatforms = [
  {
    name: 'GitHub',
    href: userData.socialLinks.github,
    icon: GitHubIcon,
    colorClass: 'text-foreground hover:text-primary',
    bgClass: 'hover:bg-primary/10',
  },
  {
    name: 'LinkedIn',
    href: userData.socialLinks.linkedin,
    icon: LinkedInIcon,
    colorClass: 'text-primary hover:text-brand-to',
    bgClass: 'hover:bg-primary/10',
  },
  {
    name: 'Twitter',
    href: userData.socialLinks.twitter,
    icon: TwitterIcon,
    colorClass: 'text-brand-to hover:text-primary',
    bgClass: 'hover:bg-brand-to/10',
  },
  {
    name: 'Instagram',
    href: userData.socialLinks.instagram,
    icon: InstagramIcon,
    colorClass: 'text-highlight-strong hover:text-highlight-strong/80',
    bgClass: 'hover:bg-highlight/15',
  },
];

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

export default function SocialLinks({
  className = '',
  iconSize = 20,
  showLabels = false,
}: SocialLinksProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {socialPlatforms.map(platform => {
        const Icon = platform.icon;

        return (
          <Tooltip key={platform.name}>
            <TooltipTrigger asChild>
              <a
                href={platform.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`
                    p-2.5
                    relative group
                    rounded-lg
                    border border-border
                    ${platform.bgClass}
                    ${platform.colorClass}
                    backdrop-blur-sm
                    transition-[color,background-color,box-shadow,transform] duration-200 ease-out
                    hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0
                    shadow-sm hover:shadow-md
                    flex items-center justify-center space-x-2
                    ${showLabels ? 'px-3' : ''}
                  `}
                aria-label={`Visit my ${platform.name} profile`}
              >
                <span className='flex items-center justify-center'>
                  <Icon size={iconSize} />
                </span>

                {showLabels && (
                  <span className='text-sm font-medium whitespace-nowrap'>
                    {platform.name}
                  </span>
                )}
              </a>
            </TooltipTrigger>

            {!showLabels && (
              <TooltipContent variant='neutral' side='bottom' sideOffset={10}>
                {platform.name}
              </TooltipContent>
            )}
          </Tooltip>
        );
      })}
    </div>
  );
}

// Enhanced individual social link component
export function SocialLink({
  href,
  label,
  iconPath,
  iconSize = 20,
  className = '',
  iconColor,
}: {
  href: string;
  label: string;
  iconPath: string;
  iconSize?: number;
  className?: string;
  iconColor?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={`
            p-2.5 
            rounded-lg
            border border-border
            hover:bg-accent
            text-muted-foreground hover:text-foreground
            transition-[color,background-color,box-shadow,transform] duration-200 ease-out
            hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0
            shadow-sm hover:shadow-md
            flex items-center justify-center
            ${className}
          `}
          style={iconColor ? { color: iconColor } : {}}
          aria-label={`Visit ${label} profile`}
        >
          <div
            className='transition-opacity duration-200 opacity-70 hover:opacity-100'
            style={{
              width: iconSize,
              height: iconSize,
              maskImage: `url(${iconPath})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              backgroundColor: 'currentColor',
            }}
          />
        </a>
      </TooltipTrigger>
      <TooltipContent side='bottom'>{label}</TooltipContent>
    </Tooltip>
  );
}
