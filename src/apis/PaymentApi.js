import { PGW_END_POINT } from "@env";

//pgw url
export const pgw_url = PGW_END_POINT;

//payment show/hide
export const payShowHideApi = PGW_END_POINT + "/api/available_payments";

//encrypt param api
export const encryptApi = PGW_END_POINT + "/api/encryptParam";

//expire day interval
export const exp_intervalApi = PGW_END_POINT + "/api/getConfig";

// ----------- KBZ Pay API ---------------------------

//check pay success or fail
export const kbzCheckPayApi = PGW_END_POINT + "/kbz/getQueryOrder?";
export const kbz_url = PGW_END_POINT + "/kbz/placeOrderRequest";

// ----------- CB Pay API ---------------------------

export const cb_url = PGW_END_POINT + "/cb/requestPaymentOrder";

// ----------- AYA Pay API ---------------------------
//aya  payment request
export const aya_url = PGW_END_POINT + "/aya/requestPayment";
