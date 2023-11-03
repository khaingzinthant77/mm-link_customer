import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

//import Services
import { getItem } from "@services/Storage";

const translations = {
  EN: {
    //login
    tlogin: "TopUp Login",
    username: "Username",
    login: "Login",
    loginId: "Login ID",
    password: "Password",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    register: "Register",
    hp_login: "Hotspot Login",
    newuser: "If you are new user?",
    forget_password: "Forget your password?",
    pwd_recovery: "Password Recovery",
    forget_pwd: "Forget Password",
    //Home
    topup_user: "Topup User",
    fiber_user: "WiFi/Fiber User",
    check_internet_access: "CHECK INTERNET ACCESS",
    how_to_use: "How to used (Video) and (PDF)",
    help_desk: "Call Center: 09 789 799 799",
    company: "Own by IT Spectrum Co., Ltd.",
    chat: "Live Chat",
    user_form: "User Form",
    point_transaction: "Point Transaction",
    point: "Point",
    inquiry: "Inquiry Form",

    //dashboard
    install_date: "Installed Date",
    total_using: "Total Using",
    materials: "Materials List",
    internet_plan: "Internet Plan",
    payment_history: "Payment History",
    expire_date: "Expire Date",
    service_ticket: "Service Ticket",
    online_payment: "Bank Account",
    notification: "Notification",
    chat: "Live Chat",
    aggrement: "Agreement",
    speed_test: "Speed Test",

    //material detail
    item: "Item",
    qty: "Quantity",
    description: "Description",

    //internet plan
    select_month: "Select Month",
    upgrade: "Plan Upgrade",
    please_choose: "Please Choose internet service plan*",
    current_plan: "Current Plan",
    monthly_fee: "Monthly Fee",
    month: "Month",
    bandwidth: "Bandwidth",
    total_cost: "Total Cost",
    save: "Submit",
    send: "Send",

    //payment history
    payment_detail: "Payment Detail",
    purchase: "Purchased",
    to_purchase: "To Purchase",
    total: "Total",
    invNo: "Invoice No",
    site_code: "Site Code",
    service_plan: "Service Plan",
    payment_date: "Payment Date",
    actual_bandwidth: "Actual Bandwidth",
    from_date: "From Date",
    to_date: "To Date",
    pay_type: "Pay Type",
    price: "Price",
    amt: "Amount",
    service_charge: "Service Charge",
    discount: "Discount",
    tax: "Tax",
    sub_total: "Sub Total",
    balance: "Balance",
    bank_transfer: "Bank Transfer",
    invDate: "Invoice Date",
    pending: "Pending",
    make_payment: "Make Payment",
    paid_kbz: "Paid with KBZ Pay",
    download_img: "Download Receipt",

    //service ticket
    unsolved: "Unsolved Ticket",
    solved: "Solved Date",
    created_date: "Created Date",
    issue: "Issue Type",
    problem: "Issue Problem",
    solved_date: "Solved Date",
    assign_tech: "Assign Technician",
    remark: "Remark",
    cust_sign: "Customer Sign",
    new_ticket: "New Ticket",
    date: "Date",
    title: "Title",
    address: "Address",
    ticket_detail: "Ticket Detail",

    //notification
    noti_detail: "Notification Detail",

    //setting
    setting: "Setting",
    profile: "Profile",
    about_us: "About Us",
    contact: "Contact",
    change_password: "Change Password",
    logout: "Logout",
    version: "Version",
    rating: "Rate Us",
    choose_language: "Choose Language",
    mminput: "Myanmar",
    enginput: "English",
    current_password: "Current Password",

    //topup dashborad
    toplogin: "Topup Login",
    topregister: "If you are new user register",
    data: "Data",
    topup: "TopUp",
    buy_package: "Buy Package",
    news: "News",
    topup_history: "TopUp History",
    usage_history: "Usage History",
    account_name: "Account Name",
    pin_no: "Pin No",
    user_name: "User Name",
    new_password: "New Password",
    cancle: "CANCLE",
    savetopup: "Save",
    card_no: "Card No",
    topup_date: "Topup Date",
    kbz: "KBZPay",
    kbz_success: "KBZPay Success",
    cb: "CBPay",
    aya: "AYAPay",
    pay_success: "Payment Success",
    payment_overdue: "Payment Overdue",
    hotspot_bonus_acc: "Hotspot Bonus Account",
    hotspot_bonus_his: "Hotspot Bonus History",
    bonus_detail: "Hotspot History Detail",
    bonus_reward_list: "Bonus Reward List",
    hotspot_logout: "Hotspot Logout",
    nearly_agent: "Agent List",

    //profile
    name: "Name",
    nrc: "NRC",
    dob: "Date Of Birth",
    phone: "Phone",
    email: "Email",
    my_site: "My Sites",
    thank_rate_us: "Thanks for your feedback.",
  },
  MM: {
    //login
    login: "လော့ဂ်အင်",
    loginId: "လော့ဂ်အင် အိုင်ဒီ",
    password: "စကားဝှက်",
    privacy: "ကိုယ်ရေးအချက်အလက်မူဝါဒ",
    terms: "သတ်မှတ်ချက်များ",
    register: "မှတ်ပုံတင်ရန်",
    newuser: "အကောင့်မရှိပါက?",
    forget_password: "သင်ရဲ့စကားဝှက်မေ့နေပါသလား",
    pwd_recovery: "Password Recovery",
    forget_pwd: "Forget Password",
    hp_login: "Hotspot Login",

    //Home
    topup_user: "ငွေဖြည့်ကဒ် အသုံးပြုသူ",
    fiber_user: "ဝိုင်ဖိုင်၊ ဖိုင်ဘာ အသုံးပြုသူ",
    check_internet_access: "အင်တာနက်ရ၊မရစစ်ဆေးပါ",
    how_to_use: "အသုံးပြုပုံများကြည့်ရန်",
    help_desk: "Call Center:09 789 799 799",
    company: "Own by IT Spectrum Co., Ltd.",
    chat: "Chat",
    user_form: "User Form",
    point_transaction: "Point Transaction",
    point: "ပွိုင့်",
    inquiry: "Inquiry Form",

    //dashboard
    install_date: "တပ်ဆင်သည့်ရက်စွဲ",
    total_using: "အသုံးပြုမှု စုစုပေါင်း",
    materials: "ပစ္စည်းစာရင်း",
    internet_plan: "အင်တာနက်အစီအစဉ်",
    payment_history: "ပေးချေမှုမှတ်တမ်း",
    expire_date: "သက်တမ်းကုန်ဆုံးရက်",
    service_ticket: "ဝန်ဆောင်မှု",
    online_payment: "ဘဏ်အကောင့်များ",
    notification: "အသိပေးချက်များ",
    chat: "မေးမြန်းရန်",
    aggrement: "သဘောတူညီမှုစာချုပ်",
    speed_test: "အမြန်နှုန်းစမ်းသပ်မှု",
    ticket_detail: "ဝန်ဆောင်မှု အသေးစိတ်",
    kbz: "KBZPay",
    kbz_success: "KBZPay Success",
    cb: "CBPay",
    aya: "AYAPay",
    pay_success: "Payment Success",
    payment_overdue: "Payment Overdue",

    //material
    item: "ပစ္စည်းအမည်",
    qty: "အရေအတွက်",
    make_payment: "Bill ပေးဆောင်ရန်",
    paid_kbz: "KBZ Pay ဖြင့်ပေးမည်",

    //internet plan
    select_month: "လရွေးရန်",
    upgrade: "အဆင့်မြှင့်တင်ရန်",
    please_choose: "ကျေးဇူးပြု၍ အင်တာနက်ဝန်ဆောင်မှုအစီအစဉ်ကိုရွေးချယ်ပါ*",
    current_plan: "လက်ရှိအစီအစဉ်",
    monthly_fee: "လစဉ်ကြေး",
    month: "လ",
    bandwidth: "Bandwidth",
    total_cost: "စုစုပေါင်းကုန်ကျစရိတ်",
    save: "သိမ်းမည်",
    send: "ပေးပို့မည်",

    //payment history
    payment_detail: "ငွေပေးချေမှုအသေးစိတ်",
    purchase: "ပေးချေပြီး",
    to_purchase: "ပေးချေရန်",
    total: "စုစုပေါင်း",
    invNo: "ငွေတောင်းခံလွှာအမှတ်",
    site_code: "ဆိုဒ်ကုဒ်",
    service_plan: "ဝန်ဆောင်မှု",
    payment_date: "ပေးချေသည့်ရက်",
    actual_bandwidth: "Actual Bandwidth",
    from_date: "မှ",
    to_date: "သို့",
    pay_type: "ငွေပေးချေခြင်းအမျိုးအစား",
    price: "စျေးနှုန်း",
    amt: "ပမာဏ",
    service_charge: "ဝန်ဆောင်ခ",
    discount: "လျှော့စျေး",
    tax: "အခွန်",
    sub_total: "အထွေထွေစုစုပေါင်း",
    balance: "လက်ကျန်ငွေ",
    bank_transfer: "ဘဏ်မှငွေလွှဲ",
    invDate: "ငွေတောင်းခံသည့်ရက်",
    // panding:"ပေးပို့ထားသည်",
    pending: "ပေးပို့ထားသည်",
    download_img: "Download Receipt",

    //service ticket
    unsolved: "မပြင်ရသေးသောတစ်ကဒ်များ",
    solved: "ပြင်ပြီးသော တစ်ကဒ်များ",
    created_date: "ထည့်သွင်းသည့်နေ့",
    issue: "ပြဿနာအမျိူးအစား",
    problem: "ပြဿနာ",
    description: "ဖော်ပြချက်",
    solved_date: "ဖြေရှင်းသည့်နေ့",
    assign_tech: "တာဝန်ကျသည့် နည်းပညာရှင်",
    remark: "မှတ်ချက်",
    cust_sign: "သုံးစွဲသူလက်မှတ်",
    new_ticket: "တစ်ကဒ်အသစ်ထည့်ရန်",
    date: "ရက်စွဲ",
    title: "ခေါင်းစဥ်",
    address: "နေရပ်လိပ်စာ",

    //notification
    noti_detail: "အသိပေးချက်အသေးစိတ်",

    //setting
    setting: "မီနူး",
    profile: "ကိုယ်ရေးအကျဉ်း",
    about_us: "ကျွနိုပ်တို့အကြောင်း",
    contact: "ဆက်သွယ်ရန်",
    change_password: "စကားဝှက်ပြောင်းရန်",
    logout: "စနစ်မှထွက်မည်",
    version: "ဗားရှင်း",
    choose_language: "ဘာသာစကားရွေးချယ်ရန်",
    mminput: "မြန်မာ",
    enginput: "အင်္ဂလိပ်",
    rating: "ထင်မြင်ချက်ရေးရန်",

    //topup dashborad
    toplogin: "လော့ဂ်အင်",
    topregister: "သင်ဟာအသုံးပြုသူအသစ်ဖြစ်လျှင်မှတ်ပုံတင်ပါ",
    data: "ဒေတာ",
    topup: "ငွေဖြည့်ရန်",
    buy_package: "ဝယ်ရန်",
    news: "သတင်းများ",
    topup_history: "ငွေဖြည့် မှတ်တမ်းများ",
    usage_history: "အသုံးပြုမှု မှတ်တမ်းများ",
    account_name: "အကောင့်အမည်",
    pin_no: "ပင်နံပါတ်",
    user_name: "အသုံးပြုသူအမည်",
    current_password: "လက်ရှိစကားဝှက်",
    new_password: "စကားဝှက်အသစ်",
    cancle: "မလုပ်တော့ပါ",
    savetopup: "သိမ်းမည်",
    card_no: "ကဒ်နံပါတ်",
    topup_date: "ဖြည့်သွင်းသည့်ရက်စွဲ",
    hotspot_bonus_acc: "Hotspot Bonus Account",
    hotspot_bonus_his: "Hotspot Bonus History",
    bonus_detail: "Hotspot History Detail",
    bonus_reward_list: "Bonus Reward List",
    hotspot_logout: "Hotspot Logout",
    nearly_agent: "အရောင်းကိုယ်စားလှယ်များ",

    //login
    tlogin: "အကောင့်ဝင်ရန်",
    username: "အမည်/ဖုန်းနံပါတ်",

    //profile
    name: "အမည်",
    nrc: "နိုင်ငံသားစီစစ်ရေးကဒ်ပြားအမှတ်",
    dob: "မွေးသက္ကရာဇ်",
    phone: "ဖုန်းနံပါတ်",
    email: "အီးမေးလ်",
    my_site: "ဆိုဒ်ကုဒ်များ",
    thank_rate_us: "ကျေးဇူးတင်ပါတယ်ခင်ဗျာ",
  },
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
export const t = (scope, locale) => {
  // console.log(locale)
  return i18n.t(scope, { locale: locale });
};

export const getLang = async () => {
  // console.log(await Localization.getLocalizationAsync());
  return new Promise((resolve, reject) => {
    getItem("language")
      .then((res) => {
        if (res) {
          // console.log(res)
          resolve(res);
        } else {
          resolve("EN");
        }
      })
      .catch((err) => reject(err));
  });
};
