import facepaint from 'facepaint'

const breakpoints = [1024, 1200]

export const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))