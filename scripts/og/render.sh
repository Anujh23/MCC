#!/usr/bin/env bash
# Renders the social card (public/og/default.png) and the 512px JSON-LD logo (public/logo-512.png)
# with headless Edge, then palette-compresses the card (dithered, so the glows don't band).
set -euo pipefail
cd "$(dirname "$0")/../.."
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
PROFILE="$(mktemp -d)"; trap 'rm -rf "$PROFILE"' EXIT
mkdir -p public/og
shot() { "$EDGE" --headless=new --user-data-dir="$(cygpath -w "$PROFILE")" --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=8000 \
  --default-background-color=00000000 --window-size="$1" --screenshot="$(cygpath -w "$PWD/$3")" "file:///$(cygpath -m "$PWD/$2")" 2>/dev/null; }
shot 1200,630 scripts/og/template.html scripts/og/_raw.png
shot 512,512 scripts/og/logo.html public/logo-512.png
python -c "
from PIL import Image
im = Image.open('scripts/og/_raw.png').convert('RGB')
pal = im.quantize(256, method=Image.Quantize.FASTOCTREE)
im.quantize(palette=pal, dither=Image.Dither.FLOYDSTEINBERG).save('public/og/default.png', optimize=True)
"
rm -f scripts/og/_raw.png
ls -l public/og/default.png public/logo-512.png
