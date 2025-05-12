const baseAccountControllerGate = 'Account'
const baseAdminControllerGate = 'Admin'
const baseAssetControllerGate = 'Asset'
const baseAuditLogsControllerGate = 'AuditLogs'
const baseCategoriesControllerGate = 'Categories'
const baseCustomerControllerGate = 'Customer'
const baseDashboardControllerGate = 'Dashboard'
const baseDeviceControllerGate = 'Device'
const baseFirebaseControllerGate = 'Firebase'
const baseInboundControllerGate = 'Inbound'
const baseInboundReportControllerGate = 'InboundReport'
const baseInboundRequestControllerGate = 'InboundRequest'
const baseInventoryCheckControllerGate = 'InventoryCheck'
const baseInventoryReportControllerGate = 'InventoryReport'
const baseLotControllerGate = 'Lot'
const baseLotTransferControllerGate = 'LotTransfer'
const baseOutboundControllerGate = 'Outbound'
const baseProductControllerGate = 'Product'
const baseProviderControllerGate = 'Provider'
const baseReturnOutboundControllerGate = 'ReturnOutbound'
const baseVideoDetectionControllerGate = 'VideoDetection'
const baseWarehouseControllerGate = 'Warehouse'

export const AccountControllerEndpoints = {
  login: `/${baseAccountControllerGate}/login`,
  setup2FA: `/${baseAccountControllerGate}/setupTwoFactorAuthenticator`,
  updateAccountSettings: `/${baseAccountControllerGate}/updateAccountSettings`,
  whoami: `/whoami`, // Special case, not under /api/Account
  updateAccount: `/${baseAccountControllerGate}/updateAccount`,
  changePassword: `/${baseAccountControllerGate}/changePassword`,
  confirmSetup2FA: `/${baseAccountControllerGate}/confirmSetup2FA`,
  refreshToken: `/${baseAccountControllerGate}/refreshToken`,
  resetPassword: (email: string) =>
    `/${baseAccountControllerGate}/resetPassword/${email}`,
  notifications: `/${baseAccountControllerGate}/notifications`,
  readNotifications: `/${baseAccountControllerGate}/read-notifications`,
}

export const AdminControllerEndpoints = {
  createAccount: `/${baseAdminControllerGate}/createAccount`,
  getAccounts: `/${baseAdminControllerGate}/getAccounts`,
  activeAccount: (id: string) =>
    `/${baseAdminControllerGate}/activeAccount/${id}`,
  deactiveAccount: (id: string) =>
    `/${baseAdminControllerGate}/deactiveAccount/${id}`,
  deleteAccount: (id: string) =>
    `/${baseAdminControllerGate}/deleteAccount/${id}`,
  reset2FA: (id: string) => `/${baseAdminControllerGate}/reset2FA/${id}`,
}

export const AssetControllerEndpoints = {
  getInboundAsset: (inboundId: string, id: string) =>
    `/${baseAssetControllerGate}/inbound/${inboundId}/${id}`,
  getInboundRequestAsset: (filename: string) =>
    `/${baseAssetControllerGate}/inbound-request/${filename}`,
  getInboundReportAsset: (filename: string) =>
    `/${baseAssetControllerGate}/inbound-report/${filename}`,
}

export const AuditLogsControllerEndpoints = {
  viewLogs: `/${baseAuditLogsControllerGate}/viewLogs`,
}

export const CategoriesControllerEndpoints = {
  base: `/${baseCategoriesControllerGate}`, // GET, POST, PUT on base path
  getById: (id: number) => `/${baseCategoriesControllerGate}/${id}`,
}

export const CustomerControllerEndpoints = {
  base: `/${baseCustomerControllerGate}`, // POST, GET on base path
  getById: (customerId: number) =>
    `/${baseCustomerControllerGate}/${customerId}`, // GET, PUT, DELETE on id
  loyal: `/${baseCustomerControllerGate}/loyal`,
}

export const DashboardControllerEndpoints = {
  report: `/${baseDashboardControllerGate}/report`,
}

