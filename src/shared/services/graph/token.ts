import { AadTokenProvider } from '@microsoft/sp-http';
export async function getGraphAccessToken(context: any): Promise<string> {
    const tokenProvider: AadTokenProvider = await context.aadTokenProviderFactory.getTokenProvider();
    const accessToken = await tokenProvider.getToken("https://graph.microsoft.com");
    return accessToken;
}