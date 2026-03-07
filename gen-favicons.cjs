const src = "C:/Users/User/.gemini/antigravity/brain/1cb9f9f6-b0e5-4f43-91a7-f02ac3c46998/aurabitz_logo_1772518637130.png";

async function main() {
    const { default: sharp } = await import("sharp");

    await sharp(src).resize(32, 32, { fit: "cover" }).png().toFile("public/favicon-32.png");
    console.log("32px done");

    await sharp(src).resize(16, 16, { fit: "cover" }).png().toFile("public/favicon-16.png");
    console.log("16px done");

    await sharp(src).resize(180, 180, { fit: "cover" }).png().toFile("public/apple-touch-icon.png");
    console.log("apple-touch done");

    await sharp(src).resize(192, 192, { fit: "cover" }).png().toFile("public/icon-192.png");
    console.log("192px done");

    // Generate ICO-compatible PNG for favicon
    await sharp(src).resize(48, 48, { fit: "cover" }).png().toFile("public/favicon-48.png");
    console.log("48px done");

    console.log("All sizes generated!");
}

main().catch((error) => console.error(error));
