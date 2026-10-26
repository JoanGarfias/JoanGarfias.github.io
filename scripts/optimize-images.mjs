// Genera variantes WebP de las capturas (public/projects) y el retrato en public/_optimized/.
// Se ejecuta antes de dev/build/generate; solo procesa archivos nuevos o modificados.
// Mantén WIDTHS sincronizado con app/utils/images.ts.
import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import sharp from 'sharp'

const WIDTHS = [480, 960, 1600]
const PUBLIC_DIR = 'public'
const SOURCES = ['public/projects', 'public/joan.jpeg']
const OUT_DIR = 'public/_optimized'

const walk = async dir => (await stat(dir)).isFile() ? [dir] : (await Promise.all(
  (await readdir(dir, { withFileTypes: true })).map(entry => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
)).flat()

const isFresh = async (out, srcMtime) => {
  try {
    return (await stat(out)).mtimeMs >= srcMtime
  } catch {
    return false
  }
}

let created = 0
const files = (await Promise.all(SOURCES.map(walk))).flat()
for (const file of files) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue

  const { mtimeMs } = await stat(file)
  const { width: originalWidth } = await sharp(file).metadata()
  const widths = [...WIDTHS.filter(w => w < originalWidth), Math.min(originalWidth, WIDTHS.at(-1))]
  const base = join(OUT_DIR, relative(PUBLIC_DIR, file)).slice(0, -extname(file).length)

  for (const width of new Set(widths)) {
    const out = `${base}-${width}.webp`
    if (await isFresh(out, mtimeMs)) continue
    await mkdir(dirname(out), { recursive: true })
    await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
    created++
  }
}

console.log(`[optimize-images] ${created} variantes WebP nuevas`)
