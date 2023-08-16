import { getPlaiceholder } from 'plaiceholder';

export default async function getImage(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    const {
      metadata: { width, height },
      ...plaiceholder
    } = await getPlaiceholder(buffer, {
      size: 10,
    });

    return {
      ...plaiceholder,
      img: { src, width, height },
    };
  } catch (error: any) {
    throw new Error(`Failed to load image ${src}: ${error.message}`);
  }
}
