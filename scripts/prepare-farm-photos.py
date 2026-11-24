"""Optional asset maintenance; not part of the website build.

Usage: python scripts/prepare-farm-photos.py PATH_TO_OWNER_IMAGES
Requires Pillow. Only the selected source photographs are read; originals stay intact.
"""
import hashlib
import json
from pathlib import Path
import sys
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
SELECTED = [
    ("WhatsApp Image 2026-11-19 at 20.15.35.jpeg", "greenhouses", "Homepage lead photograph"),
    ("WhatsApp Image 2026-11-17 at 20.04.43.jpeg", "cucumbers", "Crops catalogue and detail page"),
    ("WhatsApp Image 2026-11-19 at 20.15.32.jpeg", "ostrich-paddock", "Ostrich catalogue and detail page; adult birds pictured, not a claim of adult stock for sale"),
    ("WhatsApp Image 2026-11-19 at 20.15.33.jpeg", "nursery", "About page photograph"),
]
manifest_path = ROOT / "docs/asset-manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
manifest["assets"] = [a for a in manifest["assets"] if not a["file"].startswith("public/assets/farm/")]
for filename, stem, placement in SELECTED:
    source = SOURCE / filename
    destination = ROOT / f"public/assets/farm/{stem}.webp"
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        photo = ImageOps.exif_transpose(original).convert("RGB")
        photo.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        photo.save(destination, format="WEBP", quality=84, method=6)
        width, height = photo.size
    manifest["assets"].append({
        "file": destination.relative_to(ROOT).as_posix(),
        "source_workspace_relative": f"03_Brand/Images/{filename}",
        "provenance": "Owner-supplied farm photograph, selected for local website rebuild on 2026-11-24",
        "source_sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
        "bytes": destination.stat().st_size,
        "width": width, "height": height, "mode": "RGB", "copied_unchanged": False,
        "processing": "WebP quality 84, maximum 1280px, EXIF orientation applied; no retouching or generative edits. Layout uses object-fit cropping.",
        "placement_status": "implemented", "placement": placement,
    })
    print(f"{stem}: {width}x{height}, {destination.stat().st_size:,} bytes")
manifest["updated_on"] = "2026-11-24"
manifest["assets"][1]["placement"] = "About page illustration, homepage journal feature, journal card/article and article sharing metadata; proportional and explicitly illustrative"
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
