# Contributing

## Development

```bash
pnpm install
pnpm dev
```

## Adding a New Data Source

Create a file in `packages/ai-oracle/src/sources/` that exports a function matching `SourceResult`. Add the function to `DisasterDetector.sources` array.

## Testing

```bash
pnpm test
```
