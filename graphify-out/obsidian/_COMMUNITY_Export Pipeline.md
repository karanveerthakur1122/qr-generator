---
type: community
cohesion: 0.40
members: 10
---

# Export Pipeline

**Cohesion:** 0.40 - moderately connected
**Members:** 10 nodes

## Members
- [[copyImageToClipboard()]] - code - src\lib\qr\export.ts
- [[createMatrix()]] - code - src\lib\qr\engine.ts
- [[export.ts]] - code - src\lib\qr\export.ts
- [[exportJPG()]] - code - src\lib\qr\export.ts
- [[exportPDF()]] - code - src\lib\qr\export.ts
- [[exportPNG()]] - code - src\lib\qr\export.ts
- [[exportSVG()]] - code - src\lib\qr\export.ts
- [[loadImage()]] - code - src\lib\qr\export.ts
- [[renderFullCanvas()]] - code - src\lib\qr\export.ts
- [[triggerDownload()]] - code - src\lib\qr\export.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Export_Pipeline
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_QR Render Engine]]
- 1 edge to [[_COMMUNITY_Export Step UI]]

## Top bridge nodes
- [[export.ts]] - degree 9, connects to 1 community
- [[renderFullCanvas()]] - degree 8, connects to 1 community
- [[exportSVG()]] - degree 4, connects to 1 community
- [[createMatrix()]] - degree 3, connects to 1 community