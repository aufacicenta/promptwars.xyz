"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "text_to_img",
      [
        {
          provider: "bytedance",
          model: "sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
          description:
            "SDXL-Lightning by ByteDance: a fast text-to-image model that makes high-quality images in 4 steps",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeiedqdpdkgth4en3ch2nmo4o5lycgndq746h4u6xquwo6oxifftehq/bytedance:sdxl-lightning-4step.png",
        },
        {
          provider: "stability-ai",
          model: "stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
          description:
            "A latent text-to-image diffusion model capable of generating photo-realistic images given any text input",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeia4zp6w2hjufx4c4wh56iqxetu3wbuxqpl4bkjn56wbwh4odhsiui/stability-ai:stable-diffusion.png",
        },
        {
          provider: "stability-ai",
          model: "sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          description: "A text-to-image generative AI model that creates beautiful images",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeifij6mj2t2s4mkgzwlujzgwtsqyz5iw5ikf5r3mejj4uuwocc3ztm/stability-ai:sdxl.png",
        },
        {
          provider: "stability-ai",
          model: "stable-diffusion-inpainting:95b7223104132402a9ae91cc677285bc5eb997834bd2349fa486f53910fd68b3",
          description: "Fill in masked parts of images with Stable Diffusion",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeiad3u6lebi55q5cbgx3fegklop5izj5ur2q5bjc2bncumwxe76bzq/stability-ai:stable-diffusion-inpainting.png",
        },
        {
          provider: "ai-forever",
          model: "kandinsky-2.2:ad9d7879fbffa2874e1d909d1d37d9bc682889cc65b31f7bb00d2362619f194a",
          description: "multilingual text2image latent diffusion model",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeicr5r5ogsealeqf6gor2l54rrlxb4gkpdhwwl4f3zk7dcgib4aw2u/ai-forever:kandinsky-2.2.png",
        },
        {
          provider: "ai-forever",
          model: "kandinsky-2:3c6374e7a9a17e01afe306a5218cc67de55b19ea536466d6ea2602cfecea40a9",
          description: "text2img model trained on LAION HighRes and fine-tuned on internal datasets",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeieyb4n5yia6lhdfk7obfoeudjzzzm5hi3aeryos3ohykgvisbjddi/ai-forever:kandinsky-2.png",
        },
        {
          provider: "datacte",
          model: "proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019",
          description:
            "Proteus v0.2 shows subtle yet significant improvements over Version 0.1. It demonstrates enhanced prompt understanding that surpasses MJ6, while also approaching its stylistic capabilities.",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeihmr5us4vq7qq6w63hbngtmu6og2l2piql53to3pdalal6yiztkqy/datacte:proteus-v0.2.png",
        },
        {
          provider: "fofr",
          model: "latent-consistency-model:683d19dc312f7a9f0428b04429a9ccefd28dbf7785fef083ad5cf991b65f406f",
          description: "Super-fast, 0.6s per image. LCM with img2img, large batching and canny controlnet",
          example_img_url:
            "https://blockchainassetregistry.infura-ipfs.io/ipfs/bafybeicrhsd3utsxn2vsv52mlekj5753tafcsmq6wuzqzloe6r6g7epnzq/fofr:latent-consistency-model.jpg",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("text_to_img", null, {});
  },
};
