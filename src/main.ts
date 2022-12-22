import { assetInfoHttpProvider } from "@cardano-sdk/cardano-services-client";
import { AssetProvider, Cardano, Asset } from "@cardano-sdk/core";

const CARDANO_SERVICES_URL_MAINNET =
  "https://backend.live-mainnet.eks.lw.iog.io";

async function main() {
  const httpProviderConfig = (baseUrl: string) => ({
    baseUrl,
    logger: console,
  });

  const assetProvider: AssetProvider = assetInfoHttpProvider(
    httpProviderConfig(`${CARDANO_SERVICES_URL_MAINNET}/asset`)
  );

  const assetName = "4d494e";
  const assetPolicyId =
    "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6";

  const assetId = Cardano.AssetId(`${assetPolicyId}${assetName}`);

  const tokenMetadata = await assetProvider.getAsset({
    assetId: assetId,
    extraData: {
      tokenMetadata: true,
    },
  });

  return tokenMetadata;
}
main().then((result) => console.log(result));
