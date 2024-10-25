import { Request, Response } from 'express';
import Logger from '../../config/log';
import { ValidationErrorItem } from 'joi';

export function sendResponse({
  req,
  res,
  message,
  data,
  status = 200,
  namespace,
  validationErrors,
}: {
  req: Request;
  res: Response;
  message: string;
  data?: any;
  status?: number;
  namespace?: string;
  validationErrors?: ValidationErrorItem[];
}) {
  const { ip } = req;
  if (namespace !== undefined) {
    Logger.info(message, { namespace, ip, status, data, validationErrors });
  }
  return res.status(status).send({ message, data, validationErrors });
}

export function sendErrorResponse({
  req,
  res,
  error,
  namespace,
}: {
  req: Request;
  res: Response;
  error: any;
  namespace?: string;
}) {
  const { message, status }: { message: string; status: number } = ResponseInfo.internalServerError;
  const { ip } = req;
  if (namespace !== undefined) {
    Logger.error(message, { namespace, ip, error });
  }
  return res.status(status).send({ message });
}

export const ResponseInfo = {
  autocompleteSuccess: {
    message: 'Autocomplete successful',
    status: 200,
  },
  notificationFound: {
    message: 'Notification found',
    status: 200,
  },
  notificationsFound: {
    message: 'Notifications found',
    status: 200,
  },
  tagsFound: {
    message: 'Tags found',
    status: 200,
  },
  notificationSent: {
    message: 'Notification sent',
    status: 200,
  },
  sectionsFound: {
    message: 'Sections found',
    status: 200,
  },
  tagUpdated: {
    message: 'Tag updated',
    status: 200,
  },
  userFound: {
    message: 'User found',
    status: 200,
  },
  usersFound: {
    message: 'Users found',
    status: 200,
  },
  reviewsFound: {
    message: 'Reviews found',
    status: 200,
  },
  verificationEmailSent: {
    message: 'Verification email sent',
    status: 200,
  },
  verificationSuccessful: {
    message: 'Verification successful',
    status: 200,
  },
  loginSuccessful: {
    message: 'Login successful',
    status: 200,
  },
  credentialsVerified: {
    message: 'Credentials verified',
    status: 200,
  },
  passwordResetEmailSent: {
    message: 'Password reset email sent',
    status: 200,
  },
  vendorFound: {
    message: 'Vendor found',
    status: 200,
  },
  vendorsFound: {
    message: 'Vendors found',
    status: 200,
  },
  vendorUpdated: {
    message: 'Vendor updated',
    status: 200,
  },
  tagCreated: {
    message: 'Tag created',
    status: 201,
  },
  deviceTokenUpdated: {
    message: 'Device token updated',
    status: 201,
  },
  locationSaved: {
    message: 'Location saved',
    status: 201,
  },
  locationUnsaved: {
    message: 'Location unsaved',
    status: 201,
  },
  userUpdated: {
    message: 'User updated',
    status: 201,
  },
  vendorFavorited: {
    message: 'Vendor favorited',
    status: 201,
  },
  vendorUnfavorited: {
    message: 'Vendor unfavorited',
    status: 201,
  },
  passwordResetSuccessful: {
    message: 'Password reset successful',
    status: 201,
  },
  userCreated: {
    message: 'User created',
    status: 201,
  },
  vendorCreated: {
    message: 'Vendor created',
    status: 201,
  },
  occurrenceCreated: {
    message: 'Occurrence created',
    status: 201,
  },
  liveStarted: {
    message: 'Live started',
    status: 201,
  },
  reviewCreated: {
    message: 'Review created',
    status: 201,
  },
  imageCreated: {
    message: 'Image created',
    status: 201,
  },
  menuItemImageUploaded: {
    message: 'Menu item image uploaded',
    status: 201,
  },
  occurrenceUpdated: {
    message: 'Occurrence updated',
    status: 204,
  },
  liveEnded: {
    message: 'Live ended',
    status: 204,
  },
  vendorDeleted: {
    message: 'Vendor deleted',
    status: 204,
  },
  reviewDeleted: {
    message: 'Review deleted',
    status: 204,
  },
  noFilesUploaded: {
    message: 'No files uploaded',
    status: 400,
  },
  invalidImageType: {
    message: 'Invalid image type',
    status: 400,
  },
  tagUpdate: {
    message: 'Tag update failed',
    status: 400,
  },
  locationRequired: {
    message: 'Location required',
    status: 400,
  },
  validationErrors: {
    message: "Validation errors: Some fields weren't filled out correctly",
    status: 400,
  },
  passwordsDoNotMatch: {
    message: 'Passwords do not match',
    status: 400,
  },
  deviceTokenAlreadyExists: {
    message: 'Device token already exists',
    status: 400,
  },
  deviceTokenInvalid: {
    message: 'Device token invalid',
    status: 400,
  },
  emailNotVerified: {
    message: 'Email not verified',
    status: 400,
  },
  cannotReviewYourOwnVendor: {
    message: 'Cannot review your own vendor',
    status: 400,
  },
  occurrenceUpdateFailed: {
    message: 'Occurrence update failed',
    status: 400,
  },
  imageUploadFailed: {
    message: 'Image upload failed',
    status: 400,
  },
  menuItemImageUploadFailed: {
    message: 'Menu item image upload failed',
    status: 400,
  },
  invalidEmailPasswordCombination: {
    message: 'Invalid email/password combination',
    status: 401,
  },
  unauthorized: {
    message: 'Unauthorized',
    status: 401,
  },
  invalidToken: {
    message: 'Invalid token',
    status: 401,
  },
  userUpdateFailed: {
    message: 'User update failed',
    status: 401,
  },
  routeNotFound: {
    message: 'Route not found',
    status: 404,
  },
  userNotFound: {
    message: 'User not found',
    status: 404,
  },
  usersNotFound: {
    message: 'Users not found',
    status: 404,
  },
  notificationNotFound: {
    message: 'Notification not found',
    status: 404,
  },
  notificationsNotFound: {
    message: 'Notifications not found',
    status: 404,
  },
  deviceTokenNotFound: {
    message: 'Device token not found',
    status: 404,
  },
  tagNotFound: {
    message: 'Tag not found',
    status: 404,
  },
  noVendorsFound: {
    message: 'No vendors found',
    status: 404,
  },
  reviewsNotFound: {
    message: 'Reviews not found',
    status: 404,
  },
  locationNotFound: {
    message: 'Location not found',
    status: 404,
  },
  vendorNotFound: {
    message: 'Vendor not found',
    status: 404,
  },
  vendorNotFavorited: {
    message: 'Vendor not favorited',
    status: 404,
  },
  vendorNotLive: {
    message: 'Vendor not live',
    status: 404,
  },
  reviewNotFound: {
    message: 'Review not found',
    status: 404,
  },
  menuItemNotFound: {
    message: 'Menu item not found',
    status: 404,
  },
  reviewAlreadyExists: {
    message: 'Review already exists',
    status: 409,
  },
  liveAlreadyStarted: {
    message: 'Live already started',
    status: 409,
  },
  vendorAlreadyFavorited: {
    message: 'Vendor already favorited',
    status: 409,
  },
  locationAlreadySaved: {
    message: 'Location already saved',
    status: 409,
  },
  emailInUse: {
    message: 'Email already in use',
    status: 409,
  },
  rateLimitExceeded: {
    message: 'Rate limit exceeded',
    status: 429,
  },
  internalServerError: {
    message: 'Internal server error',
    status: 500,
  },
};
