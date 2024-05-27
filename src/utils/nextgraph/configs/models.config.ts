export const models = ['Blog', 'Page'] as const
export type ModelsKeys = (typeof models)[number]
