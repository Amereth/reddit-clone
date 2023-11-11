import { type ComponentPropsWithRef } from 'react'

export const ArrowIcon = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    height='16px'
    width='16px'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 50.454 50.454'
    {...props}
  >
    <g>
      <path
        fill='currentColor'
        d='M42.359,25.479L27.122,1.25c-1.048-1.667-2.747-1.667-3.795,0L8.095,25.479
		c-1.048,1.667-0.316,2.801,1.635,2.532l5.43-0.885c1.95-0.269,3.531,1.11,3.531,3.079v16.683c0,1.969,1.596,3.566,3.565,3.566
		h5.935c1.97,0,3.566-1.596,3.566-3.566V30.206c0-1.969,1.582-3.348,3.531-3.079l5.436,0.885
		C42.674,28.28,43.407,27.146,42.359,25.479z'
      />
    </g>
  </svg>
)
