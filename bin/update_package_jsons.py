import json
import os
import shutil

from pathlib import Path

base_dir = Path(__file__).parent.resolve() / '..'
template_dir = base_dir / 'templates'
packages_dir = base_dir / 'packages'

types_dir = packages_dir / '@wprdc-types'
components_dir = packages_dir / '@wprdc-components'
connections_dir = packages_dir / '@wprdc-connections'
viz_dir = packages_dir / '@wprdc-viz'
widgets_dir = packages_dir / '@wprdc-widgets'

KEEP_FIELDS = ['name', 'version', 'description', 'keywords', 'dependencies']

# read template file first
pjson_template = {}
with open(template_dir / 'tsdx.package.json', 'r') as f:
    pjson_template = json.load(f)

for category_dir in [components_dir, connections_dir, viz_dir, widgets_dir]:
    for package in next(os.walk(category_dir))[1]:
        print(package)
        package_dir = category_dir / package

        # place cross-package configs
        shutil.copy(template_dir / 'tsdx.tsconfig.json', package_dir / 'tsconfig.json')
        shutil.copy(template_dir / 'tsdx.config.js', package_dir / 'tsdx.config.js')
        shutil.copy(template_dir / 'tsdx.postcss.config.js', package_dir / 'postcss.config.js')
        shutil.copy(template_dir / 'tailwind.config.js', package_dir / 'tailwind.config.js')

        # read current package.json
        with open(package_dir / 'package.json', 'r+') as f:
            pjson = json.load(f)
            # pull the fields we need
            kept_fields_and_values = {k: pjson[k] for k in KEEP_FIELDS if k in pjson}

            size_limit = [
                {
                    "path": f"dist/{package}.cjs.production.min.js",
                    "limit": "10 KB"
                },
                {
                    "path": f"dist/{package}.esm.js",
                    "limit": "10 KB"
                }
            ]

            final_pjson = {**pjson_template, **kept_fields_and_values,
                           'size-limit': size_limit,
                           'module': f"dist/{package}.esm.js"}

            f.seek(0)
            f.truncate()
            json.dump(final_pjson, f, indent='  ')
