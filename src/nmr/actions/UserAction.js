import { USER_LOGIN } from "./ActionType";

export function login(userId)
{
    const id = userId;
    return {
        type: USER_LOGIN,
        userId: id
    };
}
