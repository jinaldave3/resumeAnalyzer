#!/bin/sh
set -eu
cd "$(dirname "$0")"
RESUME_NODE="$(command -v node || true)"
RESUME_BUNDLED="../../work/runtime/node-v22.16.0-darwin-x64/bin/node"
if [ -x "$RESUME_BUNDLED" ]; then RESUME_NODE="$RESUME_BUNDLED"; fi
if [ -z "$RESUME_NODE" ]; then echo 'Install Node.js 22.16+ first.'; exit 1; fi
"$RESUME_NODE" -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)'
exec "$RESUME_NODE" --env-file=.env.local server.mjs
