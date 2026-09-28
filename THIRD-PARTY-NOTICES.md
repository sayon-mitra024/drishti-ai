# Third-Party Notices

Drishti AI uses third-party software and external platforms. License information below is recorded in `package-lock.json` for the direct dependencies.

## Software dependencies

| Technology | Use | Recorded license |
|---|---|---|
| Next.js 16.3.6 | Web framework | MIT |
| React 19.2.0 / React DOM 19.2.0 | UI runtime | MIT |
| TypeScript | Type checking and compilation | Apache-2.0 |
| Tailwind CSS | Styling | MIT |
| `sharp` | Image processing | Apache-2.0 |
| `@gradio/client` 2.7.0 | Hugging Face Space client | ISC |

PyTorch and torchvision are model-side technologies governed by their own licenses and are not bundled as dependencies of this Next.js application.

## External services

Hugging Face Spaces is an external model-serving platform, and Vercel is an external deployment/hosting platform. Both remain subject to their own terms and the rights of relevant model or project owners. Datasets, fonts, icons, and images require source and license verification before reuse.

The lockfile also includes transitive dependencies and native image-processing components with their own licenses. Consult installed package metadata when redistributing a build.
