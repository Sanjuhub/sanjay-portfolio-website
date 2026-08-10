'use client'

import { useState } from 'react'
import { ChevronDown, ServerCog, Layers, ShieldCheck, Database } from 'lucide-react'
import MermaidDiagram from '@/components/MermaidDiagram'

const architectureItems = [
  {
    id: 'notification-system',
    title: 'Notification System',
    summary: 'Event-driven notification delivery for email, SMS, and in-app alerts.',
    diagram: `flowchart LR
  subgraph Client
    U[User]
  end
  subgraph API
    API[Notification API]
    Q[Message Queue]
    W[Worker Pool]
  end
  subgraph Delivery
    E[Email Service]
    S[SMS Gateway]
    A[In-App Stream]
  end
  U --> API
  API --> Q
  Q --> W
  W --> E
  W --> S
  W --> A
  style API fill:#0ea5e9,stroke:#0369a1,color:#ffffff
  style Q fill:#7c3aed,stroke:#5b21b6,color:#ffffff
  style W fill:#14b8a6,stroke:#0f766e,color:#ffffff
  style E fill:#f97316,stroke:#c2410c,color:#ffffff
  style S fill:#ef4444,stroke:#b91c1c,color:#ffffff
  style A fill:#8b5cf6,stroke:#6d28d9,color:#ffffff`,
    technologies: ['Node.js', 'Redis', 'RabbitMQ', 'AWS SES', 'WebSockets'],
    challenges: ['Managing delivery retries', 'Keeping notifications idempotent', 'Balancing delivery speed with reliability'],
    tradeoffs: ['Event-driven complexity vs throughput', 'Guaranteed delivery vs eventual consistency'],
    scalability: 'Designed with a queue-first architecture so spikes are absorbed by workers and delivery channels scale independently.'
  },
  {
    id: 'microservices',
    title: 'Microservices Architecture',
    summary: 'API gateway with domain services and shared data patterns for scale.',
    diagram: `flowchart TB
  Client --> GW[API Gateway]
  GW --> Auth[Auth Service]
  GW --> Users[User Service]
  GW --> Orders[Order Service]
  Users --> DB1[(User DB)]
  Orders --> DB2[(Order DB)]
  Auth --> DB3[(Auth DB)]
  style GW fill:#0ea5e9,stroke:#0369a1,color:#ffffff
  style Auth fill:#14b8a6,stroke:#0f766e,color:#ffffff
  style Users fill:#7c3aed,stroke:#5b21b6,color:#ffffff
  style Orders fill:#f97316,stroke:#c2410c,color:#ffffff`,
    technologies: ['Kubernetes', 'API Gateway', 'NestJS', 'PostgreSQL', 'gRPC'],
    challenges: ['Defining clear service boundaries', 'Handling distributed transactions', 'Coordinating schema changes'],
    tradeoffs: ['Service autonomy vs operational overhead', 'Decoupling vs cross-service latency'],
    scalability: 'Each service scales independently, enabling targeted resource allocation and faster team ownership.'
  },
  {
    id: 'caching-layer',
    title: 'Caching Layer',
    summary: 'Read-heavy caching strategy for API performance and backend load reduction.',
    diagram: `flowchart LR
  Client --> API[API Service]
  API --> Cache[Redis Cache]
  API --> DB[(Primary Database)]
  Cache --> DB
  style API fill:#0ea5e9,stroke:#0369a1,color:#ffffff
  style Cache fill:#f59e0b,stroke:#b45309,color:#ffffff
  style DB fill:#14b8a6,stroke:#0f766e,color:#ffffff`,
    technologies: ['Redis', 'PostgreSQL', 'CDN', 'Cache Invalidation'],
    challenges: ['Avoiding stale data', 'Choosing TTL and eviction policies', 'Balancing cache hit ratio and consistency'],
    tradeoffs: ['Higher read throughput vs data freshness', 'Warm cache costs vs cold start latency'],
    scalability: 'The cache layer stops repeated database hits, letting the backend handle write traffic while reads serve from memory.'
  },
  {
    id: 'auth-and-rate-limiting',
    title: 'Authentication & Rate Limiting',
    summary: 'Secure session flow with token-based access and request throttling.',
    diagram: `flowchart TB
  User --> API[API Gateway]
  API --> Auth[Auth Service]
  Auth --> DB[(User Store)]
  API --> Rate[Rate Limiter]
  Rate --> Store[Redis]
  style API fill:#0ea5e9,stroke:#0369a1,color:#ffffff
  style Auth fill:#14b8a6,stroke:#0f766e,color:#ffffff
  style Rate fill:#f97316,stroke:#c2410c,color:#ffffff
  style Store fill:#f59e0b,stroke:#b45309,color:#ffffff`,
    technologies: ['JWT', 'OAuth2', 'Redis', 'API Gateway', 'Rate Limiting'],
    challenges: ['Protecting endpoints while avoiding friction', 'Throttling without blocking legitimate users'],
    tradeoffs: ['Strict security vs developer experience', 'Global limits vs per-user quotas'],
    scalability: 'Token-based auth and in-memory throttling keep request validation lightweight and horizontally scalable.'
  }
]

const ArchitectureSection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <div className="space-y-16">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-4">Systems & Design</p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          Architecture &amp; <span className="text-gradient-primary">System Design</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          A curated showcase of the systems I design for performance, reliability, and scale.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {architectureItems.map((item) => (
          <details
            key={item.id}
            className="glass rounded-3xl p-6 group"
            onToggle={(event) => {
              const details = event.currentTarget as HTMLDetailsElement
              setActiveCard(details.open ? item.id : null)
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {item.id === 'notification-system' ? <ServerCog className="w-5 h-5 text-cyan-400" /> : null}
                  {item.id === 'microservices' ? <Layers className="w-5 h-5 text-cyan-400" /> : null}
                  {item.id === 'caching-layer' ? <Database className="w-5 h-5 text-cyan-400" /> : null}
                  {item.id === 'auth-and-rate-limiting' ? <ShieldCheck className="w-5 h-5 text-cyan-400" /> : null}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-300 max-w-xl">{item.summary}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-300 transition-transform duration-300 group-open:-rotate-180" aria-hidden="true" />
            </summary>

            <div className="mt-6 space-y-6">
              <div className="rounded-3xl border border-white/10 overflow-hidden bg-slate-950/80">
                {activeCard === item.id ? (
                  <MermaidDiagram code={item.diagram} />
                ) : (
                  <div className="min-h-[220px] flex items-center justify-center px-6 py-10 text-center text-sm text-gray-400">
                    Expand the card to view the architecture diagram.
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass rounded-3xl p-5">
                  <p className="text-sm text-cyan-300 uppercase tracking-[0.2em] mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-3xl p-5">
                  <p className="text-sm text-cyan-300 uppercase tracking-[0.2em] mb-3">Challenges</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                    {item.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass rounded-3xl p-5">
                  <p className="text-sm text-cyan-300 uppercase tracking-[0.2em] mb-3">Trade-offs</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.tradeoffs}</p>
                </div>
                <div className="glass rounded-3xl p-5">
                  <p className="text-sm text-cyan-300 uppercase tracking-[0.2em] mb-3">Scalability</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.scalability}</p>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Interactive cards keep the section lightweight until you want the details.</p>
      </div>
    </div>
  )
}

export default ArchitectureSection
