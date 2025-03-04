
`Architecture.md`:
```markdown
---
sidebar_position: 3
---

# Architecture

## Data Flow
The application follows a straightforward data flow pattern for fetching and displaying cryptocurrency data.

```ascii
[User Interface] <-> [React Query Cache] <-> [CoinCap API]
     |                     |
     v                     v
[Search Filter]    [State Management]
     |                     |
     v                     v
[Filtered Data] -> [Paginated Display]
