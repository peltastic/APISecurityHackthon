export interface IPagination {
    skip: number,
    limit: number
}

export interface IPayLoad {
    user_id: string,
    email: string,
}

export interface IOtpUrl {
    otp_auth_url: string;
    otp_base32: string;
    id: string;
}
