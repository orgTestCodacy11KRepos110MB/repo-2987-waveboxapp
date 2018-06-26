import MicrosoftService from './MicrosoftService'

class MicrosoftCalendarService extends MicrosoftService {
  /* **************************************************************************/
  // Properties: Support
  /* **************************************************************************/

  get supportsUnreadActivity () { return false }
  get supportsUnreadCount () { return false }
  get supportsTrayMessages () { return false }
  get supportsSyncedDiffNotifications () { return false }
  get supportsNativeNotifications () { return false }
  get supportsGuestNotifications () { return false }
  get supportsSyncWhenSleeping () { return false }
  get supportsWBGAPI () { return false }
  get supportedAuthNamespace () { return undefined }

  /* **************************************************************************/
  // Properties: Humanized
  /* **************************************************************************/

  get humanizedType () { return 'Calendar' }
  get humanizedLogos () {
    return [
      'microsoft/logo_calendar_32px.png',
      'microsoft/logo_calendar_48px.png',
      'microsoft/logo_calendar_64px.png',
      'microsoft/logo_calendar_96px.png',
      'microsoft/logo_calendar_128px.png'
    ]
  }

  /* **************************************************************************/
  // Properties: Behaviour
  /* **************************************************************************/

  get outlookUrl () { return 'https://outlook.com/owa/?path=/calendar' }
  get o365Url () { return 'https://outlook.office365.com/owa/?path=/calendar' }
}

export default MicrosoftCalendarService
