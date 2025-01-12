import { LoginPayloadDTO } from "src/auth/dtos/loginPayload.dto"

export const authorizationToLoginPayload = (
    authorization: string
): LoginPayloadDTO | undefined => {

    const authorizationSlpited = authorization.split('.');

    if (authorizationSlpited.length < 3 || !authorizationSlpited[1]) {
        return undefined;
    }

    return JSON.parse(
        Buffer.from(authorizationSlpited[1], 'base64').toString('ascii')
    );
}