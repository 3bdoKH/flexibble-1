import { graph, config } from '@grafbase/sdk'

const g = graph.Standalone()

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 4, max: 15 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 10, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
})

// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
})

export default config({
  schema: g,
  auth: {
    rules: (rules) => rules.private()
  },
})
