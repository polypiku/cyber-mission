"""Bundle the game into one self-contained HTML file (dist/cyber-mission.html).

Inlines the stylesheet, every script and every image, so the result can be
opened straight from disk or uploaded anywhere as a single file.
Usage: python3 tools/build_single.py
"""
import base64, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()

def inline_images(js):
    def to_data(m):
        rel = m.group(1)
        ext = rel.rsplit(".", 1)[1]
        with open(os.path.join(ROOT, rel), "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        return f'"data:image/{ext};base64,{b64}"'
    return re.sub(r'"(assets/[^"]+\.(?:webp|png|jpg))"', to_data, js)

html = read("index.html")
html = html.replace('<link rel="stylesheet" href="css/style.css">',
                    "<style>\n" + read("css/style.css") + "</style>")
srcs = re.findall(r'<script src="([^"]+)"></script>', html)
bundle = "\n".join(inline_images(read(s)) if s.startswith("data/") else read(s) for s in srcs)
first = html.index('<script src="'); last = html.rindex("</script>") + len("</script>")
html = html[:first] + "<script>\n" + bundle + "\n</script>" + html[last:]

os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
out = os.path.join(ROOT, "dist", "cyber-mission.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(html)
print(f"wrote {out} ({len(html)//1024} KB, {len(srcs)} scripts)")
