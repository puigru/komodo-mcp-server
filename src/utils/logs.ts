/**
 * Shared log helpers for container and stack log tools.
 *
 * @module utils/logs
 */

export interface LogStreams {
  stdout?: string;
  stderr?: string;
}

export interface LogSearchResult {
  matchCount: number;
  matches: string;
}

export function combineLogStreams(log: LogStreams): string {
  let logContent = "";
  if (log.stdout) {
    logContent += log.stdout;
  }
  if (log.stderr) {
    if (logContent) logContent += "\n\n=== STDERR ===\n";
    logContent += log.stderr;
  }
  return logContent;
}

export function searchLogContent(logContent: string, query: string, caseSensitive: boolean): LogSearchResult {
  const lines = logContent.split("\n");
  const searchQuery = caseSensitive ? query : query.toLowerCase();

  const filteredLines = lines.filter((line) => {
    const searchLine = caseSensitive ? line : line.toLowerCase();
    return searchLine.includes(searchQuery);
  });

  return {
    matchCount: filteredLines.length,
    matches: filteredLines.join("\n"),
  };
}
