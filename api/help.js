const help = [
  {
    id: 1,
    title: "Order Processing",
    category: "Buying",
    body: "Orders are processed and shipped on business days only (Sunday through Thursday, excluding Holidays).\nOrders placed on Holidays or Weekend Days will be processed the following business day.",
  },
  {
    id: 2,
    title: "Order Status",
    category: "Buying",
    body: "You can access your order status and history by signing in and viewing it in your account. \nOrder status is updated by sellers only.",
  },
  {
    id: 3,
    title: "Order Cancellations",
    category: "Buying",
    body: "If you would like to cancel an online order after it has been placed, please do it at your earliest convenience through the order cancellation tab. Once an order is processing, we regret that it cannot be changed or canceled.\nFeel free to contact us by phone in case you encounter any issues during your cancellation. We will do our best to accommodate your request.",
  },
  {
    id: 4,
    title: "Maximum Purchase Policy",
    category: "Buying",
    body: "We must limit orders to ten (10) of any single item. Orders exceeding these limits are subject to cancellation. If you have any questions Contact Us and we will be happy to assist.",
  },
  {
    id: 5,
    title: "Payment Options",
    category: "Buying",
    body: "We accept two payment methods:\nPayment on delivery: physical money is exchanged for the item you ordered upon receiving it. Customers must keep in mind that the price they were shown during checkout is non negotiable at this step.\nPayment through website credit: the total amount of your order will be deducted from your credit balance if the current balance is enough to cover it. See the section about site credit to learn more about it.",
  },
  {
    id: 6,
    title: "Site Credit",
    category: "Buying",
    body: "You can purchase site credit upwards of 1000 DZD and no more than 50000 DZD by wiring the desired amount through your local bank to this account. A site administrator will add that amount to your current balance at the shortest possible notice. Once it is added, it cannot be refunded. Please Contact Us for any other inquiries regarding site credit.",
  },
  {
    id: 7,
    title: "Promotional Offer Code",
    category: "Buying",
    body: "Simply enter your offer code in the text box marked “Offer Code” on the Billing page during the Checkout process. When an offer code is accepted, it will be displayed on the “Order Review” page. Please Note: Offer codes are case sensitive and should be entered exactly as they appear. Only one offer code may be used per online order.",
  },
  {
    id: 8,
    title: "Opening a Store",
    category: "Selling",
    body: "To open your own Magaza store, click here. \n\nMagaza relies entirely on its sellers and their convenience is important to us. Once you fill the online form for opening a store, a site administrator will contact you to confirm the operation and take additional information.\n\nFor a store to show up on the stores page, it has to have a valid name, description, profile and banner photos as well as a contact section. Additionally, at least one product validated through our administrators is needed for your store to become operational.",
  },
  {
    id: 9,
    title: "Selling Products",
    category: "Selling",
    body: "The quality of our products is our top priority, therefore sellers are expected to take real and clear photos of their products as well as provide enough information about them, all of which will be checked and validated by our administrators.\nIn case a product submission gets rejected, you can contact us for additional information.",
  },
  {
    id: 10,
    title: "Handling Customer Orders",
    category: "Selling",
    body: "Store owners and managers are expected to process and ship orders within a couple business days of receiving them. Failure to do so on multiple occasions may lead to a store suspension. Additionally, physical returns and on hand payment will be handled by your store staff.",
  },
  {
    id: 11,
    title: "Reviews and Questions",
    category: "Selling",
    body: "You can find your product reviews and customer’s inquiries here.\nWhile reviews cannot be deleted, they can be reported in case of usage of inappropriate language. As for questions, they will not show up on the product page until you send an answer.",
  },
  {
    id: 12,
    title: "Online Store Staff",
    category: "Selling",
    body: "To make your experience easier, you can add up to 3 store managers to help you handle orders and answer questions. They will first have to be approved by our administrators. \n*Magaza does not handle paying their wages.",
  },
  {
    id: 13,
    title: "Store Credit",
    category: "Selling",
    body: "Any products sold to customers who have chosen the online payment method will be deducted from your online inventory and their price added to your store credit. At the end of every month, the total will be sent to you via the bank account you submitted through the store sign up form.\nAny real life transactions such as on hand delivery payment and shipping costs is not handled by Magaza, however, the total for on hand payment will be shown on your store dashboard to give you accurate statistics of your sales.",
  },
  {
    id: 14,
    title: "Account Settings",
    category: "Account",
    body: "You can edit your account settings through the settings tab in the profile menu",
  },
  {
    id: 15,
    title: "Sign in/Register",
    category: "Account",
    body: "To fully use the functionalities of Magaza please sign in or register for an account if you do not have one yet. In case you are having issues logging into your account, please contact us by phone or e-mail.",
  },
  {
    id: 16,
    title: "Password Help",
    category: "Account",
    body: "If you forgot your password, click on the “I forgot my password” button on the sign in page. A password recovery email will be sent to you with instructions on how to change your password.\n\nNo more than one recovery email can be sent per day per user.",
  },
  {
    id: 17,
    title: "Account Deletion",
    category: "Account",
    body: "In case you want to delete your account, keep in mind your current site balance will not be refunded to you and cannot be refunded after deletion.",
  },
  {
    id: 18,
    category: "Shipping & Delivery",
    title: "Shipping Costs and Time Frame",
    body: "Magaza does not handle shipping and delivery of your items. Each item sold is the responsibility of the seller who listed it on Magaza and will therefore be shipped to you by said seller. Prices and time frames of shipping will vary depending on the seller’s distance from you and their work flow.\n\nPlease contact the stores directly to inquire about their shipping policy.\n\n*Shipping cost is not included in your total upon checkout.",
  },
  {
    id: 19,
    category: "Shipping & Delivery",
    title: "Shipping Address Disclaimer",
    body: "At this time, Magaza is unable to ship to more than one address within a single order. Please place a separate order for each designated shipping address and make sure to verify that the address details are accurate to avoid any errors or delays in shipping.",
  },
  {
    id: 20,
    category: "Shipping & Delivery",
    title: "International locations",
    body: "We’re sorry. We are currently unable to accept orders billed or shipped to destinations outside of Algeria. We apologize for any inconvenience.",
  },

  {
    id: 21,
    category: "Returns & Refunds",
    title: "Magaza Online Return Policy",
    body: "To start a return, click here.\n\nYour satisfaction is important to us. If you are not satisfied with your online purchase, we are happy to refund your purchase price if the return complies with our return policy. We accept returns for products purchased from Magaza only, and all returns are inspected by sellers upon return. Products purchased from Magaza must be returned in new or gently used condition and within 60* days from the date of purchase. Additionally, returns of items that qualified for a free promotional item(s) must be returned with the free promotional item(s). Please note: Items noted as final sale or not-returnable are not eligible for exchange or return. Magaza sellers monitor return activity and reserve the right to deny returns that, in its sole discretion, do not meet the return policy requirements, in instances of abuse, or for items that were re-sent at no cost in a good faith gesture following a report of non-receipt.\n\n*Refunds for returns received after 60 days are not guaranteed.\n\nFor items returned within our returns policy, the purchase price will be refunded to the original form of payment. If the payment was made through store credit, the amount paid will be added back to your credit balance.",
  },
  {
    id: 22,
    title: "Return Instructions",
    category: "Returns & Refunds",
    body: "Click here to initiate a return after shipping the returned item(s) back to the sellers you received them from. Once the physical return is confirmed, your payment will be refunded within 60 hours.",
  },
  {
    id: 23,
    category: "Returns & Refunds",
    title: "Damaged Items",
    body: "When your order arrives, please inspect the package for any damage that may have occurred during shipment. It is normal for the shipping carton to show some wear, however, if damage occurred to the item(s) in your shipment, please retain the box, the packing materials, and the items inside and contact us immediately for assistance\n\nIf you are unable to retain the contents due to the extent of damage, handle with care to take a photo of damaged item(s), and then safely discard the damaged contents.",
  },

  {
    id: 24,
    title: "Out of Stock Items",
    category: "Other",
    body: "In case you wish to purchase an item that is out of stock, simply add it to your wishlist. This does not guarantee that this product will be back in stock. Please contact the seller for additional information.",
  },
  {
    id: 25,
    title: "Donations",
    category: "Other",
    body: "We do not accept donations at this time. If you wish to purchase an item as a donation, simply put the address of whoever you want to donate the item to as a shipping address.\n*A proper donation system will be installed in the future.",
  },
];

module.exports = help;