export const DeviceControllerEndpoints = {
  registerDevice: `/${baseDeviceControllerGate}/registerDevice`,
  ping: `/${baseDeviceControllerGate}/ping`,
  updateTrackingNumber: `/${baseDeviceControllerGate}/updateTrackingNumber`,
  base: `/${baseDeviceControllerGate}`, // GET, PUT on base path
  delete: (deviceId: number) => `/${baseDeviceControllerGate}/${deviceId}`,
}

export const FirebaseControllerEndpoints = {
  sendNotification: `/${baseFirebaseControllerGate}/send-notification`,
}

export const InboundControllerEndpoints = {
  base: `/${baseInboundControllerGate}`, // POST, PUT, GET on base path
  updateStatus: `/${baseInboundControllerGate}/status`,
  getById: (inboundId: number) => `/${baseInboundControllerGate}/${inboundId}`,
  getPdf: (inboundId: number) =>
    `/${baseInboundControllerGate}/${inboundId}/pdf`,
  getInboundReport: (inboundId: number) =>
    `/${baseInboundControllerGate}/${inboundId}/inbound-report`,
}

export const InboundReportControllerEndpoints = {
  base: `/${baseInboundReportControllerGate}`, // POST, PUT on base path
}

export const InboundRequestControllerEndpoints = {
  base: `/${baseInboundRequestControllerGate}`,
  updateStatus: `/${baseInboundRequestControllerGate}/status`,
  getById: (inboundId: number) =>
    `/${baseInboundRequestControllerGate}/${inboundId}`,
}

export const InventoryCheckControllerEndpoints = {
  base: `/${baseInventoryCheckControllerGate}`,
  getPdf: (inventoryCheckId: number) =>
    `/${baseInventoryCheckControllerGate}/${inventoryCheckId}/pdf`,
}

export const InventoryReportControllerEndpoints = {
  export: `/${baseInventoryReportControllerGate}/export`,
  exportStockcard: `/${baseInventoryReportControllerGate}/export-stockcard`,
}

export const LotControllerEndpoints = {
  base: `/${baseLotControllerGate}`, // POST, PUT, GET on base path
  delete: (lotId: number) => `/${baseLotControllerGate}/${lotId}`,
  getById: (lotId: number) => `/${baseLotControllerGate}/${lotId}`,
}

export const LotTransferControllerEndpoints = {
  base: `/${baseLotTransferControllerGate}`,
  export: (id: number) => `/${baseLotTransferControllerGate}/export/${id}`,
  getById: (id: number) => `/${baseLotTransferControllerGate}/${id}`,
}

export const OutboundControllerEndpoints = {
  base: `/${baseOutboundControllerGate}`,
  sampleExport: `/${baseOutboundControllerGate}/sample-export`,
  getById: (id: number) => `/${baseOutboundControllerGate}/${id}`,
  export: (id: number) => `/${baseOutboundControllerGate}/export/${id}`,
}

export const ProductControllerEndpoints = {
  base: `/${baseProductControllerGate}`,
  update: (id: number) => `/${baseProductControllerGate}/${id}`,
  delete: (id: number) => `/${baseProductControllerGate}/${id}`,
}

export const ProviderControllerEndpoints = {
  base: `/${baseProviderControllerGate}`, // POST, GET on base path
  getById: (providerId: number) =>
    `/${baseProviderControllerGate}/${providerId}`, // DELETE, PUT, GET on id
}

export const ReturnOutboundControllerEndpoints = {
  create: `/${baseReturnOutboundControllerGate}/create`,
  getByOutboundId: (outboundId: number) =>
    `/${baseReturnOutboundControllerGate}/${outboundId}`,
  base: `/${baseReturnOutboundControllerGate}`, // GET on base path
}

export const VideoDetectionControllerEndpoints = {
  detect: `/${baseVideoDetectionControllerGate}/detect`,
}

export const WarehouseControllerEndpoints = {
  base: `/${baseWarehouseControllerGate}`, // POST, GET on base path
  update: (id: number) => `/${baseWarehouseControllerGate}/${id}`, // PUT on id
  delete: (id: number) => `/${baseWarehouseControllerGate}/${id}`, // DELETE on id
}
