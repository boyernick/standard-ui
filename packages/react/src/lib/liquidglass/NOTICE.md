# LiquidGlass

Vendored from `@ybouane/liquidglass@1.0.3`.

Source: https://github.com/ybouane/liquidglass
License: MIT (as declared by the upstream package).

`index.js` is the package's published bundled WebGL renderer. StandardUI
vendors the build because version 1.0.3 publishes a `postinstall`
command whose `patch-package` executable is not a runtime dependency.

Local patch: `LiquidGlass.init()` destroys a partially initialized instance
before rethrowing a startup error, releasing its canvas, listeners and WebGL
resources.

StandardUI's `data-glass-radius="css"` panes derive the shader radius from the
computed CSS radius. Disabled buttons suppress shader hover/press feedback.

Responsive images are decoded from `currentSrc` without `srcset` before canvas
sampling. This keeps object-fit crop coordinates in resource pixels instead of
mixing density-corrected `naturalWidth` with full-resolution canvas coordinates.

Injected canvases compensate for the host's border so the rendered lens stays
centered on bordered controls and their icons.
