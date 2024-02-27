import { PORTAL_API_END_POINT } from "@env";

// login api
export const loginApi = PORTAL_API_END_POINT + "appuser/login";

// get service plans api
export const getServicePlanApi = PORTAL_API_END_POINT + "ServicePlan/show/";

//payment slip
export const bankSlipTransferApi =
  PORTAL_API_END_POINT + "serviceinvoice/invoiceNo";

//get townships api
export const getTownshipApi = PORTAL_API_END_POINT + "township/";

//get quarter api
export const quarterApi = PORTAL_API_END_POINT + "quarter/bytownship";

//get near zone
export const getNearZoneApi = PORTAL_API_END_POINT + "Zone/Nearest";

//customer information api
export const customerInfoApi = PORTAL_API_END_POINT + "customer/information/";

//solvedTicketDetail api
export const solvedTicketDetail = PORTAL_API_END_POINT + "ticket/";

//get inquiry api
export const getInquiryApi = PORTAL_API_END_POINT + "Form1/Inquiry";

//get online payment api
export const online_payment = PORTAL_API_END_POINT + "bank/";

//get ticketproblem api
export const ticketproblem = PORTAL_API_END_POINT + "ticketproblem/";

//get ticketissuetype api
export const ticketissuetype = PORTAL_API_END_POINT + "ticketissuetype/";

//get ticket api
export const ticketApi = PORTAL_API_END_POINT + "ticket";

//get purchased api
export const purchaseApi =
  PORTAL_API_END_POINT + "ServiceInvoice/History/Customer/";

//get purchased detail api
export const purchasedetailApi = PORTAL_API_END_POINT + "serviceinvoice/";

//get all to purchase api
export const topurchaseApi =
  PORTAL_API_END_POINT + "ServiceInvoice/Credit/Customer/";

//get purchased list api
export const purchasedListApi =
  PORTAL_API_END_POINT + "ServiceInvoice/PaidSiteServiceBill";

//get to purchase api
export const toPurchaseApi =
  PORTAL_API_END_POINT + "ServiceInvoice/CreditSiteServiceBill";

//get unsolved ticket api
export const unsolvedApi = PORTAL_API_END_POINT + "ticket/ticketStatus";

//get unsolved ticket detail
export const unsolvedTicketDetailApi = PORTAL_API_END_POINT + "ticket/";

//plan upgrade
export const internetplanUpgradeApi =
  PORTAL_API_END_POINT + "TicketIssueType/ByIssueType/G/";

//change password
export const changePasswordApi = PORTAL_API_END_POINT + "customer/";

//change new password
export const changeNewPasswordApi =
  PORTAL_API_END_POINT + "customer/changepassword";

//logout api
export const logoutApi = PORTAL_API_END_POINT + "appuser/logout";

//paid invoice
export const paidInvoiceUrl = PORTAL_API_END_POINT + "serviceinvoice/";

//paid invoice
export const paidUpdateApi =
  PORTAL_API_END_POINT + "ServiceInvoice/UpdateTransaction/";

//event api
export const eventApi = "https://news.mm-link.net/api/popup_ad";

//rating api
export const ratingApi = "https://news.mm-link.net/api/rating";

//billing contact api
export const paymentContactApi = "https://news.mm-link.net/api/billing_contact";

//login api
export const otpLoginApi = PORTAL_API_END_POINT + "appuser/loginrequest";

//hotspot bonus history
export const bonus_history = "/api/get_bonus_information";

//update phone number
export const updatePhoneApi = "/api/update_gift_accounts";

//claim bonus list
export const claimBonusList = "/api/claim_bonus_list";

//claim bonus
export const claimBonusApi = "/api/claim_bonus";

//bonus history detail
export const historyDetailApi = "/api/claim_bonus_detail";
